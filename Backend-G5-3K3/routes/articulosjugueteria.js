const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
const { Op, ValidationError } = require("sequelize");
router.use(express.json())

router.get("/api/articulosjugueteria", async function (req, res, next) {
  let where = {};

  if (req.query.Nombre != undefined && req.query.Nombre != "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }if (req.query.Activo != undefined && req.query.Activo !== "") {
    where.Activo = req.query.Activo === "true";
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.articulosjugueteria.findAndCountAll({
    attributes: [
      "IdArticuloJugueteria",
      "Nombre",
      "Precio",
      "Stock",
      "FechaIngreso",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});


router.get("/api/articulosjugueteria/:id", async function (req, res, next) {
  let data = await db.articulosjugueteria.findByPk(req.params.id, {
    attributes: ["IdArticuloJugueteria", 
                 "Nombre", 
                 "Precio", 
                 "Stock",
                 "FechaIngreso",
                 "Activo"],
    where: { Activo: true }, // Solo artículos activos
  });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ mensaje: 'No encontrado!!' });
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
        articuloJugueteria.Precio = Precio;
        articuloJugueteria.Stock = Stock;
        articuloJugueteria.FechaIngreso = FechaIngreso;
        await articuloJugueteria.save();
        res.json({message: 'Articulo de juguetería actualizado'});
      } else {
        res.status(404).json({message: 'Articulo de juguetería no encontrado'});
    }
  } catch (error) {
    res.status(400).json({mensaje: error.message});
  }
  });

  router.delete("/api/articulosjugueteria/:id", async (req, res) => {
    try {
      let data = await db.sequelize.query(
        "UPDATE articulosjugueteria SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticuloJugueteria = :IdArticuloJugueteria",
        {
          replacements: { IdArticuloJugueteria: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        throw err;
      }
    }
  }
);
  



module.exports = router;
