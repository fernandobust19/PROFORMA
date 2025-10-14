# Copilot Instructions for PROFORMA

## Visión general

Este proyecto es una aplicación web para generar proformas y hojas de pedido de materiales faltantes, orientada a productos de construcción (UP-CONS). La arquitectura es simple: una SPA (Single Page Application) con lógica en JavaScript y una interfaz HTML/CSS con tema NEON.

## Estructura principal

- `index.html`: Página principal, contiene la estructura visual, estilos embebidos y enlaces a librerías externas (html2canvas, jsPDF, FontAwesome).
- `js/pedido.js`: Lógica para generar la hoja de pedido de materiales faltantes. Incluye funciones para obtener datos y mostrar resultados en una ventana nueva.
- `cerebro/`, `docs/`: Actualmente vacíos, pueden usarse para lógica adicional o documentación futura.

## Patrones y convenciones

- **Eventos DOM**: La lógica se inicia en el evento `DOMContentLoaded`. Los botones se identifican por ID y se les asignan listeners.
- **Generación dinámica**: Las tablas y ventanas emergentes se crean dinámicamente con JavaScript.
- **Obtención de datos**: La función `obtenerMaterialesFaltantes()` debe ser adaptada para integrar la lógica real de la aplicación. Actualmente retorna datos de ejemplo.
- **Estilos**: El tema visual usa variables CSS para colores NEON y animaciones personalizadas.

## Sistema de guardado (Actualizado)

### Guardado dual implementado:
1. **Guardado manual**: Se activa con el botón "💾 Guardar Proforma", permite al usuario especificar nombre y descarga archivo HTML.
2. **Autoguardado**: Se ejecuta automáticamente cada 2 segundos después de detectar cambios en:
   - Campos de cliente (`nombreCliente`)
   - Agregar/editar/eliminar productos
   - Cambios en cantidad, precio o nombre de producto
   - Selección de productos del dropdown

### Funciones clave de guardado:
- `autoguardarProforma()`: Guardado automático con debounce de 2 segundos
- `generarProformaId()`: Genera ID único para cada proforma nueva
- `crearNuevaProforma()`: Reinicia ID para nueva proforma
- `nuevaProforma()`: Limpia interfaz y crea nueva proforma

### Carga de proformas:
- Modal con pestañas: "Guardado Manual" y "Autoguardado"
- Cada pestaña muestra lista independiente con fecha/hora
- Botones: Abrir, Eliminar para cada proforma
- Al cargar proforma existente se genera nuevo ID para evitar sobrescribir

## Flujos críticos

- **Nueva proforma**: Botón "📄 Nueva Proforma" → confirma → limpia campos → genera nuevo ID → activa autoguardado
- **Autoguardado**: Cambio detectado → debounce 2s → clona DOM → limpia modales → guarda en localStorage → muestra indicador visual
- **Cargar proforma**: Botón "⬆️ Cargar Proforma" → modal pestañas → seleccionar → cargar datos → generar nuevo ID

## Integraciones y dependencias

- **Librerías externas**: html2canvas y jsPDF para exportar/convertir la vista a PDF o imagen.
- **FontAwesome**: Para iconos en la interfaz.
- **LocalStorage**: Para persistencia de proformas guardadas manualmente (`proformas_guardadas`) y autoguardadas (`proformas_autoguardadas`).

## Ejemplo de patrón clave de autoguardado

```javascript
// Autoguardado con debounce
function autoguardarProforma() {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    autoSaveTimeout = setTimeout(function() {
        // Clonar DOM, limpiar, guardar con timestamp
    }, 2000);
}

// Event listeners para activar autoguardado
document.getElementById('nombreCliente').addEventListener('input', autoguardarProforma);
```

## Recomendaciones para agentes IA

- **Mantener guardado dual**: Siempre preservar tanto guardado manual como autoguardado
- **IDs únicos**: Cada nueva proforma debe generar ID único para evitar sobrescribir autoguardados
- **Debounce**: Usar timeout para evitar guardado excesivo en autoguardado
- **Limpieza DOM**: Al guardar, eliminar modales y overlays del HTML clonado
- **Feedback visual**: Mostrar indicadores sutiles de autoguardado sin interrumpir workflow
- Si agregas funciones de edición, incluir `autoguardarProforma()` al final
- Para nuevos campos importantes, agregar event listeners de autoguardado en `DOMContentLoaded`