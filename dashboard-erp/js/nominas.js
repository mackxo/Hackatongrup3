// Archivo para manejar la funcionalidad de nóminas

/**
 * Inicializa todos los elementos del panel de nóminas
 */
function inicializarNominas() {
  crearGraficoNominasDepartamento();
  crearGraficoDistribucionNomina();
  crearGraficoEvolucionNominas();
  mostrarTablaNominas();
  actualizarIndicadoresNomina();
}

/**
 * Crea el gráfico de nóminas por departamento
 */
function crearGraficoNominasDepartamento() {
  // Preparar datos para el gráfico
  const datos = [];
  
  // Obtener el mes seleccionado (por defecto el último mes)
  const selectMes = document.getElementById('selectMes');
  const mesSeleccionado = selectMes ? selectMes.value : datosNominasPorDepartamento.meses[datosNominasPorDepartamento.meses.length - 1];
  const indiceMes = datosNominasPorDepartamento.meses.indexOf(mesSeleccionado);
  
  // Crear datos para el gráfico de barras
  const nombresDepartamentos = datosNominasPorDepartamento.departamentos.map(d => d.nombre);
  const montosDepartamentos = datosNominasPorDepartamento.departamentos.map(d => d.montos[indiceMes]);
  
  const datosDepartamentos = {
    x: nombresDepartamentos,
    y: montosDepartamentos,
    type: 'bar',
    marker: {
      color: '#6366f1', // Indigo (Tailwind indigo-500)
      opacity: 0.8
    },
    text: montosDepartamentos.map(monto => `$${monto.toLocaleString()}`),
    textposition: 'auto',
    hovertemplate: '<b>%{x}</b><br>$%{y:,.0f}<extra></extra>'
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Nómina por Departamento',
    xaxis: { title: 'Departamento' },
    yaxis: { title: 'Monto ($)' },
    bargap: 0.2
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartNominasDepartamento', [datosDepartamentos], layout);
}

/**
 * Crea el gráfico de distribución de nómina por departamento (gráfico de pastel)
 */
function crearGraficoDistribucionNomina() {
  // Datos para el gráfico de pastel
  const datos = {
    labels: indicadoresNomina.distribucionPorDepartamento.map(d => d.departamento),
    values: indicadoresNomina.distribucionPorDepartamento.map(d => d.porcentaje),
    type: 'pie',
    hole: 0.4,
    textinfo: 'label+percent',
    textposition: 'outside',
    automargin: true,
    marker: {
      colors: [
        '#3b82f6', // Azul
        '#6366f1', // Indigo
        '#8b5cf6', // Púrpura
        '#ec4899', // Rosa
        '#f97316'  // Naranja
      ]
    },
    hoverinfo: 'label+value+percent',
    hovertemplate: '<b>%{label}</b><br>%{value}%<extra></extra>'
  };
  
  // Configuración del gráfico
  const layout = {
    title: 'Distribución de Nómina por Departamento',
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 }
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartDistribucionNomina', [datos], layout);
}

/**
 * Crea el gráfico de evolución de nóminas a lo largo del tiempo
 */
function crearGraficoEvolucionNominas() {
  // Preparar datos para cada departamento
  const traces = [];
  
  // Crear una serie para cada departamento
  datosNominasPorDepartamento.departamentos.forEach((depto, index) => {
    const trace = {
      x: datosNominasPorDepartamento.meses,
      y: depto.montos,
      type: 'scatter',
      mode: 'lines+markers',
      name: depto.nombre,
      line: {
        width: 3
      },
      marker: {
        size: 8
      }
    };
    traces.push(trace);
  });
  
  // Configuración del gráfico
  const layout = {
    title: 'Evolución de Nóminas por Departamento',
    xaxis: { title: 'Mes' },
    yaxis: { title: 'Monto ($)' },
    legend: { orientation: 'h', y: -0.2 }
  };
  
  // Dibujar el gráfico
  Plotly.newPlot('chartEvolucionNominas', traces, layout);
}

/**
 * Muestra la tabla de empleados con sus datos de nómina
 */
function mostrarTablaNominas() {
  const tablaContainer = document.getElementById('tablaNominas');
  if (!tablaContainer) return;
  
  // Ordenar empleados por salario (de mayor a menor)
  const empleadosOrdenados = [...datosEmpleados].sort((a, b) => b.salario - a.salario);
  
  // Crear tabla HTML
  let tablaHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Empleado</th>
          <th>Departamento</th>
          <th>Cargo</th>
          <th class="text-right">Antigüedad</th>
          <th class="text-right">Salario</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Generar filas de la tabla
  empleadosOrdenados.forEach(empleado => {
    tablaHTML += `
      <tr>
        <td>${empleado.nombre}</td>
        <td>${empleado.departamento}</td>
        <td>${empleado.cargo}</td>
        <td class="text-right">${empleado.antiguedad} ${empleado.antiguedad === 1 ? 'año' : 'años'}</td>
        <td class="text-right">$${empleado.salario.toLocaleString()}</td>
      </tr>
    `;
  });
  
  // Calcular total de salarios
  const totalSalarios = empleadosOrdenados.reduce((sum, empleado) => sum + empleado.salario, 0);
  
  // Agregar fila de total
  tablaHTML += `
      <tr class="font-semibold">
        <td colspan="4">TOTAL NÓMINA</td>
        <td class="text-right">$${totalSalarios.toLocaleString()}</td>
      </tr>
    </tbody>
  </table>
  `;
  
  // Insertar tabla en el DOM
  tablaContainer.innerHTML = tablaHTML;
}

/**
 * Actualiza los indicadores de nómina en el panel
 */
function actualizarIndicadoresNomina() {
  // Obtener elementos del DOM
  const totalNominaElement = document.getElementById('kpiTotalNomina');
  const promedioSalarioElement = document.getElementById('kpiPromedioSalario');
  const incrementoAnualElement = document.getElementById('kpiIncrementoAnual');
  
  // Actualizar valores si existen los elementos
  if (totalNominaElement) {
    totalNominaElement.textContent = `$${indicadoresNomina.totalNominaMensual.toLocaleString()}`;
  }
  
  if (promedioSalarioElement) {
    promedioSalarioElement.textContent = `$${indicadoresNomina.promedioSalario.toLocaleString()}`;
  }
  
  if (incrementoAnualElement) {
    incrementoAnualElement.textContent = `${indicadoresNomina.incrementoAnual}%`;
  }
}

// Inicializar nóminas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de nóminas
  if (document.getElementById('panelNominas')) {
    inicializarNominas();
    
    // Configurar eventos
    const selectMes = document.getElementById('selectMes');
    if (selectMes) {
      selectMes.addEventListener('change', () => {
        crearGraficoNominasDepartamento();
      });
    }
  }
});
