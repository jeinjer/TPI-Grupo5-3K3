const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    await db.open("./.data/panaderia.db");

    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulospanaderia'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(`
        CREATE TABLE articulospanaderia( 
          IdArticuloPanaderia INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaVencimiento TEXT,
          Activo INTEGER
        );`
      );
      console.log("Tabla articulos panaderia creada!");

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
