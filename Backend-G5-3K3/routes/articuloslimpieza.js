const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
router.use(express.json())

router.get("/api/articuloslimpieza", async function (req, res, next) {
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
  const { count, rows } = await db.articuloslimpieza.findAndCountAll({
    attributes: [
      "IdArticuloLimpieza",
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


router.get("/api/articuloslimpieza/:id", async function (req, res, next) {
  let data = await db.articuloslimpieza.findByPk(req.params.id, {
    attributes: ["IdArticuloLimpieza", 
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

router.post('/api/articuloslimpieza', async (req, res) => {
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
      res.json({ message: 'Articulo limpieza actualizado' });
    } else {
      res.status(404).json({ message: 'Articulo limpieza no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

router.delete("/api/articuloslimpieza/:id", async (req, res) => {
    try {
      let data = await db.sequelize.query(
        "UPDATE articuloslimpiezas SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticuloLimpieza = :IdArticuloLimpieza",
        {
          replacements: { IdArticuloLimpieza: +req.params.id },
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