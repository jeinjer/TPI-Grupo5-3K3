const express = require('express');
require('./base-orm/sqlite-init')
const app = express();

const articuloslacteos = require('./routes/articuloslacteos')
app.use(articuloslacteos)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ruta por defecto')
});

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  