const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
router.use(express.json())



router.get('/api/articuloscarniceria', async function (req, res, next) {
  let = data = await db.articuloscarniceria.findAll({
    attibutes: ["IdArticuloCarniceria", "Nombre"],
    where:{Activo: true},
  });
  res.json(data);
});

router.get('/api/articuloscarniceria/:id', async function (req, res,next) {
    let data = await db.articuloscarniceria.findByPk(req.params.id, {
      attributes: ["IdArticuloCarniceria", "Nombre", "Precio", "Stock", "FechaEnvasado"],
      where: {Activo: true},
    });
   if (data){
    res.json(data);
   } else {
    res.status(404).json({message: 'No encontrado'});
   }
  }); 

router.post('/api/articuloscarniceria/', async (req, res) => {
    const { Nombre, Precio, Stock, FechaEnvasado } = req.body;
    try {
      let articuloCarniceria = await db.articuloscarniceria.create({
        Nombre,
        Precio,
        Stock,
        FechaEnvasado,
      });
      res.status(201).json(articuloCarniceria);
    } catch (error){
      res.status(400).json({mensaje: error.message});
    }
});
    
router.put('/api/articuloscarniceria/:id', async (req, res) => {
    const { Nombre, Precio, Stock, FechaEnvasado} = req.body;
    try {
      let articuloCarniceria = await db.articuloscarniceria.findOne({
        where:{IdArticuloCarniceria: req.params.id },
      });
      if (articuloCarniceria){
        articuloCarniceria.Nombre = Nombre;
        articuloCarniceria.Nombre = Precio;
        articuloCarniceria.Nombre = Stock;
        articuloCarniceria.Nombre = FechaEnvasado;
        await articuloCarniceria.save();
        res.json({message: 'Articulo carniceria actualizado'});
      } else {
        res.status(404).json({message: 'Articulo carniceria no encontrado'});
    }
  } catch (error) {
    res.status(400).json({mensaje: error.message});
  }
  });

  router.delete('/api/articuloscarniceria/:id', async (req, res) => {
    let articuloCarniceria = await db.articuloscarniceria.findOne({
      where: { IdArticuloCarniceria: req.params.id},
    });
    if (articuloCarniceria){
      articuloCarniceria.Activo = false;
      await articuloCarniceria.save();
      res.json({ message: 'articulo carniceria marcado como inactivo' });
    } else {
      res.status(404).json({ message: 'categoriaCarniceria no encontrada' })
    }
  });
  



module.exports = router;
