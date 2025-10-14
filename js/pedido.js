// pedido.js
// Función para generar una hoja de pedido de materiales faltantes
document.addEventListener('DOMContentLoaded', function() {
    // Botón para generar hoja de pedido
    const btnPedido = document.getElementById('generar-pedido');
    if (btnPedido) {
        btnPedido.addEventListener('click', generarHojaPedido);
    }
});

function generarHojaPedido() {
    // Aquí debes obtener los materiales faltantes desde tu lógica actual
    // Por ejemplo, podrías tener un array llamado materialesFaltantes
    const materialesFaltantes = obtenerMaterialesFaltantes(); // Debes implementar esta función según tu lógica

    if (!materialesFaltantes || materialesFaltantes.length === 0) {
        alert('No hay materiales faltantes para generar el pedido.');
        return;
    }

    // Crear una tabla HTML para mostrar el pedido
    let tabla = '<table border="1" style="width:100%;border-collapse:collapse;">';
    tabla += '<tr><th>Producto</th><th>Cantidad Faltante</th><th>Unidad</th></tr>';
    materialesFaltantes.forEach(item => {
        tabla += `<tr><td>${item.producto}</td><td>${item.cantidad}</td><td>${item.unidad}</td></tr>`;
    });
    tabla += '</table>';

    // Mostrar la hoja de pedido en una nueva ventana
    const win = window.open('', '_blank');
    win.document.write('<html><head><title>Hoja de Pedido</title></head><body>');
    win.document.write('<h2>Hoja de Pedido de Materiales Faltantes</h2>');
    win.document.write(tabla);
    win.document.write('</body></html>');
    win.document.close();
}

// Ejemplo de función para obtener materiales faltantes (debes reemplazarla por tu lógica real)
function obtenerMaterialesFaltantes() {
    // Aquí deberías obtener los datos reales de tu aplicación
    // Este es solo un ejemplo de estructura
    return [
        { producto: 'Cemento', cantidad: 10, unidad: 'Bolsas' },
        { producto: 'Arena', cantidad: 5, unidad: 'm3' }
    ];
}
