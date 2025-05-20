// Archivo de datos de nóminas para el dashboard ERP

// Datos de nóminas mensuales por departamento
const datosNominasPorDepartamento = {
  meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  departamentos: [
    {
      nombre: 'Administración',
      montos: [25000, 25000, 26500, 26500, 26500]
    },
    {
      nombre: 'Ventas',
      montos: [35000, 36000, 36000, 38000, 40000]
    },
    {
      nombre: 'Producción',
      montos: [45000, 45000, 47000, 47000, 48000]
    },
    {
      nombre: 'IT',
      montos: [18000, 18000, 18000, 20000, 20000]
    },
    {
      nombre: 'Logística',
      montos: [15000, 15000, 16000, 16000, 16000]
    }
  ]
};

// Datos de empleados y sus salarios
const datosEmpleados = [
  { id: 1, nombre: 'Ana García', departamento: 'Administración', cargo: 'Gerente Administrativo', salario: 8500, antiguedad: 5 },
  { id: 2, nombre: 'Carlos Rodríguez', departamento: 'Ventas', cargo: 'Director Comercial', salario: 9000, antiguedad: 4 },
  { id: 3, nombre: 'Sofía Martínez', departamento: 'Producción', cargo: 'Jefe de Producción', salario: 7800, antiguedad: 6 },
  { id: 4, nombre: 'Miguel López', departamento: 'IT', cargo: 'Desarrollador Senior', salario: 7500, antiguedad: 3 },
  { id: 5, nombre: 'Laura Sánchez', departamento: 'Logística', cargo: 'Coordinadora de Logística', salario: 6800, antiguedad: 4 },
  { id: 6, nombre: 'Roberto Díaz', departamento: 'Ventas', cargo: 'Ejecutivo de Ventas', salario: 5500, antiguedad: 2 },
  { id: 7, nombre: 'Elena Torres', departamento: 'Administración', cargo: 'Asistente Administrativo', salario: 4200, antiguedad: 1 },
  { id: 8, nombre: 'Javier Flores', departamento: 'Producción', cargo: 'Operario', salario: 4000, antiguedad: 3 },
  { id: 9, nombre: 'Patricia Gómez', departamento: 'IT', cargo: 'Soporte Técnico', salario: 4500, antiguedad: 2 },
  { id: 10, nombre: 'Daniel Ruiz', departamento: 'Producción', cargo: 'Operario', salario: 4000, antiguedad: 1 },
  { id: 11, nombre: 'Carmen Vargas', departamento: 'Ventas', cargo: 'Ejecutivo de Ventas', salario: 5200, antiguedad: 3 },
  { id: 12, nombre: 'Fernando Reyes', departamento: 'Logística', cargo: 'Asistente de Logística', salario: 3800, antiguedad: 1 },
  { id: 13, nombre: 'Lucía Morales', departamento: 'Producción', cargo: 'Supervisor', salario: 6200, antiguedad: 4 },
  { id: 14, nombre: 'Andrés Castro', departamento: 'IT', cargo: 'Desarrollador Junior', salario: 4800, antiguedad: 1 },
  { id: 15, nombre: 'Marta Ortiz', departamento: 'Administración', cargo: 'Contador', salario: 6500, antiguedad: 3 }
];

// Datos de indicadores de nómina
const indicadoresNomina = {
  totalNominaMensual: 138000,
  promedioSalario: 5880,
  incrementoAnual: 4.5, // porcentaje
  distribucionPorDepartamento: [
    { departamento: 'Administración', porcentaje: 19.2 },
    { departamento: 'Ventas', porcentaje: 28.9 },
    { departamento: 'Producción', porcentaje: 34.8 },
    { departamento: 'IT', porcentaje: 14.5 },
    { departamento: 'Logística', porcentaje: 11.6 }
  ]
};
