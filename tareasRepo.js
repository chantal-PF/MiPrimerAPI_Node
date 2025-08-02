let tareas = [
  {
    id: 1,
    nombre: "Tarea 1",
    descripcion: "Descripción de la tarea 1",
    estacompleta: true,
    fecha: new Date("2025-07-16")
  },
  {
    id: 2,
    nombre: "Tarea 2",
    descripcion: "Descripción de la tarea 2",
    estacompleta: false,
    fecha: new Date("2025-07-20")
  }
];

// Funciones para manejar las tareas
const obtenerTodas = () => tareas;

const consultarPorId = (id) => tareas.find(t => t.id === id);

const crearTarea = (tarea) => {
  const nuevoId = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
  const nuevaTarea = { id: nuevoId, ...tarea };
  tareas.push(nuevaTarea);
  return nuevaTarea;
};

const actualizarTarea = (id, datos) => {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return null;

  if (datos.nombre !== undefined) tarea.nombre = datos.nombre;
  if (datos.descripcion !== undefined) tarea.descripcion = datos.descripcion;
  if (datos.estacompleta !== undefined) tarea.estacompleta = datos.estacompleta;
  if (datos.fecha !== undefined) tarea.fecha = new Date(datos.fecha);

  return tarea;
};

const eliminarTarea = (id) => {
  const index = tareas.findIndex(t => t.id === id);
  if (index === -1) return false;
  tareas.splice(index, 1);
  return true;
};

module.exports = {
  obtenerTodas,
  consultarPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};

const tareasRoutes = require('./tareasRoutes');
app.use('/tareas', tareasRoutes);