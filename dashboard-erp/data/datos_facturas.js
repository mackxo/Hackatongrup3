// Archivo de datos de facturas para el dashboard ERP

// Datos de facturas emitidas por mes
const datosFacturasEmitidas = {
  meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  cantidades: [42, 38, 45, 50, 55],
  montos: [120000, 135000, 115000, 140000, 150000]
};

// Datos de facturas por cliente
const datosFacturasPorCliente = [
  { cliente: 'Cliente A', facturas: 25, monto: 75000, categoria: 'Mayorista' },
  { cliente: 'Cliente B', facturas: 18, monto: 65000, categoria: 'Minorista' },
  { cliente: 'Cliente C', facturas: 15, monto: 45000, categoria: 'Mayorista' },
  { cliente: 'Cliente D', facturas: 12, monto: 36000, categoria: 'Minorista' },
  { cliente: 'Cliente E', facturas: 10, monto: 30000, categoria: 'Mayorista' },
  { cliente: 'Cliente F', facturas: 8, monto: 24000, categoria: 'Minorista' },
  { cliente: 'Cliente G', facturas: 7, monto: 21000, categoria: 'Mayorista' },
  { cliente: 'Cliente H', facturas: 5, monto: 15000, categoria: 'Minorista' },
  { cliente: 'Cliente I', facturas: 4, monto: 12000, categoria: 'Mayorista' },
  { cliente: 'Cliente J', facturas: 3, monto: 9000, categoria: 'Minorista' }
];

// Datos de facturas por producto/servicio
const datosFacturasPorProducto = [
  { producto: 'Producto A', cantidad: 120, monto: 60000, categoria: 'Hardware' },
  { producto: 'Producto B', cantidad: 85, monto: 42500, categoria: 'Software' },
  { producto: 'Servicio C', cantidad: 65, monto: 32500, categoria: 'Consultoría' },
  { producto: 'Producto D', cantidad: 50, monto: 25000, categoria: 'Hardware' },
  { producto: 'Servicio E', cantidad: 45, monto: 22500, categoria: 'Mantenimiento' },
  { producto: 'Producto F', cantidad: 40, monto: 20000, categoria: 'Software' },
  { producto: 'Servicio G', cantidad: 35, monto: 17500, categoria: 'Consultoría' },
  { producto: 'Producto H', cantidad: 30, monto: 15000, categoria: 'Hardware' },
  { producto: 'Servicio I', cantidad: 25, monto: 12500, categoria: 'Mantenimiento' },
  { producto: 'Producto J', cantidad: 20, monto: 10000, categoria: 'Software' }
];

// Datos de estado de facturas
const datosEstadoFacturas = {
  estados: ['Pagada', 'Pendiente', 'Vencida', 'Anulada'],
  cantidades: [180, 40, 15, 5],
  montos: [450000, 120000, 45000, 15000]
};

// Datos de indicadores de facturación
const indicadoresFacturacion = {
  totalFacturado: 660000,
  promedioFactura: 2750,
  facturasPendientesCobro: 40,
  montoPendienteCobro: 120000,
  tiempoPromedioCobro: 32, // días
  distribucionPorCategoria: [
    { categoria: 'Hardware', porcentaje: 38.5 },
    { categoria: 'Software', porcentaje: 27.5 },
    { categoria: 'Consultoría', porcentaje: 19.0 },
    { categoria: 'Mantenimiento', porcentaje: 15.0 }
  ]
};
