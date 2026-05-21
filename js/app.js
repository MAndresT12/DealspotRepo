/* =========================================================
   DealSpot — app.js  v2.2
   + Bilingual Legal Modals (Affiliate, Privacy, Terms, Cookies)
   + Cookie Consent Banner
   + Contact Us section (web3forms)
   + Expanded i18n keys
   ========================================================= */
"use strict";

/* ── CONFIG ─────────────────────────────────────────────── */
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-cKq84KXQEvTuI8Ep7bRM-dAY5OaGTYZbYqBEtFTK5QI2EQV66buYJHbXrgcpgtQTbwn9Kbfzu7eC/pub?gid=1330817725&single=true&output=csv";
const DEALS_PER_PAGE = 12;
const SITE_DOMAIN = "savemoreusadeals.com";

/* ── i18n ────────────────────────────────────────────────── */
const I18N = {
  es: {
    /* App */
    appName: "AhorraMásUSA",
    logoSrc: "images/logo-es.png",
    pageTitle: "AhorraMásUSA — Las Mejores Ofertas del Día",
    /* Header */
    searchPlaceholder: "🔍 Buscar ofertas…",
    /* Hero */
    heroBadge: "🟢 Actualizado automáticamente · ",
    heroDeals: "ofertas",
    heroH1: 'Las mejores<br/><span class="hero-h1-accent">ofertas del día</span>',
    heroSub: "Deals verificados en tecnología, gaming, hogar y más. Redirige directo a la tienda.",
    heroSearch: "🔍 Buscar entre todas las ofertas…",
    /* Disclosure */
    disclosureText: 'ℹ️ <strong>Aviso:</strong> Este sitio contiene enlaces de afiliados. Podemos ganar una comisión si compras a través de nuestros links, sin costo adicional para ti.',
    /* Cats */
    catAll: "🌟 Todos",
    catTec: "💻 Tecnología",
    catGaming: "🎮 Gaming",
    catHogar: "🏠 Hogar",
    catModa: "👗 Moda",
    catDeportes: "⚽ Deportes",
    catBelleza: "💄 Belleza",
    catOtros: "📦 Otros",
    /* Section */
    sectionTitle: "🔥 Todas las Ofertas",
    loading: "Cargando ofertas desde Google Sheets…",
    /* Cards */
    seeOffer: "🛒 Ver oferta →",
    seePrice: "Ver precio →",
    couponLabel: "Cupón",
    copyBtn: "Copiar",
    copied: "✓ Copiado",
    noResults: "Sin resultados",
    noResultsSub: "Prueba con otra categoría o búsqueda.",
    remainH: "h restantes",
    remainD: "d restantes",
    dealCount: n => `${n} oferta${n !== 1 ? "s" : ""}`,
    couponExpiresIn: "Válido por:",
    couponExpired: "⚠️ Cupón expirado",
    /* Pagination */
    prevPage: "← Anterior",
    nextPage: "Siguiente →",
    pageOf: (p, t) => `Página ${p} de ${t}`,
    /* How it works */
    howEyebrow: "Guía rápida",
    howTitle: "¿Cómo funciona AhorraMásUSA?",
    howItems: [
      {
        q: "¿Qué son los cupones de descuento?",
        a: "Los cupones son códigos especiales que ingresas al momento del pago en la tienda para obtener un precio reducido. Están disponibles por tiempo limitado, ¡así que aprovéchalos antes de que expiren!"
      },
      {
        q: "¿Cómo uso un cupón?",
        a: 'Haz clic en "Ver oferta" para ir a la tienda, agrega el producto al carrito y en el paso de pago pega el código del cupón. El descuento se aplicará automáticamente sobre el total.'
      },
      {
        q: "¿Con qué frecuencia se actualizan las ofertas?",
        a: "Actualizamos las ofertas regularmente. Sin embargo, los precios pueden cambiar en la tienda sin aviso previo. Siempre verifica el precio final antes de completar tu compra."
      },
      {
        q: "¿Este sitio cobra algo por usarlo?",
        a: "No. AhorraMásUSA es completamente gratuito para los compradores. Ganamos una pequeña comisión de las tiendas cuando realizas una compra a través de nuestros links, sin ningún costo extra para ti."
      },
      {
        q: "¿Cómo recibo notificaciones de las mejores ofertas?",
        a: "Únete a nuestro grupo de WhatsApp para recibir notificaciones instantáneas de las mejores deals, cupones exclusivos y ofertas flash — totalmente gratis."
      },
    ],
    /* Community section */
    communityTitle: "¡Únete a nuestra comunidad!",
    communitySub: "Recibe las mejores ofertas, cupones exclusivos y alertas flash directamente en tu WhatsApp — totalmente gratis.",
    communityBtn: "Unirse ahora",
    /* WhatsApp */
    waJoin: "Únete al grupo",
    waTooltip: "🔔 Recibe ofertas en WhatsApp",
    waLink: "https://chat.whatsapp.com/CLKfQbMMrex9Y08zjysw2d",
    /* Contact section */
    contactEyebrow: "Contáctanos",
    contactTitle: "¿Tienes alguna pregunta?",
    contactSub: "Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.",
    contactNameLabel: "Nombre completo",
    contactNamePh: "Tu nombre",
    contactEmailLabel: "Correo electrónico",
    contactEmailPh: "tu@email.com",
    contactMsgLabel: "Mensaje",
    contactMsgPh: "¿En qué podemos ayudarte?",
    contactSend: "Enviar mensaje",
    contactSending: "Enviando…",
    contactSuccess: "✓ ¡Mensaje enviado con éxito! Te responderemos pronto.",
    contactError: "❌ Error al enviar. Por favor intenta de nuevo.",
    contactSubjectVal: "Consulta desde AhorraMásUSA",
    /* Cookie banner */
    cookieTitle: "🍪 Utilizamos cookies",
    cookieText: "Usamos cookies esenciales para el funcionamiento del sitio y cookies de análisis opcionales para mejorar tu experiencia. Consulta nuestra",
    cookieMore: "Política de Cookies",
    cookieAccept: "Aceptar todas",
    cookieDecline: "Solo esenciales",
    /* Footer legal */
    legalSectionTitle: "Legal",
    affiliateDisclosureLabel: "Divulgación de Afiliados",
    privacyPolicyLabel: "Política de Privacidad",
    termsLabel: "Términos y Condiciones",
    cookiesPolicyLabel: "Política de Cookies",
    cookiePrefsLabel: "⚙️ Preferencias de Cookies",
    contactNavLabel: "Contacto",
    /* Cookie preferences modal */
    cookiePrefTitle: "⚙️ Preferencias de Cookies",
    cookiePrefIntro: "Gestiona qué cookies deseas permitir. Puedes cambiar estas preferencias en cualquier momento.",
    cookiePrefEssentialName: "🔒 Cookies Esenciales",
    cookiePrefAlways: "Siempre activas",
    cookiePrefEssentialDesc: "Necesarias para el funcionamiento básico del sitio: recordar tu idioma y tu decisión sobre cookies. No se pueden desactivar.",
    cookiePrefAnalyticsName: "📊 Cookies de Analítica",
    cookiePrefOptional: "Opcional",
    cookiePrefAnalyticsDesc: "Google Analytics para entender cómo se usa el sitio (páginas vistas, tiempo de sesión, país). Los datos son anónimos.",
    cookiePrefDelete: "🗑️ Eliminar todas mis cookies",
    cookiePrefSave: "✅ Guardar preferencias",
    cookiePrefSaved: "✓ ¡Guardado!",
    cookiePrefDeleted: "🗑️ ¡Eliminadas!",
    cookiePrefStatusNone: "Aún no has guardado tus preferencias.",
    cookiePrefStatusAll: "✅ Tienes todas las cookies activadas.",
    cookiePrefStatusEss: "🔒 Solo cookies esenciales activadas.",
    footerRights: `© ${new Date().getFullYear()} AhorraMásUSA. Todos los derechos reservados.`,
    /* Footer */
    footerText: "Sitio de afiliados. Los precios pueden variar al momento de la compra.",
    footerSub: "Participamos en el Programa de Afiliados de Amazon Services LLC y otros programas de afiliados.",
    /* Misc */
    storeLabel: "Tienda",
    defaultOffer: store => `Oferta en ${store}`,
    errorTitle: "Error al cargar",
    errorHint: "Verifica que en tu Google Sheet hayas hecho:<br><strong>Archivo → Compartir → Publicar en la web</strong><br>→ Selecciona la hoja → formato CSV → Publicar",
    badgeLabels: { hot: "🔥 HOT", new: "✨ NUEVO", limited: "⏰ LIMITADO", sale: "💸 OFERTA" },
  },

  en: {
    appName: "SaveMoreUSADeals",
    logoSrc: "images/logo-en.png",
    pageTitle: "SaveMoreUSADeals — Best Deals of the Day",
    searchPlaceholder: "🔍 Search deals…",
    heroBadge: "🟢 Auto-updated · ",
    heroDeals: "deals",
    heroH1: 'Best deals<br/><span class="hero-h1-accent">of the day</span>',
    heroSub: "Verified deals on tech, gaming, home & more. Links go straight to the store.",
    heroSearch: "🔍 Search all deals…",
    disclosureText: 'ℹ️ <strong>Notice:</strong> This site contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.',
    catAll: "🌟 All",
    catTec: "💻 Tech",
    catGaming: "🎮 Gaming",
    catHogar: "🏠 Home",
    catModa: "👗 Fashion",
    catDeportes: "⚽ Sports",
    catBelleza: "💄 Beauty",
    catOtros: "📦 Other",
    sectionTitle: "🔥 All Deals",
    loading: "Loading deals from Google Sheets…",
    seeOffer: "🛒 See deal →",
    seePrice: "See price →",
    couponLabel: "Coupon",
    copyBtn: "Copy",
    copied: "✓ Copied",
    noResults: "No results",
    noResultsSub: "Try a different category or search term.",
    remainH: "h left",
    remainD: "d left",
    dealCount: n => `${n} deal${n !== 1 ? "s" : ""}`,
    couponExpiresIn: "Valid for:",
    couponExpired: "⚠️ Coupon expired",
    prevPage: "← Prev",
    nextPage: "Next →",
    pageOf: (p, t) => `Page ${p} of ${t}`,
    howEyebrow: "Quick guide",
    howTitle: "How does SaveMoreUSADeals work?",
    howItems: [
      {
        q: "What are coupon codes?",
        a: "Coupon codes are special discount codes you enter at checkout to get a reduced price. They are only valid for a limited time — grab them fast before they expire!"
      },
      {
        q: "How do I use a coupon code?",
        a: 'Click "See deal" to go to the store, add the product to your cart, then paste the coupon code at checkout. The discount will be applied automatically to your order total.'
      },
      {
        q: "How often are deals updated?",
        a: "We update deals regularly. However, prices can change at the store without notice. Always verify the final price before completing your purchase."
      },
      {
        q: "Does this site charge anything?",
        a: "No. SaveMoreUSADeals is completely free for shoppers. We earn a small commission from stores when you make a purchase through our links, at absolutely no extra cost to you."
      },
      {
        q: "How can I get notified about the best deals in real time?",
        a: "Join our WhatsApp group to receive instant notifications about the best deals, exclusive coupons, and flash sales — completely free."
      },
    ],
    communityTitle: "Join our community!",
    communitySub: "Get the best deals, exclusive coupons, and flash sale alerts directly on your WhatsApp — completely free.",
    communityBtn: "Join now",
    waJoin: "Join the group",
    waTooltip: "🔔 Get deals on WhatsApp",
    waLink: "https://chat.whatsapp.com/BbbW4zDK83gHx1fDcFOfFp",
    /* Contact */
    contactEyebrow: "Contact Us",
    contactTitle: "Have a question?",
    contactSub: "We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.",
    contactNameLabel: "Full name",
    contactNamePh: "Your name",
    contactEmailLabel: "Email address",
    contactEmailPh: "you@email.com",
    contactMsgLabel: "Message",
    contactMsgPh: "How can we help you?",
    contactSend: "Send message",
    contactSending: "Sending…",
    contactSuccess: "✓ Message sent successfully! We'll get back to you soon.",
    contactError: "❌ Failed to send. Please try again.",
    contactSubjectVal: "Inquiry from SaveMoreUSADeals",
    /* Cookie banner */
    cookieTitle: "🍪 We use cookies",
    cookieText: "We use essential cookies for site functionality and optional analytics cookies to improve your experience. See our",
    cookieMore: "Cookie Policy",
    cookieAccept: "Accept all",
    cookieDecline: "Essential only",
    /* Footer legal */
    legalSectionTitle: "Legal",
    affiliateDisclosureLabel: "Affiliate Disclosure",
    privacyPolicyLabel: "Privacy Policy",
    termsLabel: "Terms & Conditions",
    cookiesPolicyLabel: "Cookie Policy",
    cookiePrefsLabel: "⚙️ Cookie Preferences",
    contactNavLabel: "Contact",
    /* Cookie preferences modal */
    cookiePrefTitle: "⚙️ Cookie Preferences",
    cookiePrefIntro: "Manage which cookies you want to allow. You can change these preferences at any time.",
    cookiePrefEssentialName: "🔒 Essential Cookies",
    cookiePrefAlways: "Always active",
    cookiePrefEssentialDesc: "Required for basic site functionality: remembering your language and cookie decision. Cannot be disabled.",
    cookiePrefAnalyticsName: "📊 Analytics Cookies",
    cookiePrefOptional: "Optional",
    cookiePrefAnalyticsDesc: "Google Analytics to understand how the site is used (page views, session time, country). Data is anonymous.",
    cookiePrefDelete: "🗑️ Delete all my cookies",
    cookiePrefSave: "✅ Save preferences",
    cookiePrefSaved: "✓ Saved!",
    cookiePrefDeleted: "🗑️ Deleted!",
    cookiePrefStatusNone: "You haven't saved your preferences yet.",
    cookiePrefStatusAll: "✅ All cookies are enabled.",
    cookiePrefStatusEss: "🔒 Essential cookies only.",
    footerRights: `© ${new Date().getFullYear()} SaveMoreUSADeals. All rights reserved.`,
    footerText: "Affiliate site. Prices may vary at the time of purchase.",
    footerSub: "We participate in the Amazon Services LLC Associates Program and other affiliate programs.",
    storeLabel: "Store",
    defaultOffer: store => `Deal at ${store}`,
    errorTitle: "Error loading",
    errorHint: "Verify that in your Google Sheet you have done:<br><strong>File → Share → Publish to web</strong><br>→ Select the sheet → CSV format → Publish",
    badgeLabels: { hot: "🔥 HOT", new: "✨ NEW", limited: "⏰ LIMITED", sale: "💸 SALE" },
  },
};

/* ── LEGAL CONTENT ───────────────────────────────────────── */
const LEGAL = {
  es: {
    affiliate: {
      title: "Divulgación de Afiliados",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Última actualización: mayo de 2025</p>

          <h3>Programa de Afiliados de Amazon</h3>
          <p>AhorraMásUSA / SaveMoreUSADeals es participante del Programa de Afiliados de Amazon Services LLC (Amazon Associates), un programa de publicidad de afiliados diseñado para proporcionar a los sitios web un medio para obtener honorarios por publicidad mediante la publicación de anuncios y enlaces a Amazon.com.</p>
          <p>Como Asociado de Amazon, ganamos comisiones en las compras que califican. Esto significa que, si haces clic en uno de nuestros enlaces de afiliado y compras un producto, recibimos una pequeña comisión de Amazon, sin ningún costo adicional para ti.</p>

          <h3>Otros programas de afiliados</h3>
          <p>Además de Amazon, podemos participar en otros programas de afiliados de terceros (por ejemplo, Walmart, Best Buy, eBay, entre otros). En todos los casos, podemos ganar una comisión cuando realizas una compra a través de nuestros enlaces, sin ningún costo adicional para ti.</p>

          <h3>Identificación de enlaces de afiliado</h3>
          <p>Los enlaces de afiliado en este sitio están marcados con el atributo <code>rel="sponsored"</code> en el HTML. Todos los botones "Ver oferta" y similares pueden ser enlaces de afiliado.</p>

          <h3>Transparencia e independencia editorial</h3>
          <p>Las comisiones de afiliado no influyen en qué productos decidimos mostrar ni en los precios que publicamos. Recopilamos deals que consideramos de valor para nuestros visitantes. No recibimos pago por colocar productos específicos en nuestro sitio.</p>

          <h3>Cumplimiento FTC</h3>
          <p>En cumplimiento con las directrices de la Comisión Federal de Comercio (FTC) de los Estados Unidos (16 CFR § 255), declaramos abiertamente que este sitio contiene relaciones de afiliado compensadas. Puedes consultar las directrices completas en <a href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking" target="_blank" rel="noopener noreferrer">ftc.gov</a>.</p>

          <h3>Contacto</h3>
          <p>Si tienes preguntas sobre nuestra política de afiliados, puedes contactarnos a través de nuestro <a href="#contact" onclick="closeAllModals()">formulario de contacto</a>.</p>
        </div>`
    },
    privacy: {
      title: "Política de Privacidad",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Última actualización: mayo de 2025</p>

          <h3>1. ¿Quiénes somos?</h3>
          <p>AhorraMásUSA / SaveMoreUSADeals (accesible en <strong>savemoreusadeals.com</strong>) es un sitio de agregación de deals y enlaces de afiliado. No somos una tienda en línea.</p>

          <h3>2. Información que recopilamos</h3>
          <p><strong>Datos de almacenamiento local (localStorage):</strong> Guardamos las siguientes preferencias en tu navegador. Estos datos nunca se transmiten a nuestros servidores:</p>
          <ul>
            <li><code>ds_lang</code> — Tu preferencia de idioma (ES o EN).</li>
            <li><code>ds_cookie_consent</code> — Tu decisión sobre el consentimiento de cookies.</li>
          </ul>
          <p><strong>Formulario de contacto:</strong> Si nos envías un mensaje, recopilamos tu nombre, correo electrónico y el contenido del mensaje. Estos datos son procesados por <strong>Web3Forms</strong> (web3forms.com) para entregar el mensaje a nuestra bandeja de entrada. Consulta su <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>.</p>
          <p><strong>Datos de uso (analítica):</strong> Si aceptas las cookies opcionales, podemos recopilar datos de uso anónimos mediante Google Analytics para comprender el tráfico del sitio (páginas vistas, tiempo de sesión, dispositivo, país). Ningún dato personal identificable es enviado a Google.</p>

          <h3>3. Cómo usamos la información</h3>
          <ul>
            <li>Responderte a través del formulario de contacto.</li>
            <li>Recordar tu preferencia de idioma.</li>
            <li>Mejorar el sitio mediante análisis de tráfico anonimizado.</li>
          </ul>

          <h3>4. Terceros</h3>
          <ul>
            <li><strong>Amazon Associates:</strong> Los clicks en nuestros enlaces redirigen a Amazon.com o tiendas afiliadas, que tienen sus propias políticas de privacidad independientes.</li>
            <li><strong>Web3Forms:</strong> Procesa los envíos del formulario de contacto.</li>
            <li><strong>Google Fonts:</strong> Cargamos tipografías desde los servidores de Google, lo que puede registrar tu dirección IP. Puedes consultar la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Google</a>.</li>
            <li><strong>GitHub Pages:</strong> Nuestro sitio está alojado en GitHub Pages (GitHub, Inc., propiedad de Microsoft), que puede recopilar datos técnicos de acceso.</li>
          </ul>

          <h3>5. Cookies</h3>
          <p>Consulta nuestra <a href="#" onclick="openModal('cookies');return false;">Política de Cookies</a> para más detalles.</p>

          <h3>6. Tus derechos</h3>
          <p>Tienes derecho a solicitar acceso, rectificación o eliminación de cualquier dato personal que hayamos podido recopilar a través del formulario de contacto. Para ejercer estos derechos, escríbenos a través de nuestro <a href="#contact" onclick="closeAllModals()">formulario de contacto</a>.</p>

          <h3>7. Seguridad</h3>
          <p>No almacenamos contraseñas, datos de pago ni información financiera de ningún tipo. El sitio utiliza HTTPS en todo momento.</p>

          <h3>8. Menores de edad</h3>
          <p>Este sitio no está dirigido a menores de 13 años y no recopila conscientemente información personal de menores.</p>

          <h3>9. Cambios en esta política</h3>
          <p>Podemos actualizar esta política ocasionalmente. La fecha de "última actualización" al inicio de esta página refleja los cambios más recientes.</p>
        </div>`
    },
    terms: {
      title: "Términos y Condiciones",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Última actualización: mayo de 2025</p>

          <h3>1. Aceptación de los términos</h3>
          <p>Al acceder y utilizar <strong>savemoreusadeals.com</strong> ("el Sitio"), aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, por favor no utilices el Sitio.</p>

          <h3>2. Descripción del servicio</h3>
          <p>AhorraMásUSA / SaveMoreUSADeals es un agregador de ofertas y cupones que recopila y comparte información sobre productos y descuentos disponibles en tiendas de terceros. <strong>No somos una tienda en línea.</strong> No vendemos, distribuimos ni enviamos productos. Las transacciones se realizan directamente entre el usuario y el comercio correspondiente.</p>

          <h3>3. Exactitud de la información</h3>
          <p>Hacemos nuestro mejor esfuerzo para mostrar precios y disponibilidad actualizados; sin embargo, los precios pueden cambiar en la tienda sin previo aviso. <strong>Siempre verifica el precio final en la tienda antes de completar tu compra.</strong> No somos responsables de diferencias de precio ni de errores en la información mostrada.</p>

          <h3>4. Cupones y códigos de descuento</h3>
          <p>Los códigos de cupón mostrados pueden expirar o ser desactivados por el comercio en cualquier momento. No garantizamos la validez de los cupones ni que el descuento se aplique en todos los casos. El uso de cupones está sujeto a los términos y condiciones del comercio correspondiente.</p>

          <h3>5. Relaciones de afiliado</h3>
          <p>Muchos de los enlaces en este sitio son enlaces de afiliado. Consulta nuestra <a href="#" onclick="openModal('affiliate');return false;">Divulgación de Afiliados</a> para más información.</p>

          <h3>6. Enlaces a sitios de terceros</h3>
          <p>El Sitio contiene enlaces a tiendas y sitios web de terceros (Amazon, Walmart, Best Buy, etc.). No controlamos el contenido, las políticas ni las prácticas de esos sitios, y no somos responsables de su funcionamiento, seguridad o privacidad.</p>

          <h3>7. Limitación de responsabilidad</h3>
          <p>En la máxima medida permitida por la ley, AhorraMásUSA / SaveMoreUSADeals no será responsable de:</p>
          <ul>
            <li>Compras realizadas a través de nuestros enlaces.</li>
            <li>Problemas con productos, envíos, devoluciones o atención al cliente en las tiendas enlazadas.</li>
            <li>Pérdidas económicas o daños derivados del uso de este sitio.</li>
            <li>Inexactitudes en precios, disponibilidad o descripciones de productos.</li>
          </ul>

          <h3>8. Propiedad intelectual</h3>
          <p>El diseño, código fuente, textos e imágenes originales de este sitio son propiedad de SaveMoreUSADeals. Las imágenes de productos son propiedad de sus respectivos comercios y se muestran bajo las políticas de uso de programas de afiliados. Queda prohibida la reproducción total o parcial del contenido sin autorización.</p>

          <h3>9. Disponibilidad del servicio</h3>
          <p>No garantizamos que el Sitio esté disponible de forma ininterrumpida. Podemos modificar, suspender o interrumpir el servicio en cualquier momento sin previo aviso.</p>

          <h3>10. Ley aplicable</h3>
          <p>Estos Términos se rigen e interpretan de conformidad con las leyes del Estado de Florida, Estados Unidos, sin perjuicio de sus principios de conflicto de leyes.</p>

          <h3>11. Cambios en los términos</h3>
          <p>Nos reservamos el derecho de actualizar estos Términos en cualquier momento. El uso continuado del Sitio después de los cambios constituye la aceptación de los nuevos términos.</p>

          <h3>12. Contacto</h3>
          <p>Para preguntas sobre estos términos, contáctanos a través de nuestro <a href="#contact" onclick="closeAllModals()">formulario de contacto</a>.</p>
        </div>`
    },
    cookies: {
      title: "Política de Cookies",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Última actualización: mayo de 2025</p>

          <h3>¿Qué son las cookies?</h3>
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo para recordar preferencias y mejorar la experiencia del usuario. Este sitio utiliza principalmente <strong>localStorage</strong> (almacenamiento local del navegador), que funciona de forma similar a las cookies pero no se envía automáticamente al servidor.</p>

          <h3>Tipos de almacenamiento que utilizamos</h3>

          <h4>🔒 Esenciales (siempre activos)</h4>
          <p>Son necesarios para el funcionamiento básico del sitio. No pueden desactivarse.</p>
          <table class="legal-table">
            <thead><tr><th>Nombre</th><th>Propósito</th><th>Duración</th></tr></thead>
            <tbody>
              <tr><td><code>ds_lang</code></td><td>Guarda tu preferencia de idioma (ES/EN)</td><td>1 año</td></tr>
              <tr><td><code>ds_cookie_consent</code></td><td>Registra tu decisión sobre las cookies</td><td>1 año</td></tr>
            </tbody>
          </table>

          <h4>📊 Analítica (opcionales)</h4>
          <p>Si aceptas todas las cookies, podemos activar Google Analytics para entender cómo se usa el sitio. Los datos recopilados son anonimizados y agregados; no identifican a usuarios individuales.</p>
          <table class="legal-table">
            <thead><tr><th>Servicio</th><th>Propósito</th><th>Política</th></tr></thead>
            <tbody>
              <tr><td>Google Analytics</td><td>Análisis de tráfico anónimo</td><td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Ver política</a></td></tr>
            </tbody>
          </table>

          <h4>🔗 Cookies de terceros</h4>
          <p>Cuando haces clic en un enlace de afiliado, el sitio de destino (Amazon, Walmart, etc.) puede establecer sus propias cookies para rastrear la referencia de la compra. Estas cookies no están bajo nuestro control. Consulta la política de privacidad del comercio correspondiente.</p>

          <h3>¿Cómo gestionar tus preferencias?</h3>
          <p>Puedes cambiar tu preferencia en cualquier momento haciendo clic en "Solo esenciales" o "Aceptar todas" en el banner de cookies (que reaparecerá si eliminas el almacenamiento del navegador).</p>
          <p>También puedes gestionar las cookies directamente en la configuración de tu navegador:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener">Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Edge</a></li>
          </ul>

          <h3>Más información</h3>
          <p>Para más información general sobre cookies visita <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</p>
        </div>`
    }
  },

  en: {
    affiliate: {
      title: "Affiliate Disclosure",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Last updated: May 2025</p>

          <h3>Amazon Associates Program</h3>
          <p>SaveMoreUSADeals / AhorraMásUSA is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
          <p>As an Amazon Associate, we earn from qualifying purchases. This means that if you click on one of our affiliate links and purchase a product, we receive a small commission from Amazon at no additional cost to you.</p>

          <h3>Other Affiliate Programs</h3>
          <p>In addition to Amazon, we may participate in other third-party affiliate programs (e.g., Walmart, Best Buy, eBay, and others). In all cases, we may earn a commission when you make a purchase through our links, at no extra cost to you.</p>

          <h3>Identification of Affiliate Links</h3>
          <p>Affiliate links on this site are marked with the <code>rel="sponsored"</code> attribute in the HTML. All "See deal" buttons and similar calls to action may be affiliate links.</p>

          <h3>Editorial Independence</h3>
          <p>Affiliate commissions do not influence which products we choose to feature or the prices we display. We curate deals that we believe provide value to our visitors. We do not receive payment for placing specific products on our site.</p>

          <h3>FTC Compliance</h3>
          <p>In compliance with the Federal Trade Commission (FTC) guidelines (16 CFR § 255), we openly disclose that this site contains compensated affiliate relationships. You can review the complete guidelines at <a href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking" target="_blank" rel="noopener noreferrer">ftc.gov</a>.</p>

          <h3>Contact</h3>
          <p>If you have questions about our affiliate policy, please contact us through our <a href="#contact" onclick="closeAllModals()">contact form</a>.</p>
        </div>`
    },
    privacy: {
      title: "Privacy Policy",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Last updated: May 2025</p>

          <h3>1. Who We Are</h3>
          <p>SaveMoreUSADeals / AhorraMásUSA (accessible at <strong>savemoreusadeals.com</strong>) is a deals aggregator and affiliate link site. We are not an online store.</p>

          <h3>2. Information We Collect</h3>
          <p><strong>Local storage data (localStorage):</strong> We save the following preferences in your browser. These are never transmitted to our servers:</p>
          <ul>
            <li><code>ds_lang</code> — Your language preference (ES or EN).</li>
            <li><code>ds_cookie_consent</code> — Your cookie consent decision.</li>
          </ul>
          <p><strong>Contact form:</strong> If you send us a message, we collect your name, email address, and message content. This data is processed by <strong>Web3Forms</strong> (web3forms.com) to deliver the message to our inbox. See their <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
          <p><strong>Usage data (analytics):</strong> If you accept optional cookies, we may collect anonymous usage data via Google Analytics to understand site traffic (page views, session time, device, country). No personally identifiable data is sent to Google.</p>

          <h3>3. How We Use Information</h3>
          <ul>
            <li>To reply to you through the contact form.</li>
            <li>To remember your language preference.</li>
            <li>To improve the site through anonymized traffic analysis.</li>
          </ul>

          <h3>4. Third Parties</h3>
          <ul>
            <li><strong>Amazon Associates:</strong> Clicks on our links redirect to Amazon.com or affiliated stores, which have their own independent privacy policies.</li>
            <li><strong>Web3Forms:</strong> Processes contact form submissions.</li>
            <li><strong>Google Fonts:</strong> We load fonts from Google's servers, which may log your IP address. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
            <li><strong>GitHub Pages:</strong> Our site is hosted on GitHub Pages (GitHub, Inc., owned by Microsoft), which may collect technical access data.</li>
          </ul>

          <h3>5. Cookies</h3>
          <p>Please see our <a href="#" onclick="openModal('cookies');return false;">Cookie Policy</a> for details.</p>

          <h3>6. Your Rights</h3>
          <p>You have the right to request access to, correction of, or deletion of any personal data we may have collected through the contact form. To exercise these rights, write to us through our <a href="#contact" onclick="closeAllModals()">contact form</a>.</p>

          <h3>7. Security</h3>
          <p>We do not store passwords, payment data, or financial information of any kind. The site uses HTTPS at all times.</p>

          <h3>8. Children's Privacy</h3>
          <p>This site is not directed at children under 13 and does not knowingly collect personal information from minors.</p>

          <h3>9. Changes to This Policy</h3>
          <p>We may update this policy occasionally. The "last updated" date at the top of this page reflects the most recent changes.</p>
        </div>`
    },
    terms: {
      title: "Terms & Conditions",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Last updated: May 2025</p>

          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using <strong>savemoreusadeals.com</strong> ("the Site"), you accept these Terms and Conditions in full. If you disagree with any part of these terms, please do not use the Site.</p>

          <h3>2. Description of Service</h3>
          <p>SaveMoreUSADeals / AhorraMásUSA is a deals and coupon aggregator that curates and shares information about products and discounts available at third-party stores. <strong>We are not an online store.</strong> We do not sell, ship, or distribute products. Transactions occur directly between you and the respective retailer.</p>

          <h3>3. Accuracy of Information</h3>
          <p>We make our best effort to display current prices and availability; however, prices may change at the store without prior notice. <strong>Always verify the final price at the store before completing your purchase.</strong> We are not responsible for price discrepancies or inaccuracies in the information displayed.</p>

          <h3>4. Coupons and Discount Codes</h3>
          <p>Coupon codes shown may expire or be deactivated by the retailer at any time. We do not guarantee the validity of coupons or that the discount will apply in all cases. Coupon use is subject to the terms and conditions of the respective retailer.</p>

          <h3>5. Affiliate Relationships</h3>
          <p>Many links on this site are affiliate links. See our <a href="#" onclick="openModal('affiliate');return false;">Affiliate Disclosure</a> for more information.</p>

          <h3>6. Links to Third-Party Sites</h3>
          <p>The Site contains links to third-party stores and websites (Amazon, Walmart, Best Buy, etc.). We do not control the content, policies, or practices of those sites and are not responsible for their operation, security, or privacy.</p>

          <h3>7. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, SaveMoreUSADeals shall not be liable for:</p>
          <ul>
            <li>Purchases made through our links.</li>
            <li>Issues with products, shipping, returns, or customer service at linked stores.</li>
            <li>Financial losses or damages arising from the use of this site.</li>
            <li>Inaccuracies in prices, availability, or product descriptions.</li>
          </ul>

          <h3>8. Intellectual Property</h3>
          <p>The design, source code, original texts, and images of this site are the property of SaveMoreUSADeals. Product images are the property of their respective retailers and are displayed under affiliate program usage policies. Reproduction of content without authorization is prohibited.</p>

          <h3>9. Service Availability</h3>
          <p>We do not guarantee uninterrupted availability of the Site. We may modify, suspend, or discontinue the service at any time without prior notice.</p>

          <h3>10. Governing Law</h3>
          <p>These Terms are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law principles.</p>

          <h3>11. Changes to Terms</h3>
          <p>We reserve the right to update these Terms at any time. Continued use of the Site after changes constitutes acceptance of the new terms.</p>

          <h3>12. Contact</h3>
          <p>For questions about these terms, contact us through our <a href="#contact" onclick="closeAllModals()">contact form</a>.</p>
        </div>`
    },
    cookies: {
      title: "Cookie Policy",
      html: `
        <div class="legal-content">
          <p class="legal-updated">Last updated: May 2025</p>

          <h3>What Are Cookies?</h3>
          <p>Cookies are small text files that websites store on your device to remember preferences and improve user experience. This site primarily uses <strong>localStorage</strong> (browser local storage), which works similarly to cookies but is not automatically sent to the server.</p>

          <h3>Types of Storage We Use</h3>

          <h4>🔒 Essential (always active)</h4>
          <p>These are required for the basic functioning of the site and cannot be disabled.</p>
          <table class="legal-table">
            <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
            <tbody>
              <tr><td><code>ds_lang</code></td><td>Saves your language preference (ES/EN)</td><td>1 year</td></tr>
              <tr><td><code>ds_cookie_consent</code></td><td>Records your cookie decision</td><td>1 year</td></tr>
            </tbody>
          </table>

          <h4>📊 Analytics (optional)</h4>
          <p>If you accept all cookies, we may activate Google Analytics to understand how the site is used. Data collected is anonymized and aggregated; individual users are not identified.</p>
          <table class="legal-table">
            <thead><tr><th>Service</th><th>Purpose</th><th>Policy</th></tr></thead>
            <tbody>
              <tr><td>Google Analytics</td><td>Anonymous traffic analysis</td><td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">View policy</a></td></tr>
            </tbody>
          </table>

          <h4>🔗 Third-Party Cookies</h4>
          <p>When you click an affiliate link, the destination site (Amazon, Walmart, etc.) may set its own cookies to track the purchase referral. These cookies are not under our control. Please refer to the privacy policy of the respective retailer.</p>

          <h3>Managing Your Preferences</h3>
          <p>You can change your preference at any time by clicking "Essential only" or "Accept all" on the cookie banner (which will reappear if you clear your browser's local storage).</p>
          <p>You can also manage cookies directly in your browser settings:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener">Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Edge</a></li>
          </ul>

          <h3>More Information</h3>
          <p>For more general information about cookies visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</p>
        </div>`
    }
  }
};

/* ── LANGUAGE STATE ──────────────────────────────────────── */
let currentLang = detectLang();

function detectLang() {
  const saved = localStorage.getItem("ds_lang");
  if (saved && I18N[saved]) return saved;
  const browser = (navigator.language || "es").toLowerCase();
  return browser.startsWith("en") ? "en" : "es";
}

function t(key) {
  const val = I18N[currentLang][key];
  return val !== undefined ? val : (I18N["es"][key] ?? key);
}

function applyLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  localStorage.setItem("ds_lang", lang);
  document.documentElement.lang = lang;

  const L = I18N[lang];

  document.title = L.pageTitle;
  const pageTitleEl = document.getElementById("pageTitle");
  if (pageTitleEl) pageTitleEl.textContent = L.pageTitle;

  const logoImg = document.getElementById("logoImg");
  if (logoImg) { logoImg.src = L.logoSrc; logoImg.alt = L.appName; }
  const heroLogoImg = document.getElementById("heroLogoImg");
  if (heroLogoImg) { heroLogoImg.src = L.logoSrc; heroLogoImg.alt = L.appName; }
  const footerLogoImg = document.getElementById("footerLogoImg");
  if (footerLogoImg) { footerLogoImg.src = L.logoSrc; footerLogoImg.alt = L.appName; }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = L[el.dataset.i18n];
    if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = L[el.dataset.i18nHtml];
    if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const v = L[el.dataset.i18nPh];
    if (typeof v === "string") el.placeholder = v;
  });
  document.querySelectorAll("[data-i18n-href]").forEach(el => {
    const v = L[el.dataset.i18nHref];
    if (typeof v === "string") el.href = v;
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const v = L[el.dataset.i18nTitle];
    if (typeof v === "string") el.title = v;
  });

  // Update contact form subject
  const subjectInput = document.getElementById("contactSubjectInput");
  if (subjectInput) subjectInput.value = L.contactSubjectVal;

  document.querySelectorAll(".lang-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );

  // Update open modal title if any
  document.querySelectorAll(".modal.open").forEach(modal => {
    const key = modal.dataset.legalKey;
    if (key && LEGAL[lang]?.[key]) {
      modal.querySelector(".modal-title").textContent = LEGAL[lang][key].title;
      modal.querySelector(".modal-body").innerHTML = LEGAL[lang][key].html;
    }
  });

  renderHowItWorks();
  if (allDeals.length) renderDeals();
}

/* ── STORE / CAT / BADGE MAPS ────────────────────────────── */
const STORE_LABELS = {
  "amazon.com": "Amazon", "amzn.to": "Amazon", "a.co": "Amazon",
  "walmart.com": "Walmart", "bestbuy.com": "Best Buy",
  "aliexpress.com": "AliExpress", "ebay.com": "eBay",
  "target.com": "Target", "costco.com": "Costco",
};

const CAT_ICONS = {
  tecnologia: "💻", gaming: "🎮", hogar: "🏠", moda: "👗",
  deportes: "⚽", belleza: "💄", viajes: "✈️", comida: "🍔", otros: "📦",
};

const CAT_LABELS = {
  es: {
    tecnologia: "Tecnología", gaming: "Gaming", hogar: "Hogar", moda: "Moda",
    deportes: "Deportes", belleza: "Belleza", viajes: "Viajes", comida: "Comida", otros: "Otros",
  },
  en: {
    tecnologia: "Tech", gaming: "Gaming", hogar: "Home", moda: "Fashion",
    deportes: "Sports", belleza: "Beauty", viajes: "Travel", comida: "Food", otros: "Other",
  },
};

const BADGE_CSS = {
  hot: "badge-hot", new: "badge-new", limited: "badge-limited", sale: "badge-sale",
};

/* ── HELPERS ─────────────────────────────────────────────── */
function isValidUrl(str) {
  try { return ["http:", "https:"].includes(new URL(str).protocol); }
  catch { return false; }
}

function detectStore(url) {
  try {
    const host = new URL(url).hostname.replace("www.", "");
    for (const [domain, label] of Object.entries(STORE_LABELS))
      if (host.includes(domain)) return label;
  } catch { /* ignore */ }
  return t("storeLabel");
}

function formatCountdown(ms) {
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  if (d > 0) return `${d}d ${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m`;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h =>
    h.replace(/"/g, "").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
  return lines.slice(1).map(line => {
    const values = [];
    let inside = false, cur = "";
    for (const ch of line) {
      if (ch === '"') { inside = !inside; continue; }
      if (ch === "," && !inside) { values.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    values.push(cur.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
}

async function fetchSheet() {
  const res = await fetch(CSV_URL + "&t=" + Date.now());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (text.trim().startsWith("<")) throw new Error("SHEET_NOT_PUBLISHED");
  return parseCSV(text);
}

function parseExpiryDate(str) {
  if (!str || !str.trim()) return null;
  const trimmed = str.trim();
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const h = parseFloat(trimmed);
    return h > 0 ? new Date(Date.now() + h * 3_600_000) : null;
  }
  const parsed = new Date(trimmed.replace(" ", "T"));
  return isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeRow(row) {
  const get = (...keys) => {
    for (const k of keys) { const v = row[k]; if (v?.trim()) return v.trim(); }
    return "";
  };

  const url = get("url", "link", "enlace");
  const titulo_es = get("titulo_es", "titulo", "title", "nombre", "producto");
  const titulo_en = get("titulo_en") || titulo_es;
  const notas_es = get("notas_es", "notas", "notes", "descripcion", "description", "desc");
  const notas_en = get("notas_en") || notas_es;
  const imagen = get("imagen", "image", "img", "foto");
  const precioStr = get("precio", "price", "precio_actual");
  const antStr = get("precio_anterior", "precio_original", "original_price", "antes");
  const categoria = (get("categoria", "category", "cat").toLowerCase()) || "otros";
  const badge = get("badge", "etiqueta").toLowerCase();
  const activo = get("activo", "active", "visible");
  const expiraDealStr = get("expira_en", "expires_in", "expira", "horas");
  const cupon = get("cupon", "cupón", "coupon", "codigo", "code");
  const expCuponStr = get("expira_cupon", "coupon_expires", "cupon_expira", "expira_codigo");

  if (!url || !isValidUrl(url)) return null;
  const isActive = activo
    ? !["no", "false", "0", "inactivo"].includes(activo.toLowerCase()) : true;
  if (!isActive) return null;

  const precio = parseFloat(precioStr.replace(/[$,]/g, "")) || 0;
  const anterior = parseFloat(antStr.replace(/[$,]/g, "")) || 0;
  const descuento = (anterior > precio && precio > 0)
    ? Math.round(((anterior - precio) / anterior) * 100) : 0;

  const expiresAt = parseExpiryDate(expiraDealStr);
  const cuponExpiresAt = cupon ? parseExpiryDate(expCuponStr) : null;

  return {
    url, titulo_es, titulo_en, notas_es, notas_en,
    imagen, precio, anterior, descuento,
    categoria: CAT_ICONS[categoria] ? categoria : "otros",
    badge: BADGE_CSS[badge] ? badge : "",
    store: detectStore(url),
    expiresAt, cupon, cuponExpiresAt,
  };
}

/* ── COPY COUPON ─────────────────────────────────────────── */
window.copyDealCoupon = function (e, code) {
  e.preventDefault();
  e.stopPropagation();
  const btn = e.currentTarget;
  const origHTML = btn.innerHTML;

  const success = () => {
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/></svg> ${t("copied")}`;
    btn.classList.add("copied");
    setTimeout(() => { btn.innerHTML = origHTML; btn.classList.remove("copied"); }, 2200);
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code).then(success).catch(fallback);
  } else { fallback(); }

  function fallback() {
    try {
      const ta = Object.assign(document.createElement("textarea"), {
        value: code, style: "position:fixed;opacity:0",
      });
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      success();
    } catch { /* silent */ }
  }
};

/* ── SCISSORS SVG ────────────────────────────────────────── */
const SCISSORS_SVG = `<svg class="scissors-icon" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <circle cx="6" cy="6" r="3"/>
  <circle cx="6" cy="18" r="3"/>
  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
</svg>`;

/* ── BUILD CARD ──────────────────────────────────────────── */
function buildCard(deal, index) {
  const L = I18N[currentLang];
  const titulo = (currentLang === "en" ? deal.titulo_en : deal.titulo_es) || L.defaultOffer(deal.store);
  const notas = currentLang === "en" ? deal.notas_en : deal.notas_es;
  const badgeLabel = L.badgeLabels[deal.badge];
  const badgeCss = BADGE_CSS[deal.badge];
  const catIcon = CAT_ICONS[deal.categoria] || "📦";
  const catLabel = (CAT_LABELS[currentLang] || CAT_LABELS.es)[deal.categoria] || deal.categoria;

  const priceHtml = deal.precio > 0
    ? `<div class="card-price-row">
         <span class="price-cur">$${deal.precio.toFixed(2)}</span>
         ${deal.anterior > deal.precio
      ? `<span class="price-was">$${deal.anterior.toFixed(2)}</span>
              <span class="price-off">-${deal.descuento}%</span>` : ""}
       </div>`
    : `<div class="card-price-row"><span class="price-see">${t("seePrice")}</span></div>`;

  let timerHtml = "";
  if (deal.expiresAt) {
    const diff = deal.expiresAt - Date.now();
    if (diff > 0) {
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      timerHtml = `<div class="card-timer${h < 6 ? " urgent" : ""}">
        ${h < 24
          ? `⏰ ${h}h ${m}m ${t("remainH")}`
          : `📅 ${Math.floor(h / 24)}d ${t("remainD")}`}
      </div>`;
    }
  }

  let couponHtml = "";
  if (deal.cupon) {
    const safeCode = deal.cupon.replace(/'/g, "\\'").replace(/"/g, "&quot;");
    const copyIconSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>`;

    let ctHtml = "";
    if (deal.cuponExpiresAt) {
      const msLeft = deal.cuponExpiresAt - Date.now();
      const isExpired = msLeft <= 0;
      const ctText = isExpired
        ? t("couponExpired")
        : `⏰ ${t("couponExpiresIn")} ${formatCountdown(msLeft)}`;
      ctHtml = `<div class="coupon-timer-row">
          <span class="coupon-countdown${msLeft > 0 && msLeft < 3_600_000 ? " expiring" : ""}"
                data-expires="${deal.cuponExpiresAt.toISOString()}">${ctText}</span>
        </div>`;
    }

    couponHtml = `
      <div class="card-coupon${deal.cuponExpiresAt && deal.cuponExpiresAt <= Date.now() ? " coupon-expired" : ""}">
        <div class="coupon-row">
          ${SCISSORS_SVG}
          <span class="coupon-label">${t("couponLabel")}:</span>
          <span class="coupon-code">${deal.cupon}</span>
          <button class="coupon-copy" onclick="copyDealCoupon(event,'${safeCode}')" title="${t("copyBtn")}">
            ${copyIconSvg} ${t("copyBtn")}
          </button>
        </div>
        ${ctHtml}
      </div>`;
  }

  const storeEmoji = { Amazon: "📦", Walmart: "🏪", "Best Buy": "💙", AliExpress: "🛒", eBay: "🔨" };
  const emoji = storeEmoji[deal.store] || "🛍️";
  const imgSrc = deal.imagen
    || `https://placehold.co/400x400/021e47/444?text=${encodeURIComponent(emoji)}`;

  const card = document.createElement("a");
  card.className = "card";
  card.href = deal.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer sponsored";
  card.dataset.cat = deal.categoria;
  card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;

  card.innerHTML = `
    <div class="card-img-wrap">
      ${deal.badge && badgeCss ? `<span class="card-badge ${badgeCss}">${badgeLabel}</span>` : ""}
      <img class="card-img" src="${imgSrc}" alt="${titulo}" loading="lazy"
           onerror="this.src='https://placehold.co/400x400/021e47/444?text=${encodeURIComponent(emoji)}'" />
      <div class="card-img-overlay"><span>${t("seeOffer").replace("🛒 ", "")}</span></div>
    </div>
    <div class="card-info">
      <div class="card-top">
        <span class="card-store">${deal.store}</span>
        <span class="card-cat">${catIcon} ${catLabel}</span>
      </div>
      <h3 class="card-title">${titulo}</h3>
      ${notas ? `<p class="card-desc">${notas}</p>` : ""}
      ${priceHtml}
      ${couponHtml}
      ${timerHtml}
      <span class="card-cta">${t("seeOffer")}</span>
    </div>`;

  return card;
}

/* ── COUPON TIMERS ───────────────────────────────────────── */
function startCouponTimers() {
  setInterval(() => {
    document.querySelectorAll(".coupon-countdown[data-expires]").forEach(el => {
      const exp = new Date(el.dataset.expires);
      const ms = exp - Date.now();
      if (ms <= 0) {
        el.textContent = t("couponExpired");
        el.classList.remove("expiring");
        el.closest(".card-coupon")?.classList.add("coupon-expired");
      } else {
        el.textContent = `⏰ ${t("couponExpiresIn")} ${formatCountdown(ms)}`;
        el.classList.toggle("expiring", ms < 3_600_000);
      }
    });
  }, 1_000);
}

/* ── PAGINATION ──────────────────────────────────────────── */
let currentPage = 1;

function getPageNumbers(current, total) {
  const pages = [];
  let last = 0;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      if (last && i - last > 1) pages.push("…");
      pages.push(i);
      last = i;
    }
  }
  return pages;
}

function renderPagination(total) {
  const pag = document.getElementById("pagination");
  if (!pag) return;
  const totalPages = Math.ceil(total / DEALS_PER_PAGE);
  if (totalPages <= 1) { pag.innerHTML = ""; return; }

  const L = I18N[currentLang];
  let html = "";
  html += `<button class="pag-btn pag-arrow${currentPage === 1 ? " disabled" : ""}"
             id="pagPrev" aria-label="${L.prevPage}">${L.prevPage}</button>`;

  getPageNumbers(currentPage, totalPages).forEach(p => {
    if (p === "…") {
      html += `<span class="pag-ellipsis">…</span>`;
    } else {
      html += `<button class="pag-btn pag-num${p === currentPage ? " active" : ""}"
                 data-page="${p}" aria-label="Page ${p}">${p}</button>`;
    }
  });

  html += `<button class="pag-btn pag-arrow${currentPage === totalPages ? " disabled" : ""}"
             id="pagNext" aria-label="${L.nextPage}">${L.nextPage}</button>`;

  pag.innerHTML = html;

  if (currentPage > 1)
    pag.querySelector("#pagPrev")?.addEventListener("click", () => { currentPage--; renderDeals(); scrollToGrid(); });
  if (currentPage < totalPages)
    pag.querySelector("#pagNext")?.addEventListener("click", () => { currentPage++; renderDeals(); scrollToGrid(); });
  pag.querySelectorAll(".pag-num").forEach(btn =>
    btn.addEventListener("click", () => { currentPage = parseInt(btn.dataset.page, 10); renderDeals(); scrollToGrid(); })
  );
}

function scrollToGrid() {
  document.querySelector(".section-main")?.scrollIntoView({ behavior: "smooth" });
}

/* ── HOW IT WORKS ────────────────────────────────────────── */
const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
</svg>`;

function renderHowItWorks() {
  const accordion = document.getElementById("howAccordion");
  if (!accordion) return;
  const L = I18N[currentLang];

  accordion.innerHTML = L.howItems.map((item, i) => `
    <div class="how-item${i === 0 ? " open" : ""}">
      <button class="how-q" onclick="toggleHow(this)" aria-expanded="${i === 0}">
        <span class="how-q-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="how-q-text">${item.q}</span>
        <svg class="how-chevron" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="how-a"><p>${item.a}</p></div>
    </div>
  `).join("");

  const wrap = document.querySelector(".how-accordion-wrap");
  if (wrap) {
    wrap.querySelector(".community-card")?.remove();
    const card = document.createElement("div");
    card.className = "community-card";
    card.innerHTML = `
      <div class="community-icon">${WA_SVG}</div>
      <div class="community-info">
        <h3>${L.communityTitle}</h3>
        <p>${L.communitySub}</p>
      </div>
      <a href="${L.waLink}" class="community-btn" target="_blank" rel="noopener noreferrer">
        ${WA_SVG} ${L.communityBtn}
      </a>`;
    wrap.appendChild(card);
  }
}

window.toggleHow = function (btn) {
  const item = btn.closest(".how-item");
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".how-item").forEach(i => {
    i.classList.remove("open");
    i.querySelector(".how-q")?.setAttribute("aria-expanded", "false");
  });
  if (!isOpen) {
    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
};

/* ── RENDER DEALS ────────────────────────────────────────── */
let allDeals = [], currentCat = "all", currentSearch = "";

function renderDeals() {
  const grid = document.getElementById("dealsGrid");
  grid.innerHTML = "";

  let filtered = allDeals;
  if (currentCat !== "all") filtered = filtered.filter(d => d.categoria === currentCat);
  if (currentSearch)
    filtered = filtered.filter(d =>
      [d.titulo_es, d.titulo_en, d.notas_es, d.notas_en, d.store, d.categoria, d.cupon]
        .join(" ").toLowerCase().includes(currentSearch)
    );

  const label = document.getElementById("countLabel");
  if (label) {
    const fn = I18N[currentLang].dealCount;
    label.textContent = typeof fn === "function" ? fn(filtered.length) : filtered.length;
  }

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty">
      <div class="empty-icon">🔍</div>
      <h3>${t("noResults")}</h3>
      <p>${t("noResultsSub")}</p>
    </div>`;
    renderPagination(0);
    return;
  }

  const totalPages = Math.ceil(filtered.length / DEALS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * DEALS_PER_PAGE;
  const pageList = filtered.slice(start, start + DEALS_PER_PAGE);

  const frag = document.createDocumentFragment();
  pageList.forEach((d, i) => frag.appendChild(buildCard(d, i)));
  grid.appendChild(frag);
  renderPagination(filtered.length);
}

/* ── LEGAL MODALS ────────────────────────────────────────── */
window.openModal = function (key) {
  const legal = LEGAL[currentLang]?.[key];
  if (!legal) return;

  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById(`modal-${key}`);
  if (!modal || !overlay) return;

  modal.querySelector(".modal-title").textContent = legal.title;
  modal.querySelector(".modal-body").innerHTML = legal.html;
  modal.dataset.legalKey = key;

  overlay.classList.add("open");
  modal.classList.add("open");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
};

window.closeModal = function (key) {
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById(`modal-${key}`);
  overlay?.classList.remove("open");
  modal?.classList.remove("open");
  document.body.classList.remove("modal-open");
};

window.closeAllModals = function () {
  document.getElementById("modalOverlay")?.classList.remove("open");
  document.querySelectorAll(".modal.open").forEach(m => m.classList.remove("open"));
  document.body.classList.remove("modal-open");
};

function initModals() {
  const overlay = document.getElementById("modalOverlay");
  overlay?.addEventListener("click", closeAllModals);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAllModals();
  });
}

/* ── GOOGLE ANALYTICS 4 — CONSENTIMIENTO ─────────────────── */
function enableAnalytics() {
  if (typeof gtag !== "function") return;
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("config", "G-2JHZWWX9EM", { anonymize_ip: true });
}

function disableAnalytics() {
  if (typeof gtag !== "function") return;
  gtag("consent", "update", { analytics_storage: "denied" });
}

/* ── COOKIE PREFERENCES MODAL ────────────────────────────── */
window.openCookiePreferences = function () {
  const modal = document.getElementById("modal-cookie-prefs");
  const overlay = document.getElementById("modalOverlay");
  const toggle = document.getElementById("analyticsToggle");
  const status = document.getElementById("cookiePrefStatus");
  if (!modal || !overlay) return;

  // Reflejar estado actual en el toggle
  const consent = localStorage.getItem("ds_cookie_consent");
  if (toggle) toggle.checked = consent === "all";

  // Mostrar estado actual
  renderPrefStatus(status, consent);

  overlay.classList.add("open");
  modal.classList.add("open");
  document.body.classList.add("modal-open");
};

window.closeCookiePreferences = function () {
  document.getElementById("modal-cookie-prefs")?.classList.remove("open");
  document.getElementById("modalOverlay")?.classList.remove("open");
  document.body.classList.remove("modal-open");
};

function renderPrefStatus(el, consent) {
  if (!el) return;
  const L = I18N[currentLang];
  const isAll = consent === "all";
  const hasConsent = consent !== null;

  el.innerHTML = `
    <div class="pref-status-row">
      <span class="pref-status-dot ${hasConsent ? (isAll ? "dot-green" : "dot-yellow") : "dot-gray"}"></span>
      <span class="pref-status-text">
        ${!hasConsent
      ? (L.cookiePrefStatusNone || "Aún no has guardado preferencias.")
      : isAll
        ? (L.cookiePrefStatusAll || "✅ Tienes todas las cookies activadas.")
        : (L.cookiePrefStatusEss || "🔒 Solo cookies esenciales activadas.")}
      </span>
    </div>`;
}

window.saveCookiePreferences = function () {
  const toggle = document.getElementById("analyticsToggle");
  const status = document.getElementById("cookiePrefStatus");
  const consent = toggle?.checked ? "all" : "essential";

  localStorage.setItem("ds_cookie_consent", consent);

  // Activar o desactivar GA según la elección
  if (consent === "all") {
    enableAnalytics();
  } else {
    disableAnalytics();
  }

  // Ocultar banner de cookies si aún está visible
  const banner = document.getElementById("cookieBanner");
  if (banner?.classList.contains("visible")) {
    banner.classList.remove("visible");
    document.body.classList.remove("cookie-visible");
    setTimeout(() => banner.style.display = "none", 400);
  }

  renderPrefStatus(status, consent);

  // Feedback visual en el botón guardar
  const btn = document.querySelector(".cookie-pref-btn--save");
  if (btn) {
    const L = I18N[currentLang];
    const orig = btn.innerHTML;
    btn.innerHTML = L.cookiePrefSaved || "✓ ¡Guardado!";
    btn.style.background = "var(--green)";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      closeCookiePreferences();
    }, 1400);
  }
};

window.deleteAllCookies = function () {
  const L = I18N[currentLang];
  const btn = document.querySelector(".cookie-pref-btn--delete");

  // Eliminar localStorage del sitio
  localStorage.removeItem("ds_cookie_consent");
  localStorage.removeItem("ds_lang");

  // Desactivar GA
  disableAnalytics();

  // Actualizar toggle y estado
  const toggle = document.getElementById("analyticsToggle");
  if (toggle) toggle.checked = false;
  renderPrefStatus(document.getElementById("cookiePrefStatus"), null);

  // Feedback visual
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = L.cookiePrefDeleted || "🗑️ ¡Eliminadas!";
    btn.style.background = "rgba(209,26,30,.25)";
    btn.style.color = "#ff6b6b";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  }

  // Cerrar modal y mostrar banner de nuevo
  setTimeout(() => {
    closeCookiePreferences();
    const banner = document.getElementById("cookieBanner");
    if (banner) {
      banner.style.removeProperty("display");
      requestAnimationFrame(() => {
        setTimeout(() => {
          banner.classList.add("visible");
          document.body.classList.add("cookie-visible");
        }, 300);
      });
    }
  }, 1600);
};

/* ── COOKIE BANNER ───────────────────────────────────────── */
function initCookieBanner() {
  const consent = localStorage.getItem("ds_cookie_consent");

  // Ya eligió antes → aplicar preferencia guardada sin mostrar banner
  if (consent === "all") { enableAnalytics(); return; }
  if (consent === "essential") return;

  // Primera visita: mostrar banner
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;

  const hideBanner = (permanent = true) => {
    banner.classList.remove("visible");
    document.body.classList.remove("cookie-visible");
    if (permanent) setTimeout(() => { banner.style.display = "none"; }, 400);
  };

  // Mostrar con pequeño delay para que la animación se vea
  banner.style.removeProperty("display");
  requestAnimationFrame(() => {
    setTimeout(() => {
      banner.classList.add("visible");
      document.body.classList.add("cookie-visible");
    }, 600);
  });

  document.getElementById("cookieAcceptBtn")?.addEventListener("click", () => {
    localStorage.setItem("ds_cookie_consent", "all");
    enableAnalytics();
    hideBanner(true);
  });

  document.getElementById("cookieDeclineBtn")?.addEventListener("click", () => {
    localStorage.setItem("ds_cookie_consent", "essential");
    hideBanner(true);
  });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("contactSubmit");
    const resultEl = document.getElementById("contactResult");
    const L = I18N[currentLang];

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="contact-spinner"></span> ${L.contactSending}`;
    resultEl.className = "contact-result";
    resultEl.textContent = "";

    try {
      const formData = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        resultEl.className = "contact-result success";
        resultEl.textContent = L.contactSuccess;
        form.reset();
      } else {
        throw new Error(data.message || "Error");
      }
    } catch {
      resultEl.className = "contact-result error";
      resultEl.textContent = L.contactError;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span data-i18n="contactSend">${I18N[currentLang].contactSend}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>`;
    }
  });
}

/* ── INIT ────────────────────────────────────────────────── */
async function init() {
  const status = document.getElementById("statusMsg");
  const grid = document.getElementById("dealsGrid");

  grid.innerHTML = Array(6).fill('<div class="skeleton"></div>').join("");

  try {
    const rows = await fetchSheet();
    allDeals = rows.map(normalizeRow).filter(Boolean);

    status.classList.add("hidden");
    grid.innerHTML = "";

    const totalEl = document.getElementById("totalCount");
    if (totalEl) totalEl.textContent = allDeals.length;

    renderDeals();

    document.querySelectorAll(".cat").forEach(btn =>
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        currentPage = 1;
        renderDeals();
        scrollToGrid();
      })
    );

    const syncSearch = val => {
      currentSearch = val.trim().toLowerCase();
      currentPage = 1;
      renderDeals();
    };

    document.getElementById("searchInput")?.addEventListener("input", e => {
      syncSearch(e.target.value);
      const hero = document.getElementById("heroSearchInput");
      if (hero) hero.value = e.target.value;
    });

    document.getElementById("heroSearchInput")?.addEventListener("input", e => {
      syncSearch(e.target.value);
      const hdr = document.getElementById("searchInput");
      if (hdr) hdr.value = e.target.value;
      scrollToGrid();
    });

    document.getElementById("menuBtn")?.addEventListener("click", () => {
      const s = document.querySelector(".header-search");
      if (s) s.style.display = s.style.display === "block" ? "none" : "block";
    });

    startCouponTimers();

  } catch (err) {
    console.error(err);
    grid.innerHTML = "";
    status.className = "status-msg error";
    status.innerHTML = `
      ❌ <strong>${t("errorTitle")}: ${err.message}</strong><br>
      <small style="display:block;margin-top:.5rem;line-height:1.8">${t("errorHint")}</small>`;
  }
}

/* ── BOOT ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn =>
    btn.addEventListener("click", () => applyLang(btn.dataset.lang))
  );

  applyLang(currentLang);
  initModals();
  initCookieBanner();
  initContactForm();
  init();
});