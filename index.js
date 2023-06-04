const express = require('express');
require('./base-orm/sqlite-init');
const app = express();

const articuloslacteos = require('./routes/articuloslacteos');
const articulospanaderia = require('./routes/articulospanaderia');

app.use(express.json());
app.use(articuloslacteos);
app.use(articulospanaderia);

app.get('/', (req, res) => {
  res.send('Ruta por defecto');
});

if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app;
