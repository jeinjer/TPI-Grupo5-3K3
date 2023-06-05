const db = require("aa-sqlite");

async function CrearTablaArticulosJugueteria() {
  try {
    await db.open("./.data/jugueteria.db");

    const res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosjugueteria'",
      []
    );
    if (res.contar === 0) {
      await db.run(`
        CREATE TABLE articulosjugueteria( 
          IdArticuloJugueteria INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaIngreso TEXT,
          Activo INTEGER
        );`
      );
      console.log("Tabla articulos jugueteria creada!");

      await db.run(`
        INSERT INTO articulosjugueteria VALUES
        (1,'Monopoly', 499.99, 18, '2023-05-29', 1),
        (2,'Jenga', 349.99, 47, '2023-05-29', 1),
        (3,'Lego', 299.99, 20, '2023-05-29', 1),
        (4,'Ajedrez', 119.99, 75, '2023-05-29', 1),
        (5,'Rompecabezas', 59.99, 130, '2023-05-29', 1),
        (6,'Cartas UNO', 75.99, 200, '2023-05-29', 1),
        (7,'Twister', 199.99, 30, '2023-05-29', 1),
        (8,'Max Steel', 449.99, 100, '2023-05-29', 1),
        (9,'Barbie', 349.99, 100, '2023-05-29',1 ),
        (10,'Hot Wheels', 274.99, 120, '2023-05-29', 1)
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
