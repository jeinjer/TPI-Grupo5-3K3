const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
router.use(express.json())

router.get('/api/articulospanaderia', async function (req, res, next) {
  let data = await db.articulospanaderia.findAll({
    attributes: ["IdArticuloPanaderia", "Nombre", "Precio", "Stock", "FechaVencimiento"],
    where:{Activo: true},
  });
  res.json(data);
});

router.get('/api/articulospanaderia/:id', async function (req, res,next) {
    let data = await db.articulospanaderia.findByPk(req.params.id, {
      attributes: ["IdArticuloPanaderia", "Nombre", "Precio", "Stock", "FechaVencimiento"],
      where: {Activo: true},
    });
   if (data){
    res.json(data);
   } else {
    res.status(404).json({message: 'No encontrado'});
   }
  }); 

router.post('/api/articulospanaderia/', async (req, res) => {
    const { Nombre, Precio, Stock, FechaVencimiento } = req.body;
    try {
      let articuloPanaderia = await db.articulospanaderia.create({
        Nombre,
        Precio,
        Stock,
        FechaVencimiento
      });
      res.status(201).json(articuloPanaderia);
    } catch (error){
      res.status(400).json({mensaje: error.message});
    }
});
    
router.put('/api/articulospanaderia/:id', async (req, res) => {
    const { Nombre, Precio, Stock, FechaVencimiento} = req.body;
    try {
      let articuloPanaderia = await db.articulospanaderia.findOne({
        where:{IdArticuloPanaderia: req.params.id },
      });
      if (articuloPanaderia){
        articuloPanaderia.Nombre = Nombre;
        articuloPanaderia.Nombre = Precio;
        articuloPanaderia.Nombre = Stock;
        articuloPanaderia.Nombre = FechaVencimiento;
        await articuloPanaderia.save();
        res.json({message: 'Articulo panaderia actualizado'});
      } else {
        res.status(404).json({message: 'Articulo panaderia no encontrado'});
    }
  } catch (error) {
    res.status(400).json({mensaje: error.message});
  }
  });

  router.delete('/api/articulospanaderia/:id', async (req, res) => {
    let articuloPanaderia = await db.articulospanaderia.findOne({
      where: { IdArticuloPanaderia: req.params.id},
    });
    if (articuloPanaderia){
      articuloPanaderia.Activo = false;
      await articuloPanaderia.save();
      res.json({ message: 'Articulo panaderia marcado como inactivo' });
    } else {
      res.status(404).json({ message: 'categoriaPanaderia no encontrada' })
    }
  });
  
  
module.exports = router;
