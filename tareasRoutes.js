const express = require('express');
const router = express.Router();
const repo = require('./tareasRepo'); // Asegúrate que tareasRepo.js está en la misma carpeta

// GET /tareas - Obtener todas las tareas
router.get('/', (req, res) => {
  const tareas = repo.obtenerTodas();
  res.json(tareas);
});

// GET /tareas/:id - Obtener tarea por id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = repo.consultarPorId(id);

  if (!tarea) {
    return res.status(404).json({ error: `Tarea con id ${id} no existe` });
  }
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

  res.status(201).json(repo.obtenerTodas());
});

// PUT /tareas/:id - Actualizar una tarea
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, estacompleta, fecha } = req.body;

  const tareaExistente = repo.consultarPorId(id);
  if (!tareaExistente) {
    return res.status(404).json({ error: `Tarea con id ${id} no existe` });
  }

  const tareaActualizada = repo.actualizarTarea(id, {
    nombre: nombre ?? tareaExistente.nombre,
    descripcion: descripcion ?? tareaExistente.descripcion,
    estacompleta: estacompleta ?? tareaExistente.estacompleta,
    fecha: fecha ? new Date(fecha) : tareaExistente.fecha
  });

  res.json(tareaActualizada);
});

// DELETE /tareas/:id - Eliminar una tarea
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const eliminada = repo.eliminarTarea(id);
  if (!eliminada) {
    return res.status(404).json({ error: `Tarea con id ${id} no existe` });
  }

  res.json({ mensaje: `Tarea con id ${id} eliminada correctamente` });
});

module.exports = router;

