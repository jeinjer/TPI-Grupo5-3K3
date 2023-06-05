const request = require("supertest");
const app = require("../index");

const articuloJugueteriaAlta = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaIngreso: new Date().toISOString(),
};

const articuloJugueteriaModificacion = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaIngreso: new Date().toISOString(),
};

describe("GET /api/articulosjugueteria", function () {
  it("Devolvería todos los artículos de juguetería", async function () {
    const res = await request(app)
      .get("/api/articulosjugueteria")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloPanaderia: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/articulosjugueteria/:id", function () {
  it("Debería devolver el artículo con el id 1", async function () {
    const res = await request(app)
      .get("/api/articulosjugueteria/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloJugueteria: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

describe("POST /api/articulosjugueteria/", () => {
  it("Debería devolver el artículo que acabo de crear", async () => {
    const res = await request(app).post("/api/articulosjugueteria").send(articuloJugueteriaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloJugueteria: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

describe("PUT /api/articulosjugueteria/:id", () => {
  it("Debería devolver el artículo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articulosjugueteria/1").send(articuloJugueteriaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/articulosjugueteria/:id", () => {
  it("Debería devolver el artículo con el id 1 marcado como inactivo", async () => {
    const res = await request(app).delete("/api/articulosjugueteria/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Articulo Jugueteria marcado como inactivo",
      })
    );
  });
});
