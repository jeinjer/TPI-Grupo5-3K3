const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
router.use(express.json())

router.get('/api/articulosjugueteria', async function (req, res, next) {
  let data = await db.articulosjugueteria.findAll({
    attibutes: ["IdArticuloJugueteria", "Nombre"],
    where:{Activo: true},
  });
  res.json(data);
});

router.get('/api/articulosjugueteria/:id', async function (req, res,next) {
    let data = await db.articulosjugueteria.findByPk(req.params.id, {
      attributes: ["IdArticuloJugueteria", "Nombre", "Precio", "Stock", "FechaIngreso"],
      where: {Activo: true},
    });
   if (data){
    res.json(data);
   } else {
    res.status(404).json({message: 'No encontrado'});
   }
  }); 

router.post('/api/articulosjugueteria/', async (req, res) => {
    const { Nombre, Precio, Stock, FechaIngreso } = req.body;
    try {
      let articuloJugueteria = await db.articulosjugueteria.create({
        Nombre,
        Precio,
        Stock,
        FechaIngreso
      });
      res.status(201).json(articuloJugueteria);
    } catch (error){
      res.status(400).json({mensaje: error.message});
    }
});
    
router.put('/api/articulosjugueteria/:id', async (req, res) => {
    const { Nombre, Precio, Stock, FechaIngreso} = req.body;
    try {
      let articuloJugueteria = await db.articulosjugueteria.findOne({
        where:{IdArticuloJugueteria: req.params.id },
      });
      if (articuloJugueteria){
        articuloJugueteria.Nombre = Nombre;
        articuloJugueteria.Nombre = Precio;
        articuloJugueteria.Nombre = Stock;
        articuloJugueteria.Nombre = FechaIngreso;
        await articuloJugueteria.save();
        res.json({message: 'Articulo de juguetería actualizado'});
      } else {
        res.status(404).json({message: 'Articulo de juguetería no encontrado'});
    }
  } catch (error) {
    res.status(400).json({mensaje: error.message});
  }
  });

  router.delete('/api/articulosjugueteria/:id', async (req, res) => {
    let articuloJugueteria = await db.articulosjugueteria.findOne({
      where: { IdArticuloJugueteria: req.params.id},
    });
    if (articuloJugueteria){
      articuloJugueteria.Activo = false;
      await articuloJugueteria.save();
      res.json({ message: 'Articulo Jugueteria marcado como inactivo' });
    } else {
      res.status(404).json({ message: 'categoriaJuguetería no encontrada' })
    }
  });
  



module.exports = router;
