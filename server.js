const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para archivos estáticos y parsear JSON
app.use(express.static('public'));
app.use(express.json());

// Ruta para obtener máquinas
app.get('/api/maquinas', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'BDmaquinas.txt'), 'utf8');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error al leer archivo');
  }
});

// Ruta para guardar máquinas
app.post('/api/maquinas', (req, res) => {
  try {
    fs.writeFileSync(path.join(__dirname, 'public', 'BDmaquinas.txt'), req.body.content);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error al guardar');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});