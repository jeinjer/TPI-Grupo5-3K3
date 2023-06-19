const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init')
const { Op, ValidationError } = require("sequelize");
router.use(express.json())

// Nombre, Precio, Stock, FechaEnvasado
router.get('/api/articuloscarniceria', async function (req, res, next) {
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
    const { count, rows } = await db.articuloscarniceria.findAndCountAll({
      attributes: [
        "IdArticuloCarniceria",
        "Nombre",
        "Precio",
        "Stock",
        "FechaEnvasado",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
  
    return res.json({ Items: rows, RegistrosTotal: count });
  });
  
  
  router.get("/api/articuloscarniceria/:id", async function (req, res, next) {
    let data = await db.articuloscarniceria.findByPk(req.params.id, {
      attributes: ["IdArticuloCarniceria", 
                   "Nombre", 
                   "Precio", 
                   "Stock",
                   "FechaEnvasado",
                   "Activo"],
      where: { Activo: true }, // Solo artículos activos
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ mensaje: 'No encontrado!!' });
    }
  });
  
  router.post('/api/articuloscarniceria', async (req, res) => {
    const { Nombre, Precio, Stock, FechaEnvasado } = req.body;
    try {
      let articuloCarniceria = await db.articuloscarniceria.create({
        Nombre,
        Precio,
        Stock,
        FechaEnvasado
      });
      res.status(201).json(articuloCarniceria);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  });
  
  router.put('/api/articuloscarniceria/:id', async (req, res) => {
    const { Nombre, Precio, Stock, FechaEnvasado } = req.body;
    try {
      let articuloCarniceria = await db.articulospanaderia.findOne({
        where: { IdArticuloPanaderia: req.params.id },
      });
      if (articuloCarniceria) {
        articuloCarniceria.Nombre = Nombre;
        articuloCarniceria.Precio = Precio;
        articuloCarniceria.Stock = Stock;
        articuloCarniceria.FechaEnvasado = FechaEnvasado;
        await articuloCarniceria.save();
        res.json({ message: 'Articulo carniceria actualizado' });
      } else {
        res.status(404).json({ message: 'Articulo carniceria no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  });
  
  router.delete("/api/articuloscarniceria/:id", async (req, res) => {
      try {
        let data = await db.sequelize.query(
          "UPDATE articuloscarniceria SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticuloCarniceria = :IdArticuloCarniceria",
          {
            replacements: { IdArticuloCarniceria: +req.params.id },
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