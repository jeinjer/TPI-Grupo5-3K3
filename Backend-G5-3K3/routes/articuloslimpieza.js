const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
router.use(express.json());

router.get('/api/articuloslimpieza', async function (req, res, next) {
  let data = await db.articuloslimpieza.findAll({
    attributes: ["IdArticuloLimpieza", "Nombre"],
    where: { Activo: true },
  });
  res.json(data);
});

router.get('/api/articuloslimpieza/:id', async function (req, res, next) {
  let data = await db.articuloslimpieza.findByPk(req.params.id, {
    attributes: ["IdArticuloLimpieza", "Nombre"],
    where: { Activo: true },
  });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
});

router.post('/api/articuloslimpieza/', async (req, res) => {
  const { Nombre, Precio, Stock, FechaEnvasado } = req.body;
  try {
    let articuloLimpieza = await db.articuloslimpieza.create({
      Nombre,
      Precio,
      Stock,
      FechaEnvasado
    });
    res.status(201).json(articuloLimpieza);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.put('/api/articuloslimpieza/:id', async (req, res) => {
  const { Nombre, Precio, Stock, FechaEnvasado } = req.body;
  try {
    let articuloLimpieza = await db.articuloslimpieza.findOne({
      where: { IdArticuloLimpieza: req.params.id },
    });
    if (articuloLimpieza) {
      articuloLimpieza.Nombre = Nombre;
      articuloLimpieza.Precio = Precio;
      articuloLimpieza.Stock = Stock;
      articuloLimpieza.FechaEnvasado = FechaEnvasado;
      await articuloLimpieza.save();
      res.json({ message: 'Articulo de limpieza actualizado' });
    } else {
      res.status(404).json({ message: 'Articulo de limpieza no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.delete('/api/articuloslimpieza/:id', async (req, res) => {
  let articuloLimpieza = await db.articuloslimpieza.findOne({
    where: { IdArticuloLimpieza: req.params.id },
  });
  if (articuloLimpieza) {
    articuloLimpieza.Activo = false;
    await articuloLimpieza.save();
    res.json({ message: 'Articulo limpieza marcado como inactivo' });
  } else {
    res.status(404).json({ message: 'categoriaLimpieza no encontrada' });
  }
});

module.exports = router;
