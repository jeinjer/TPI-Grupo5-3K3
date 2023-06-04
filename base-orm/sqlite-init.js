const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    await db.open("./.data/articulos.db");

    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articuloslacteos'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(`
        CREATE TABLE articuloslacteos( 
          IdArticuloLacteo INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaVencimiento TEXT,
          Activo INTEGER
        );`
      )
      await db.run(
        `CREATE TABLE articulospanaderia( 
          IdArticuloPanaderia INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaVencimiento TEXT,
          Activo INTEGER
        );` 
        );
      console.log("Tabla articulos lacteos creada!");
      console.log("Tabla articulos panaderia creada!")

      await db.run(`
        INSERT INTO articuloslacteos VALUES
        (1,'Leche La Serenisima', 5.99, 100, '2023-05-28', 1),
        (2,'Yogurt de frutilla Ilolay', 2.49, 50, '2023-05-28', 1),
        (3,'Yogur de vainilla Sancor', 0.99, 200, '2023-05-28', 1),
        (4,'Queso Casancrem', 3.29, 75, '2023-05-28', 1),
        (5,'Helado de Vainilla', 4.99, 150, '2023-05-28', 1),
        (6,'Yogurt griego Milbona', 1.99, 80, '2023-05-28', 1),
        (7,'Manteca Sancor', 1.49, 10, '2023-05-28', 1),
        (8,'Crema de Leche Tregar', 6.99, 90, '2023-05-28', 1),
        (9,'Leche de almendra Ades', 2.49, 10, '2023-05-28',1 ),
        (10,'Kefir Nestle', 0.99, 180, '2023-05-28', 1)
      `
      );
      await db.run(`
      INSERT INTO articulospanaderia VALUES
      (1,'Pan de Salvado', 10.20, 100, '2023-05-28', 1),
      (2,'Pan Integral', 11.30, 50, '2023-05-28', 1),
      (3,'Pan de Semillas', 15.99, 200, '2023-05-28', 1),
      (4,'Pan de Papa', 5.30, 75, '2023-05-28', 1),
      (5,'Harina Integral', 9.99, 150, '2023-05-28', 1),
      (6,'Harina 000', 8.50, 80, '2023-05-28', 1),
      (7,'Harina 0000', 9.50, 10, '2023-05-28', 1),
      (8,'Harina Leudante', 3.95, 90, '2023-05-28', 1),
      (9,'Pan Frances', 5.35, 10, '2023-05-28',1 ),
      (10,'Harina de Trigo', 1.35, 180, '2023-05-28', 1)
    `
    );
    }

    await db.close();
    console.log("Base de datos creada correctamente.");
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
