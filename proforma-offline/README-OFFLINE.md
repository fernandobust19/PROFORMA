# PROFORMA - Versión Offline para Android

Esta es la versión offline de la aplicación PROFORMA que funciona completamente sin conexión a internet una vez que todos los archivos están guardados en tu dispositivo Android.

## 📱 Cómo usar en Android (OFFLINE)

### Paso 1: Descargar todos los archivos
Guarda estos archivos en una carpeta de tu Android (por ejemplo, en `Descargas/PROFORMA/`):

**Archivos REQUERIDOS:**
- `index-offline.html` (archivo principal - USAR ESTE)
- `favicon.png`
- `logo.png`
- `calculadora.png`
- Todos los archivos de fondo: `fondo1.png`, `fondo2.png`, `fondo3.png`, `fondo4.png`, `fondo4.jpg`, `fondo5.jpg`, `fondo6.jpg`, `fondo7.jpg`, `fondo8.jpg`
- Archivos GIF: `gif1.gif`, `gif2.gif`, `gif3.gif`, `giphy.webp`, `giphy1.webp`

### Paso 2: Abrir en el navegador
1. Abre tu navegador favorito en Android (Chrome, Firefox, etc.)
2. Navega hasta la carpeta donde guardaste los archivos
3. Toca en `index-offline.html`
4. ¡La aplicación funcionará sin internet! 🎉

### Paso 3: Crear acceso directo (Opcional)
Para facilitar el acceso:
1. En el navegador, ve al menú (⋮)
2. Selecciona "Agregar a pantalla de inicio"
3. Nómbralo "PROFORMA Offline"

## ✨ Características de la versión Offline

### ✅ Funciona SIN internet:
- ✅ Calculadora integrada
- ✅ Creación de proformas
- ✅ Cambio de fondos
- ✅ Guardar proformas como HTML
- ✅ Lista de productos locales (puedes modificarla)
- ✅ Inventario básico
- ✅ Todas las funciones de formulario

### 🔄 Funciones adaptadas para offline:
- **Captura de imagen**: Te guía para tomar capturas de pantalla manualmente
- **PDF**: Genera archivos HTML que puedes convertir a PDF con "Imprimir → Guardar como PDF"
- **Productos**: Lista local de productos (sin conexión a Google Sheets)

### ❌ Funciones deshabilitadas (requieren internet):
- Conexión a Google Sheets
- Envío por WhatsApp automático (puedes compartir manualmente)

## 🛠️ Personalización

### Cambiar lista de productos:
1. Abre `index-offline.html` en un editor de texto
2. Busca la sección "// Lista local de productos"
3. Modifica los productos en el array `productosLocales`
4. Guarda el archivo

### Ejemplo:
```javascript
const productosLocales = [
    ["Mi Producto 1", "100.00"],
    ["Mi Producto 2", "150.00"],
    // Agrega más productos aquí
];
```

## 📋 Instrucciones para PDF:
1. Genera el inventario (se guarda como HTML)
2. Abre el archivo HTML generado
3. Presiona el botón de menú (⋮) → "Imprimir"
4. Selecciona "Guardar como PDF"
5. ¡Listo! Tienes tu PDF

## 💡 Consejos para Android:
- Usa un administrador de archivos para organizar mejor los archivos
- Guarda todo en una carpeta fácil de encontrar
- Puedes usar esta versión incluso sin datos móviles
- Los archivos se guardan en la carpeta de descargas de tu navegador

## 🆘 Solución de problemas:
- **No se ven las imágenes**: Asegúrate de que todos los archivos estén en la misma carpeta
- **No funciona la calculadora**: Verifica que `calculadora.png` esté en la carpeta
- **Fondos no cambian**: Verifica que todos los archivos `fondo*.png/jpg/gif` estén presentes

---
**¡Disfruta de tu PROFORMA offline! 📱💼**