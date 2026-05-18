# ⚡ DealSpot × Google Sheets

Tu sitio de deals se alimenta 100% de Google Sheets.
Agregas un link → aparece en el sitio. Borras una fila → desaparece.
Sin backend. Sin base de datos. Sin complicaciones.

---

## Paso 1 — Crear tu Google Sheet

Ve a [sheets.new](https://sheets.new) para crear una hoja nueva.

### Columnas (copia exactamente estos nombres en la fila 1)

| Col | Nombre              | ¿Obligatorio? | Ejemplo                          | Notas                                   |
|-----|---------------------|--------------|----------------------------------|-----------------------------------------|
| A   | `url`               | ✅ Sí        | `https://amzn.to/43fHTfs`       | Tu link de afiliado                     |
| B   | `titulo`            | Recomendado  | `AirPods Pro 2da Gen`            | Nombre del producto                     |
| C   | `imagen`            | Opcional     | `https://m.media-amazon.com/...` | URL de la imagen del producto           |
| D   | `precio`            | Opcional     | `189.99`                         | Solo el número, sin $ ni símbolo        |
| E   | `precio_anterior`   | Opcional     | `249.99`                         | Calcula el % de descuento automáticamente|
| F   | `categoria`         | Opcional     | `tecnologia`                     | Ver opciones abajo ↓                    |
| G   | `badge`             | Opcional     | `hot`                            | `hot` `new` `limited` `sale`            |
| H   | `notas`             | Opcional     | `Incluye estuche USB-C`          | Descripción corta visible en la card    |
| I   | `expira_en`         | Opcional     | `24`                             | Horas hasta que expire (timer visible)  |
| J   | `activo`            | Opcional     | `si`                             | `no` para ocultar sin borrar            |

### Categorías válidas para columna F
```
tecnologia   gaming   hogar   moda   deportes   belleza   viajes   comida   otros
```

### Ejemplo de cómo se ve tu Sheet

| url | titulo | imagen | precio | precio_anterior | categoria | badge | notas | expira_en | activo |
|-----|--------|--------|--------|-----------------|-----------|-------|-------|-----------|--------|
| https://amzn.to/43fHTfs | AirPods Pro 2da Gen | https://... | 189.99 | 249.99 | tecnologia | hot | Cancelación de ruido ANC | 24 | si |
| https://amzn.to/49WhOpt | PlayStation 5 Slim | | 429.99 | 549.99 | gaming | limited | Bundle con DualSense | 12 | si |
| https://amzn.to/3RaEQTf | Robot Aspirador | | 299.00 | 499.99 | hogar | sale | | | si |

> 💡 **Lo mínimo que necesitas:** solo la columna `url`. El resto es opcional.

---

## Paso 2 — Publicar el Sheet

Esto es lo más importante. Sin esto el sitio no puede leer los datos.

1. En tu Google Sheet: **Archivo → Compartir → Publicar en la web**
2. En el primer menú: selecciona **"Hoja 1"** (o el nombre de tu hoja)
3. En el segundo menú: selecciona **"Valores separados por comas (.csv)"**
4. Clic en **"Publicar"** → confirma con "Aceptar"
5. Copia la URL que aparece — la necesitas para el Paso 3

---

## Paso 3 — Obtener el SHEET_ID

De la URL de tu Google Sheet, copia el ID que está entre `/d/` y `/edit`:

```
https://docs.google.com/spreadsheets/d/  1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms  /edit
                                          ↑ ↑ ↑ ESTE ES EL SHEET_ID ↑ ↑ ↑
```

Luego abre `js/app.js` y reemplaza en la línea 22:

```javascript
// ANTES:
const SHEET_ID = "TU_SHEET_ID_AQUI";

// DESPUÉS (ejemplo):
const SHEET_ID = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms";
```

---

## Paso 4 — Subir a GitHub Pages

```bash
# 1. Dentro de la carpeta dealspot:
git init
git add .
git commit -m "Launch DealSpot"

# 2. Crear repo en github.com (público, sin README inicial)
git remote add origin https://github.com/TU-USUARIO/dealspot.git
git branch -M main
git push -u origin main

# 3. En GitHub: Settings → Pages → Branch: main → Save
```

Tu sitio queda en: `https://TU-USUARIO.github.io/dealspot/`

---

## Workflow diario (agregar un deal nuevo)

1. Abre tu Google Sheet
2. Agrega una nueva fila con la URL del afiliado y los datos que quieras
3. ¡Listo! El sitio se actualiza solo en la próxima visita (caché de 30 min)

No necesitas tocar código nunca más.

---

## Cómo obtener la imagen del producto (Amazon)

En Amazon, haz clic derecho en la imagen del producto → "Copiar dirección de imagen".
Pega esa URL en la columna `imagen` de tu Sheet.

---

## Estructura de archivos

```
dealspot/
├── index.html       ← El sitio
├── css/styles.css   ← Estilos
├── js/app.js        ← Lógica (aquí pones el SHEET_ID)
├── .nojekyll        ← Requerido por GitHub Pages
└── README.md        ← Esta guía
```

---

## Preguntas frecuentes

**¿Cada cuánto se actualiza el sitio?**
La caché dura 30 minutos. Después de ese tiempo, la próxima visita recarga los datos del Sheet.

**¿Puedo ocultar un deal sin borrarlo?**
Sí: pon `no` en la columna `activo`.

**¿Funciona con links de AliExpress, Walmart, etc.?**
Sí, cualquier URL funciona. La tienda se detecta automáticamente del dominio.

**¿El precio se obtiene automáticamente?**
No. Ponlo manualmente en la columna `precio`. Amazon no permite obtenerlo automáticamente sin su API oficial (que requiere aprobación y ventas previas).

**¿Es gratis?**
Sí. Google Sheets es gratis, GitHub Pages es gratis.
