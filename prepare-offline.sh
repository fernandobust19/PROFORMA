#!/bin/bash

# Script para preparar archivos offline de PROFORMA
# Úsalo para crear un paquete con todos los archivos necesarios

echo "🚀 Preparando PROFORMA para uso offline..."

# Crear directorio de destino
mkdir -p proforma-offline

# Archivos requeridos para funcionamiento offline
FILES=(
    "index-offline.html"
    "favicon.png"
    "logo.png"
    "calculadora.png"
    "fondo1.png"
    "fondo2.png"
    "fondo3.png"
    "fondo4.png"
    "fondo4.jpg"
    "fondo5.jpg"
    "fondo6.jpg"
    "fondo7.jpg"
    "fondo8.jpg"
    "gif1.gif"
    "gif2.gif"
    "gif3.gif"
    "giphy.webp"
    "giphy1.webp"
    "README-OFFLINE.md"
)

echo "📁 Copiando archivos necesarios..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" proforma-offline/
        echo "  ✅ $file"
    else
        echo "  ❌ $file (no encontrado)"
    fi
done

echo ""
echo "✨ ¡Preparación completa!"
echo ""
echo "📱 Para usar en Android:"
echo "1. Copia toda la carpeta 'proforma-offline' a tu Android"
echo "2. Abre 'index-offline.html' en tu navegador"
echo "3. ¡Funciona sin internet!"
echo ""
echo "📋 Lee 'README-OFFLINE.md' para instrucciones completas"

# Crear archivo ZIP opcional
if command -v zip &> /dev/null; then
    echo ""
    echo "📦 Creando archivo ZIP..."
    cd proforma-offline
    zip -r ../proforma-offline.zip .
    cd ..
    echo "  ✅ proforma-offline.zip creado"
    echo ""
    echo "💡 Puedes enviar 'proforma-offline.zip' a tu Android y descomprimirlo allí"
fi