// Archivo para manejar la creación y actualización de gráficos

/**
 * Inicializa todos los gráficos del dashboard
 */
function inicializarGraficos() {
  crearGraficoVentas();
  crearGraficoFlujoCaja();
  crearGraficoEgresosProveedores();
  crearGraficoEgresosCategorias();
}

/**
 * Crea el gráfico de ventas mensuales
 */
function crearGraficoVentas() {
  // Paso 1: Definimos los datos del gráfico
  const datosVentas = {
    x: datosFlujoMensual.meses,  // Eje X (categorías)
    y: datosFlujoMensual.ingresos,  // Eje Y (valores)
    type: 'bar',  // Tipo de gráfico: barras
    marker: {
      color: '#3b82f6' // Color azul (Tailwind blue-500)
    },
    name: 'Ingresos'
  };

  // Paso 2: Configuramos el diseño del gráfico
  const layoutVentas = {
    title: 'Ventas Mensuales',  // Título del gráfico
    xaxis: { title: 'Mes' },  // Etiqueta eje X
    yaxis: { title: 'Ingresos ($)' }  // Etiqueta eje Y
  };

  // Paso 3: Dibujamos el gráfico en el contenedor
  Plotly.newPlot('chartVentas', [datosVentas], layoutVentas);
}

/**
 * Crea el gráfico de flujo de caja (ingresos vs egresos)
 */
function crearGraficoFlujoCaja() {
  // Datos de ingresos
  const datosIngresos = {
    x: datosFlujoMensual.meses,
    y: datosFlujoMensual.ingresos,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Ingresos',
    line: {
      color: '#10b981', // Verde (Tailwind green-500)
      width: 3
    },
    marker: {
      size: 8
    }
  };

  // Datos de egresos
  const datosEgresos = {
    x: datosFlujoMensual.meses,
    y: datosFlujoMensual.egresos,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Egresos',
    line: {
      color: '#ef4444', // Rojo (Tailwind red-500)
      width: 3
    },
    marker: {
      size: 8
    }
  };

  // Balance (diferencia entre ingresos y egresos)
  const datosBalance = {
    x: datosFlujoMensual.meses,
    y: datosFlujoMensual.ingresos.map((ingreso, i) => ingreso - datosFlujoMensual.egresos[i]),
    type: 'bar',
    name: 'Balance',
    marker: {
      color: datosFlujoMensual.ingresos.map((ingreso, i) => 
        (ingreso - datosFlujoMensual.egresos[i]) >= 0 ? '#10b981' : '#ef4444'
      )
    }
  };

  // Configuración del gráfico
  const layout = {
    title: 'Flujo de Caja Mensual',
    xaxis: { title: 'Mes' },
    yaxis: { title: 'Monto ($)' },
    legend: { orientation: 'h', y: -0.2 },
    barmode: 'group'
  };

  // Dibujar el gráfico
  Plotly.newPlot('chartFlujoCaja', [datosIngresos, datosEgresos, datosBalance], layout);
}

/**
 * Crea el gráfico de egresos por proveedor
 */
function crearGraficoEgresosProveedores() {
  // Ordenamos los proveedores por monto (de mayor a menor)
  const proveedoresOrdenados = [...datosEgresosPorProveedor].sort((a, b) => b.monto - a.monto);
  
  // Preparamos los datos para el gráfico
  const datos = {
    x: proveedoresOrdenados.map(item => item.proveedor),
    y: proveedoresOrdenados.map(item => item.monto),
    type: 'bar',
    marker: {
      color: '#8b5cf6', // Púrpura (Tailwind purple-500)
      opacity: 0.8
    },
    text: proveedoresOrdenados.map(item => `$${item.monto.toLocaleString()}`),
    textposition: 'auto',
    hoverinfo: 'x+y',
    hovertemplate: '<b>%{x}</b><br>$%{y:,.0f}<br>Categoría: %{customdata}<extra></extra>',
    customdata: proveedoresOrdenados.map(item => item.categoria)
  };

  // Configuración del gráfico
  const layout = {
    title: 'Egresos por Proveedor',
    xaxis: { title: 'Proveedor' },
    yaxis: { title: 'Monto ($)' },
    bargap: 0.2
  };

  // Dibujar el gráfico
  Plotly.newPlot('chartEgresosProveedores', [datos], layout);
}

/**
 * Crea el gráfico de egresos por categoría
 */
function crearGraficoEgresosCategorias() {
  // Datos para el gráfico de pastel
  const datos = {
    labels: datosEgresosPorCategoria.categorias,
    values: datosEgresosPorCategoria.montos,
    type: 'pie',
    hole: 0.4,
    textinfo: 'label+percent',
    textposition: 'outside',
    automargin: true,
    marker: {
      colors: [
        '#3b82f6', // Azul
        '#8b5cf6', // Púrpura
        '#ec4899', // Rosa
        '#f97316', // Naranja
        '#84cc16'  // Lima
      ]
    },
    hoverinfo: 'label+value+percent',
    hovertemplate: '<b>%{label}</b><br>$%{value:,.0f}<br>%{percent}<extra></extra>'
  };

  // Configuración del gráfico
  const layout = {
    title: 'Distribución de Egresos por Categoría',
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 }
  };

  // Dibujar el gráfico
  Plotly.newPlot('chartEgresosCategorias', [datos], layout);
}

// Inicializar todos los gráficos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarGraficos);
