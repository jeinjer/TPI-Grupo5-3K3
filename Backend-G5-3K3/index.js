const express = require('express');
const cors = require('cors');
require('./base-orm/sqlite-init');

const app = express();

const articuloslacteos = require('./routes/articuloslacteos');
const articulospanaderia = require('./routes/articulospanaderia');
const articulosjugueteria = require('./routes/articulosjugueteria');
const articuloscarniceria = require('./routes/articuloscarniceria');
const articuloslimpieza = require('./routes/articuloslimpieza');

app.use(express.json());
app.use(cors());

app.use(articuloslacteos);
app.use(articulospanaderia);
app.use(articulosjugueteria);
app.use(articuloscarniceria);
app.use(articuloslimpieza);

app.get('/', (req, res) => {
  res.send('Ruta por defecto');
});

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;
