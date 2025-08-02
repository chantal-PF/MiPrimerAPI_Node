const express = require('express');
const router = express.Router();

const repo = require('./tareasRepo');

// GET /tareas - Obtener todas las tareas
router.get('/', (req, res) => {
  const tareas = repo.obtenerTodas();
  res.json(tareas);
});

// GET /tareas/:id - Obtener tarea por id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = repo.consultarPorId(id);

  if (!tarea) return res.status(404).json({ error: `Tarea con id ${id} no existe` });
  res.json(tarea);
});

// POST /tareas - Crear nueva tarea
router.post('/', (req, res) => {
  const { nombre, descripcion, estacompleta, fecha } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }

  const nuevaTarea = repo.crearTarea({
    nombre,
    descripcion: descripcion || '',
    estacompleta: estacompleta || false,
    fecha: fecha ? new Date(fecha) : new Date()
  });

  res.status(201).json(nuevaTarea);
});

// PUT /tareas/:id - Actualizar tarea existente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const datos = req.body;

  const tareaActualizada = repo.actualizarTarea(id, datos);

  if (!tareaActualizada) return res.status(404).json({ error: `Tarea con id ${id} no existe` });

  res.json(tareaActualizada);
});

// DELETE /tareas/:id - Eliminar tarea
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const eliminado = repo.eliminarTarea(id);

  if (!eliminado) return res.status(404).json({ error: `Tarea con id ${id} no existe` });

  res.json({ message: `Tarea con id ${id} eliminada correctamente` });
});

module.exports = router;