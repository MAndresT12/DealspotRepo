/* =========================================================
   DealSpot — app.js

   Para cambiar el Google Sheet en el futuro:
   1. Archivo → Compartir → Publicar en la web → CSV → Publicar
   2. Copia la URL que te da Google y pégala en CSV_URL abajo
   ========================================================= */
"use strict";

/* ── ÚNICA LÍNEA QUE NECESITAS CAMBIAR SI CAMBIAS DE SHEET ── */
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-cKq84KXQEvTuI8Ep7bRM-dAY5OaGTYZbYqBEtFTK5QI2EQV66buYJHbXrgcpgtQTbwn9Kbfzu7eC/pub?gid=1330817725&single=true&output=csv";
const CACHE_KEY = "ds_sheet_v3";
// const CACHE_TTL = 30 * 60 * 1000; // 30 minutos
const CACHE_TTL = 0; // 0

const STORE_LABELS = {
  "amazon.com": "Amazon",
  "amzn.to": "Amazon",
  "a.co": "Amazon",
  "walmart.com": "Walmart",
  "bestbuy.com": "Best Buy",
  "aliexpress.com": "AliExpress",
  "ebay.com": "eBay",
  "target.com": "Target",
  "costco.com": "Costco",
};

const CAT_ICONS = {
  tecnologia: "💻", gaming: "🎮", hogar: "🏠", moda: "👗",
  deportes: "⚽", belleza: "💄", viajes: "✈️", comida: "🍔", otros: "📦"
};

const BADGES = {
  hot: { label: "🔥 HOT", css: "badge-hot" },
  new: { label: "✨ NUEVO", css: "badge-new" },
  limited: { label: "⏰ LIMITADO", css: "badge-limited" },
  sale: { label: "💸 OFERTA", css: "badge-sale" },
};

/* ── VALIDAR URL ─────────────────────────────────────────── */
// FIX #1 — Evita que filas de instrucciones/texto pasen como deals
function isValidUrl(str) {
  try { return ["http:", "https:"].includes(new URL(str).protocol); }
  catch { return false; }
}

/* ── PARSEAR CSV ─────────────────────────────────────────── */
function parseCSV(text) {
  // FIX #2 — Google Sheets exporta \r\n; split(/\r?\n/) acepta ambos formatos
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h =>
    h.replace(/"/g, "").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );

  return lines.slice(1).map(line => {
    const values = [];
    let inside = false, current = "";
    for (const ch of line) {
      if (ch === '"') { inside = !inside; continue; }
      if (ch === "," && !inside) { values.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    values.push(current.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
}

async function fetchSheet() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  } catch { }

  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();

  if (text.trim().startsWith("<")) throw new Error("SHEET_NOT_PUBLISHED");

  const data = parseCSV(text);
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch { }
  return data;
}

/* ── NORMALIZAR FILA → DEAL ──────────────────────────────── */
function detectStore(url) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    for (const [domain, label] of Object.entries(STORE_LABELS)) {
      if (hostname.includes(domain)) return label;
    }
  } catch { }
  return "Tienda";
}

function normalizeRow(row) {
  const get = (...keys) => {
    for (const k of keys) {
      const v = row[k];
      if (v && v.trim()) return v.trim();
    }
    return "";
  };

  const url = get("url", "link", "enlace");
  const titulo = get("titulo", "title", "nombre", "producto");
  const imagen = get("imagen", "image", "img", "foto");
  const precioStr = get("precio", "price", "precio_actual");
  const antStr = get("precio_anterior", "precio_original", "original_price", "antes");
  const categoria = get("categoria", "category", "cat").toLowerCase() || "otros";
  const badge = get("badge", "etiqueta").toLowerCase();
  const activo = get("activo", "active", "visible");
  const expiresH = get("expira_en", "expires_in", "expira", "horas");
  const notas = get("notas", "notes", "descripcion", "description", "desc");

  // FIX #1 — Valida que la URL sea real (http/https), descarta filas de instrucciones
  if (!url || !isValidUrl(url)) return null;

  const isActive = activo ? !["no", "false", "0", "inactivo"].includes(activo.toLowerCase()) : true;
  if (!isActive) return null;

  const precio = parseFloat(precioStr.replace(/[$,]/g, "")) || 0;
  const anterior = parseFloat(antStr.replace(/[$,]/g, "")) || 0;
  const descuento = (anterior > precio && precio > 0)
    ? Math.round(((anterior - precio) / anterior) * 100) : 0;

  let expiresAt = null;
  const horas = parseFloat(expiresH);
  if (horas > 0) expiresAt = new Date(Date.now() + horas * 3600000);

  return {
    url, titulo, imagen, precio, anterior, descuento,
    categoria: categoria in CAT_ICONS ? categoria : "otros",
    badge: badge in BADGES ? badge : "",
    store: detectStore(url),
    notas, expiresAt,
  };
}

/* ── CONSTRUIR CARD ──────────────────────────────────────── */
function buildCard(deal, index) {
  const badgeCfg = BADGES[deal.badge];
  const catIcon = CAT_ICONS[deal.categoria] || "📦";
  const catLabel = deal.categoria.charAt(0).toUpperCase() + deal.categoria.slice(1);

  const priceHtml = deal.precio > 0
    ? `<div class="card-price-row">
         <span class="price-cur">$${deal.precio.toFixed(2)}</span>
         ${deal.anterior > deal.precio
      ? `<span class="price-was">$${deal.anterior.toFixed(2)}</span>
              <span class="price-off">-${deal.descuento}%</span>` : ""}
       </div>`
    : `<div class="card-price-row"><span class="price-see">Ver precio →</span></div>`;

  let timerHtml = "";
  if (deal.expiresAt) {
    const diff = deal.expiresAt - Date.now();
    if (diff > 0) {
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      timerHtml = `<div class="card-timer${h < 6 ? " urgent" : ""}">
        ${h < 24 ? `⏰ ${h}h ${m}m restantes` : `📅 ${Math.floor(h / 24)}d restantes`}
      </div>`;
    }
  }

  const storeEmoji = { Amazon: "📦", Walmart: "🏪", "Best Buy": "💙", AliExpress: "🛒", eBay: "🔨" };
  const emoji = storeEmoji[deal.store] || "🛍️";
  const imgSrc = deal.imagen || `https://placehold.co/400x400/10101c/444?text=${encodeURIComponent(emoji)}`;
  const titulo = deal.titulo || `Oferta en ${deal.store}`;

  const card = document.createElement("a");
  card.className = "card";
  card.href = deal.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer sponsored";
  card.dataset.cat = deal.categoria;
  card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;

  card.innerHTML = `
    <div class="card-img-wrap">
      ${badgeCfg ? `<span class="card-badge ${badgeCfg.css}">${badgeCfg.label}</span>` : ""}
      <img class="card-img" src="${imgSrc}" alt="${titulo}" loading="lazy"
           onerror="this.src='https://placehold.co/400x400/10101c/444?text=${encodeURIComponent(emoji)}'" />
      <div class="card-img-overlay"><span>Ver oferta ↗</span></div>
    </div>
    <div class="card-info">
      <div class="card-top">
        <span class="card-store">${deal.store}</span>
        <span class="card-cat">${catIcon} ${catLabel}</span>
      </div>
      <h3 class="card-title">${titulo}</h3>
      ${deal.notas ? `<p class="card-desc">${deal.notas}</p>` : ""}
      ${priceHtml}
      ${timerHtml}
      <span class="card-cta">🛒 Ver oferta →</span>
    </div>`;

  return card;
}

/* ── RENDER + FILTROS ────────────────────────────────────── */
let allDeals = [], currentCat = "all", currentSearch = "";

function renderDeals() {
  const grid = document.getElementById("dealsGrid");
  grid.innerHTML = "";

  let filtered = allDeals;
  if (currentCat !== "all")
    filtered = filtered.filter(d => d.categoria === currentCat);
  if (currentSearch)
    filtered = filtered.filter(d =>
      (d.titulo + d.store + d.categoria + d.notas).toLowerCase().includes(currentSearch)
    );

  const label = document.getElementById("countLabel");
  if (label) label.textContent = `${filtered.length} oferta${filtered.length !== 1 ? "s" : ""}`;

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty"><div class="empty-icon">🔍</div>
      <h3>Sin resultados</h3>
      <p style="margin-top:.4rem;font-size:.83rem">Prueba con otra categoría o búsqueda.</p></div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  filtered.forEach((d, i) => frag.appendChild(buildCard(d, i)));
  grid.appendChild(frag);
}

/* ── INIT ────────────────────────────────────────────────── */
async function init() {
  const status = document.getElementById("statusMsg");
  const grid = document.getElementById("dealsGrid");

  grid.innerHTML = Array(6).fill(`<div class="skeleton"></div>`).join("");

  try {
    const rows = await fetchSheet();
    allDeals = rows.map(normalizeRow).filter(Boolean);

    status.classList.add("hidden");
    grid.innerHTML = "";

    const totalEl = document.getElementById("totalCount");
    if (totalEl) totalEl.textContent = allDeals.length;

    renderDeals();

    document.querySelectorAll(".cat").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        renderDeals();
        document.querySelector(".section-main")?.scrollIntoView({ behavior: "smooth" });
      });
    });

    document.getElementById("searchInput")?.addEventListener("input", e => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderDeals();
    });

    document.getElementById("menuBtn")?.addEventListener("click", () => {
      const s = document.querySelector(".header-search");
      if (s) s.style.display = s.style.display === "block" ? "none" : "block";
    });

  } catch (err) {
    console.error(err);
    grid.innerHTML = "";
    status.className = "status-msg error";
    status.innerHTML = `
      ❌ <strong>Error al cargar: ${err.message}</strong><br>
      <small style="display:block;margin-top:.5rem;line-height:1.8">
        Verifica que en tu Google Sheet hayas hecho:<br>
        <strong>Archivo → Compartir → Publicar en la web</strong><br>
        → Selecciona la hoja "Deals" → formato CSV → Publicar
      </small>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
