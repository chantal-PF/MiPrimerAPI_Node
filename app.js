const express = require('express');
const app = express();

const tareasRoutes = require('./tareasRoutes');

app.use(express.json());

// Rutas base
app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js');
});

// Usamos las rutas de tareas en /tareas
app.use('/tareas', tareasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});