const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
router.use(express.json())

router.get("/api/articulospanaderia", async function (req, res, next) {
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
  const { count, rows } = await db.articulospanaderia.findAndCountAll({
    attributes: [
      "IdArticuloPanaderia",
      "Nombre",
      "Precio",
      "Stock",
      "FechaVencimiento",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});


router.get("/api/articulospanaderia/:id", async function (req, res, next) {
  let data = await db.articulospanaderia.findByPk(req.params.id, {
    attributes: ["IdArticuloPanaderia", 
                 "Nombre", 
                 "Precio", 
                 "Stock",
                 "FechaVencimiento",
                 "Activo"],
    where: { Activo: true }, // Solo artículos activos
  });
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ mensaje: 'No encontrado!!' });
  }
});

router.post('/api/articulospanaderia', async (req, res) => {
  const { Nombre, Precio, Stock, FechaVencimiento } = req.body;
  try {
    let articuloPanaderia = await db.articulospanaderia.create({
      Nombre,
      Precio,
      Stock,
      FechaVencimiento
    });
    res.status(201).json(articuloPanaderia);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.put('/api/articulospanaderia/:id', async (req, res) => {
  const { Nombre, Precio, Stock, FechaVencimiento } = req.body;
  try {
    let articuloPanaderia = await db.articulospanaderia.findOne({
      where: { IdArticuloPanaderia: req.params.id },
    });
    if (articuloPanaderia) {
      articuloPanaderia.Nombre = Nombre;
      articuloPanaderia.Precio = Precio;
      articuloPanaderia.Stock = Stock;
      articuloPanaderia.FechaVencimiento = FechaVencimiento;
      await articuloPanaderia.save();
      res.json({ message: 'Articulo panaderia actualizado' });
    } else {
      res.status(404).json({ message: 'Articulo panaderia no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.delete("/api/articulospanaderia/:id", async (req, res) => {
    try {
      let data = await db.sequelize.query(
        "UPDATE articulospanaderia SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticuloPanaderia = :IdArticuloPanaderia",
        {
          replacements: { IdArticuloPanaderia: +req.params.id },
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