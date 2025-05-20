// Archivo para manejar la funcionalidad de flujo de caja

/**
 * Calcula y muestra los indicadores de flujo de caja
 */
function actualizarIndicadoresFlujo() {
  // Obtener el mes seleccionado (por defecto el u00faltimo)
  const mesSeleccionado = document.getElementById('selectMes')?.value || datosFlujoMensual.meses[datosFlujoMensual.meses.length - 1];
  const indice = datosFlujoMensual.meses.indexOf(mesSeleccionado);
  
  // Calcular valores para el mes seleccionado
  const ingresos = datosFlujoMensual.ingresos[indice];
  const egresos = datosFlujoMensual.egresos[indice];
  const balance = ingresos - egresos;
  const porcentajeBalance = ((balance / ingresos) * 100).toFixed(1);
  
  // Actualizar los indicadores en el DOM
  document.getElementById('kpiIngresos').textContent = `$${ingresos.toLocaleString()}`;
  document.getElementById('kpiEgresos').textContent = `$${egresos.toLocaleString()}`;
  document.getElementById('kpiBalance').textContent = `$${balance.toLocaleString()}`;
  
  // Actualizar clase de color segu00fan el balance
  const kpiBalanceElement = document.getElementById('kpiBalance');
  if (balance >= 0) {
    kpiBalanceElement.className = 'text-2xl font-bold cash-flow-positive';
  } else {
    kpiBalanceElement.className = 'text-2xl font-bold cash-flow-negative';
  }
  
  // Actualizar porcentaje de balance
  document.getElementById('porcentajeBalance').textContent = `${porcentajeBalance}%`;
  document.getElementById('porcentajeBalance').className = balance >= 0 ? 'text-sm cash-flow-positive' : 'text-sm cash-flow-negative';
}

/**
 * Genera y muestra la tabla de egresos por proveedor
 */
function mostrarTablaEgresosProveedores() {
  const tablaContainer = document.getElementById('tablaEgresosProveedores');
  
  // Ordenar proveedores por monto (de mayor a menor)
  const proveedoresOrdenados = [...datosEgresosPorProveedor].sort((a, b) => b.monto - a.monto);
  
  // Crear tabla HTML
  let tablaHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Proveedor</th>
          <th>Categoru00eda</th>
          <th class="text-right">Monto</th>
          <th class="text-right">% del Total</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Calcular total de egresos
  const totalEgresos = proveedoresOrdenados.reduce((sum, item) => sum + item.monto, 0);
  
  // Generar filas de la tabla
  proveedoresOrdenados.forEach(proveedor => {
    const porcentaje = ((proveedor.monto / totalEgresos) * 100).toFixed(1);
    tablaHTML += `
      <tr>
        <td>${proveedor.proveedor}</td>
        <td>${proveedor.categoria}</td>
        <td class="text-right">$${proveedor.monto.toLocaleString()}</td>
        <td class="text-right">${porcentaje}%</td>
      </tr>
    `;
  });
  
  // Agregar fila de total
  tablaHTML += `
      <tr class="font-semibold">
        <td colspan="2">TOTAL</td>
        <td class="text-right">$${totalEgresos.toLocaleString()}</td>
        <td class="text-right">100%</td>
      </tr>
    </tbody>
  </table>
  `;
  
  // Insertar tabla en el DOM
  tablaContainer.innerHTML = tablaHTML;
}

/**
 * Inicializa la vista de flujo de caja
 */
function inicializarFlujoCaja() {
  // Actualizar indicadores
  actualizarIndicadoresFlujo();
  
  // Mostrar tabla de egresos
  mostrarTablaEgresosProveedores();
  
  // Configurar eventos
  const selectMes = document.getElementById('selectMes');
  if (selectMes) {
    selectMes.addEventListener('change', () => {
      actualizarIndicadoresFlujo();
    });
  }
  
  // Configurar pestau00f1as
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Desactivar todas las pestau00f1as
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.add('hidden'));
      
      // Activar pestau00f1a seleccionada
      button.classList.add('active');
      const targetPanel = document.getElementById(button.dataset.target);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
      }
    });
  });
}

// Inicializar cuando el DOM estu00e9 listo
document.addEventListener('DOMContentLoaded', inicializarFlujoCaja);
