const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
router.use(express.json())

router.get("/api/articuloslacteos", async function (req, res, next) {
  let data = await db.articuloslacteos.findAll({
    attributes: ["IdArticuloLacteo", "Nombre"],
    where: { Activo: true }, // Solo artículos activos
  });
  res.json(data);
});

router.get("/api/articuloslacteos/:id", async function (req, res, next) {
  let data = await db.articuloslacteos.findByPk(req.params.id, {
    attributes: ["IdArticuloLacteo", "Nombre"],
    where: { Activo: true }, // Solo artículos activos
  });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ mensaje: 'No encontrado!!' });
  }
});

router.post('/api/articuloslacteos', async (req, res) => {
  const { Nombre, Precio, Stock, FechaVencimiento } = req.body;
  try {
    let articuloLacteo = await db.articuloslacteos.create({
      Nombre,
      Precio,
      Stock,
      FechaVencimiento
    });
    res.status(201).json(articuloLacteo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.put('/api/articuloslacteos/:id', async (req, res) => {
  const { Nombre, Precio, Stock, FechaVencimiento } = req.body;
  try {
    let articuloLacteo = await db.articuloslacteos.findOne({
      where: { IdArticuloLacteo: req.params.id },
    });
    if (articuloLacteo) {
      articuloLacteo.Nombre = Nombre;
      articuloLacteo.Precio = Precio;
      articuloLacteo.Stock = Stock;
      articuloLacteo.FechaVencimiento = FechaVencimiento;
      await articuloLacteo.save();
      res.json({ message: 'Articulo lacteo actualizado' });
    } else {
      res.status(404).json({ message: 'Articulo lacteo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});


router.delete('/api/articuloslacteos/:id', async (req, res) => {
  let articuloLacteo = await db.articuloslacteos.findOne({
    where: { IdArticuloLacteo: req.params.id },
  });
  if (articuloLacteo) {
    // Cambiar el estado a inactivo
    articuloLacteo.Activo = false;
    await articuloLacteo.save();
    res.json({ message: 'Articulo lacteo marcado como inactivo' });
  } else {
    res.status(404).json({ message: 'Articulo lacteo no encontrado' });
  }
});


module.exports = router;