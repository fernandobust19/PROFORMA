# GitHub Copilot Instructions - Proformador

## Project Overview
This is a Spanish-language web application for creating proformas (quotations) for UP-CONS/FERRETERÍA, a construction materials company. The app integrates with Google Sheets to fetch product data and generates purchase orders for missing materials.

## Architecture & Key Components

### Core Structure
- `index.html`: Main application entry point with embedded HTML2Canvas for PDF generation
- `js/pedido.js`: Handles purchase order generation for missing materials
- Integration with Google Sheets API (configuration needed in scripts)
- Static site designed for deployment on Render.com

### Critical Functions
The app expects these functions to exist (currently missing from codebase):
- `cargarPagina()`: Loads initial page data, likely fetches from Google Sheets
- `inicializarProductos()`: Initializes product catalog from external data source
- Both are called on body onload in `index.html`

### Data Flow Pattern
```
Google Sheets → App Load → Product Display → Missing Material Detection → Purchase Order Generation
```

## Development Conventions

### File Organization
- Keep `index.html` in root directory (NOT in `src/` folder) for Render deployment
- JavaScript modules go in `js/` directory
- Spanish language throughout codebase (comments, UI, variable names)

### Styling Approach
- Embedded CSS in `index.html` with `.zoom-container` for responsive scaling (scale: 0.60)
- Uses Font Awesome icons and HTML2Canvas for export functionality
- Mobile-first viewport configuration

### JavaScript Patterns
```javascript
// Event listener pattern used in pedido.js
document.addEventListener('DOMContentLoaded', function() {
    const btnPedido = document.getElementById('generar-pedido');
    if (btnPedido) {
        btnPedido.addEventListener('click', generarHojaPedido);
    }
});

// Data structure for materials
{ producto: 'Cemento', cantidad: 10, unidad: 'Bolsas' }
```

## Integration Points

### Google Sheets Integration
- Requires API configuration in scripts (not yet implemented)
- Used for product catalog and inventory management
- Follow pattern: Configure access → Fetch products → Generate proformas

### External Dependencies
- HTML2Canvas 1.3.2: For PDF/image export functionality
- Font Awesome 6.0.0-beta3: For UI icons
- No Node.js dependencies (pure static site)

## Deployment Workflow (Render.com)
1. Ensure `index.html` is in repository root
2. Set Publish Directory to `/` or leave empty in Render
3. No build commands needed (static site)
4. Common error: "Service Root Directory missing" = file not in root

## Development Tasks

### When Adding Features
- Follow Spanish naming conventions for functions and variables
- Use table-based layouts for material lists (see `generarHojaPedido()`)
- Open new windows for generated reports (`window.open`)

### When Debugging
- Check browser console for missing function errors (`cargarPagina`, `inicializarProductos`)
- Verify Google Sheets API connectivity if data loading fails
- Ensure proper HTML structure for table generation

### Critical Missing Implementation
The core Google Sheets integration functions need to be implemented:
- Product fetching from sheets
- Inventory tracking
- Missing material calculation logic in `obtenerMaterialesFaltantes()`

## Testing Notes
- Test PDF generation with HTML2Canvas in different browsers
- Verify responsive behavior with `.zoom-container` scaling
- Check Spanish character encoding (UTF-8) in all outputs