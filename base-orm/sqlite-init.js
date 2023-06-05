const db = require("aa-sqlite");

async function CrearTablaArticulosLacteos() {
  try {
    await db.open("./.data/articulos.db");

    const res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articuloslacteos'",
      []
    );
    if (res.contar === 0) {
      await db.run(`
        CREATE TABLE articuloslacteos( 
          IdArticuloLacteo INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaVencimiento TEXT,
          Activo INTEGER
        );`
      );

      console.log("Tabla articulos lacteos creada!");

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
        (9,'Leche de almendra Ades', 2.49, 10, '2023-05-28', 1),
        (10,'Kefir Nestle', 0.99, 180, '2023-05-28', 1)
      `
      );

      console.log("Registros insertados en la tabla articulos lacteos.");
    }

    await db.close();
  } catch (error) {
    console.error(error);
  }
}

async function CrearTablaArticulosPanaderia() {
  try {
    await db.open("./.data/articulos.db");

    const res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulospanaderia'",
      []
    );
    if (res.contar === 0) {
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
        (9,'Pan Frances', 5.35, 10, '2023-05-28', 1),
        (10,'Harina de Trigo', 1.35, 180, '2023-05-28', 1)
      `
      );

      console.log("Registros insertados en la tabla articulos panaderia.");
    }

    await db.close();
  } catch (error) {
    console.error(error);
  }
}

async function CrearTablaArticulosJugueteria() {
  try {
    await db.open("./.data/articulos.db");

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
    

    console.log("Registros insertados en la tabla articulos juguetería.");
  }
    await db.close();
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  }
}

async function CrearTablaArticulosCarniceria() {
  try {
    await db.open("./.data/articulos.db");

    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articuloscarniceria'",
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
    

    console.log("Registros insertados en la tabla articulos carniceria.");
  }
    await db.close();
  } catch (error) {
  console.error(error);
}
}

async function CrearTablaArticulosLimpieza() {
  try {
    await db.open("./.data/limpieza.db");

    existe = false;
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articuloslimpieza'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(`
        CREATE TABLE articuloslimpieza( 
          IdArticuloLimpieza INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT NOT NULL UNIQUE,
          Precio REAL,
          Stock INTEGER,
          FechaEnvasado TEXT,
          Activo INTEGER
        );`
      );
      console.log("Tabla articulos limpieza creada!");

      await db.run(`
        INSERT INTO articuloslimpieza VALUES
        (1,'Detergente', 15.70, 60, '2023-06-3', 1),
        (2,'Lavandina', 13.50, 80, '2023-06-3', 1),
        (3,'Esponja de cocina', 8.99, 100, '2023-06-3', 1),
        (4,'Trapo de piso', 6.50, 65, '2023-06-3', 1),
        (5,'Escoba', 10.25, 30, '2023-06-3', 1),
        (6,'Palo de piso', 15.90, 45, '2023-06-3', 1),
        (7,'Limpia vidrios', 20.70, 80, '2023-06-3', 1),
        (8,'Guantes de limpieza', 5.20, 55, '2023-06-3', 1),
        (9,'Suavizante', 17.80, 15, '2023-06-3', 1),
        (10,'Mopa', 12.40, 120, '2023-06-3', 1)
      `
      );
    }

    await db.close();
    console.log("Base de datos creada correctamente.");
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  }
}

async function CrearBaseSiNoExiste() {
  await CrearTablaArticulosLacteos();
  await CrearTablaArticulosPanaderia();
  await CrearTablaArticulosJugueteria();
  await CrearTablaArticulosCarniceria();
  await CrearTablaArticulosLimpieza();
  console.log("Base de datos creada correctamente.");
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
