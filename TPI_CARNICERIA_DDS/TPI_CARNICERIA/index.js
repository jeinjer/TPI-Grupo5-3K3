const express = require("express");
require('./base-orm/sqlite-init')

const app = express();

const articuloscarniceria = require('./routes/articuloscarniceria')

app.use(articuloscarniceria);
app.use(express.json());

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// levantar servidor
if (!module.parent){
  const port = process.env.PORT || 4000;
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`Sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app;
