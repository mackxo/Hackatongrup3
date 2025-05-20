// Archivo para manejar la funcionalidad de facturas

/**
 * Inicializa todos los elementos del panel de facturas
 */
function inicializarFacturas() {
  crearGraficoFacturasMensuales();
  crearGraficoFacturasPorCliente();
  crearGraficoEstadoFacturas();
  crearGraficoFacturasPorProducto();
  mostrarTablaFacturas();
  actualizarIndicadoresFacturacion();
}

/**
 * Crea el gráfico de facturas mensuales
 */
function crearGraficoFacturasMensuales() {
  // Datos de montos facturados
  const datosMontos = {
    x: datosFacturasEmitidas.meses,
    y: datosFacturasEmitidas.montos,
    type: 'bar',
    name: 'Monto Facturado',
    marker: {
      color: '#3b82f6' // Azul (Tailwind blue-500)
    },
    yaxis: 'y'
  };
  
  // Datos de cantidad de facturas
  const datosCantidad = {
    x: datosFacturasEmitidas.meses,
    y: datosFacturasEmitidas.cantidades,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Cantidad de Facturas',
    marker: {
      color: '#f59e0b', // Ámbar (Tailwind amber-500)
      size: 10
    },
    line: {
      color: '#f59e0b',
      width: 3
    },
    yaxis: 'y2'
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Facturación Mensual',
    xaxis: { title: 'Mes' },
    yaxis: { 
      title: 'Monto ($)',
      titlefont: { color: '#3b82f6' },
      tickfont: { color: '#3b82f6' }
    },
    yaxis2: {
      title: 'Cantidad de Facturas',
      titlefont: { color: '#f59e0b' },
      tickfont: { color: '#f59e0b' },
      overlaying: 'y',
      side: 'right'
    },
    legend: { orientation: 'h', y: -0.2 }
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartFacturasMensuales', [datosMontos, datosCantidad], layout);
}

/**
 * Crea el gráfico de facturas por cliente
 */
function crearGraficoFacturasPorCliente() {
  // Ordenamos los clientes por monto (de mayor a menor)
  const clientesOrdenados = [...datosFacturasPorCliente].sort((a, b) => b.monto - a.monto).slice(0, 5);
  
  // Preparamos los datos para el gráfico
  const datos = {
    x: clientesOrdenados.map(item => item.cliente),
    y: clientesOrdenados.map(item => item.monto),
    type: 'bar',
    marker: {
      color: '#10b981', // Verde (Tailwind green-500)
      opacity: 0.8
    },
    text: clientesOrdenados.map(item => `$${item.monto.toLocaleString()}`),
    textposition: 'auto',
    hoverinfo: 'x+y',
    hovertemplate: '<b>%{x}</b><br>$%{y:,.0f}<br>Facturas: %{customdata}<extra></extra>',
    customdata: clientesOrdenados.map(item => item.facturas)
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Top 5 Clientes por Facturación',
    xaxis: { title: 'Cliente' },
    yaxis: { title: 'Monto ($)' },
    bargap: 0.2
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartFacturasPorCliente', [datos], layout);
}

/**
 * Crea el gráfico de estado de facturas
 */
function crearGraficoEstadoFacturas() {
  // Datos para el gráfico de pastel
  const datos = {
    labels: datosEstadoFacturas.estados,
    values: datosEstadoFacturas.cantidades,
    type: 'pie',
    hole: 0.4,
    textinfo: 'label+percent',
    textposition: 'outside',
    automargin: true,
    marker: {
      colors: [
        '#10b981', // Verde (Pagada)
        '#f59e0b', // Ámbar (Pendiente)
        '#ef4444', // Rojo (Vencida)
        '#6b7280'  // Gris (Anulada)
      ]
    },
    hoverinfo: 'label+value+percent',
    hovertemplate: '<b>%{label}</b><br>Cantidad: %{value}<br>%{percent}<extra></extra>'
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Estado de Facturas',
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 }
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartEstadoFacturas', [datos], layout);
}

/**
 * Crea el gráfico de facturas por producto/servicio
 */
function crearGraficoFacturasPorProducto() {
  // Ordenamos los productos por monto (de mayor a menor)
  const productosOrdenados = [...datosFacturasPorProducto].sort((a, b) => b.monto - a.monto).slice(0, 5);
  
  // Preparamos los datos para el gráfico
  const datos = {
    x: productosOrdenados.map(item => item.producto),
    y: productosOrdenados.map(item => item.monto),
    type: 'bar',
    marker: {
      color: '#8b5cf6', // Púrpura (Tailwind purple-500)
      opacity: 0.8
    },
    text: productosOrdenados.map(item => `$${item.monto.toLocaleString()}`),
    textposition: 'auto',
    hoverinfo: 'x+y',
    hovertemplate: '<b>%{x}</b><br>$%{y:,.0f}<br>Cantidad: %{customdata}<br>Categoría: %{text}<extra></extra>',
    customdata: productosOrdenados.map(item => item.cantidad),
    text: productosOrdenados.map(item => item.categoria)
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Top 5 Productos/Servicios',
    xaxis: { title: 'Producto/Servicio' },
    yaxis: { title: 'Monto ($)' },
    bargap: 0.2
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartFacturasPorProducto', [datos], layout);
}

/**
 * Muestra la tabla de facturas por cliente
 */
function mostrarTablaFacturas() {
  const tablaContainer = document.getElementById('tablaFacturas');
  if (!tablaContainer) return;
  
  // Ordenar clientes por monto (de mayor a menor)
  const clientesOrdenados = [...datosFacturasPorCliente].sort((a, b) => b.monto - a.monto);
  
  // Crear tabla HTML
  let tablaHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Categoría</th>
          <th class="text-right">Facturas</th>
          <th class="text-right">Monto</th>
          <th class="text-right">% del Total</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Calcular total de facturación
  const totalFacturacion = clientesOrdenados.reduce((sum, item) => sum + item.monto, 0);
  
  // Generar filas de la tabla
  clientesOrdenados.forEach(cliente => {
    const porcentaje = ((cliente.monto / totalFacturacion) * 100).toFixed(1);
    tablaHTML += `
      <tr>
        <td>${cliente.cliente}</td>
        <td>${cliente.categoria}</td>
        <td class="text-right">${cliente.facturas}</td>
        <td class="text-right">$${cliente.monto.toLocaleString()}</td>
        <td class="text-right">${porcentaje}%</td>
      </tr>
    `;
  });
  
  // Agregar fila de total
  tablaHTML += `
      <tr class="font-semibold">
        <td colspan="2">TOTAL</td>
        <td class="text-right">${clientesOrdenados.reduce((sum, item) => sum + item.facturas, 0)}</td>
        <td class="text-right">$${totalFacturacion.toLocaleString()}</td>
        <td class="text-right">100%</td>
      </tr>
    </tbody>
  </table>
  `;
  
  // Insertar tabla en el DOM
  tablaContainer.innerHTML = tablaHTML;
}

/**
 * Actualiza los indicadores de facturación en el panel
 */
function actualizarIndicadoresFacturacion() {
  // Obtener elementos del DOM
  const totalFacturadoElement = document.getElementById('kpiTotalFacturado');
  const promedioFacturaElement = document.getElementById('kpiPromedioFactura');
  const pendienteCobroElement = document.getElementById('kpiPendienteCobro');
  const tiempoCobroElement = document.getElementById('kpiTiempoCobro');
  
  // Actualizar valores si existen los elementos
  if (totalFacturadoElement) {
    totalFacturadoElement.textContent = `$${indicadoresFacturacion.totalFacturado.toLocaleString()}`;
  }
  
  if (promedioFacturaElement) {
    promedioFacturaElement.textContent = `$${indicadoresFacturacion.promedioFactura.toLocaleString()}`;
  }
  
  if (pendienteCobroElement) {
    pendienteCobroElement.textContent = `$${indicadoresFacturacion.montoPendienteCobro.toLocaleString()}`;
  }
  
  if (tiempoCobroElement) {
    tiempoCobroElement.textContent = `${indicadoresFacturacion.tiempoPromedioCobro} días`;
  }
}

// Inicializar facturas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de facturas
  if (document.getElementById('panelFacturas')) {
    inicializarFacturas();
    
    // Configurar eventos
    const selectMes = document.getElementById('selectMes');
    if (selectMes) {
      selectMes.addEventListener('change', () => {
        // Actualizar gráficos según el mes seleccionado
        // (en un caso real, aquí se cargarían datos del mes seleccionado)
        crearGraficoFacturasMensuales();
      });
    }
  }
});
