# Proformador

Este proyecto es un proformador que obtiene productos de una hoja de cálculo de Google Sheets y permite generar hojas de pedido para materiales faltantes.

## Estructura
- `proforma.html`: Interfaz principal.
- `js/`: Scripts JavaScript.
- `docs/`: Documentación adicional.

## Uso
1. Configura el acceso a Google Sheets en el script.
2. Utiliza la función de proforma para obtener productos.
3. Usa la función de hoja de pedido para generar pedidos de materiales faltantes.

## Licencia
MIT

# Despliegue en Render

Si ves el error:

    Service Root Directory "/opt/render/project/src/index.html" is missing.

**Solución:**
- Asegúrate de que el archivo `index.html` esté en la raíz del repositorio (no dentro de una carpeta llamada `src` ni ninguna otra).
- El directorio raíz debe contener directamente `index.html`, `js/`, etc.
- Si tuviste una carpeta `src`, mueve todo su contenido a la raíz y elimina la carpeta `src`.

**Pasos para Render:**
1. En Render, al crear el Static Site, deja el campo "Publish Directory" vacío o pon `/`.
2. Si ya tienes el archivo en la raíz, solo vuelve a desplegar.

**Resumen de estructura correcta:**
```
proforma/
├── index.html
├── js/
├── docs/
├── README.md
├── .gitignore
```

Si sigues viendo el error, revisa que no haya espacios o mayúsculas en el nombre del archivo y que esté correctamente subido a GitHub.
