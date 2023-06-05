const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    await db.open("./.data/carniceria.db");

    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulospanaderia'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(`
        CREATE TABLE articuloscarniceria( 
          IdArticuloCarniceria INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaEnvasado TEXT,
          Activo INTEGER
        );`
      );
      console.log("Tabla articulos carniceria creada!");

      await db.run(`
        INSERT INTO articuloscarniceria VALUES
        (1,'Lomo', 16.70, 70, '2023-05-20', 1),
        (2,'Costilla', 11.30, 50, '2023-05-26', 1),
        (3,'Matambre', 13.99, 40, '2023-05-12', 1),
        (4,'Falda', 11.35, 75, '2023-05-28', 1),
        (5, 'Colita de cuadril', 9.99, 30, '2023-05-24', 1),
        (6,'Costeleta', 12.50, 80, '2023-05-20', 1),
        (7,'Pechuga Pollo', 19.50, 80, '2023-05-29', 1),
        (8,'Solomillo', 11.95, 90, '2023-05-22', 1),
        (9,'Entraña', 14.99, 70, '2023-05-26',1 ),
        (10,'Chorizo', 6.35, 180, '2023-05-22', 1)
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
