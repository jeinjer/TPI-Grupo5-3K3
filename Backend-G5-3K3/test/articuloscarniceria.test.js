const request = require("supertest");
const app = require("../index");

const articuloCarniceriaAlta = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaEnvasado: new Date().toISOString(),
};

const articuloCarniceriaModificacion = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaEnvasado: new Date().toISOString(),
};

describe("GET /api/articuloscarniceria", function () {
  it("Devolvería todos los artículos carniceria", async function () {
    const res = await request(app)
      .get("/api/articuloscarniceria")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.statusCode).toEqual(200);
    expect(response.body.Items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloCarniceria: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/articuloscarniceria/:id", function () {
  it("Debería devolver el artículo con el id 1", async function () {
    const res = await request(app)
      .get("/api/articuloscarniceria/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloCarniceria: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

describe("POST /api/articuloscarniceria/", () => {
  it("Debería devolver el artículo que acabo de crear", async () => {
    const res = await request(app).post("/api/articuloscarniceria").send(articuloCarniceriaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloCarniceria: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

describe("PUT /api/articuloscarniceria/:id", () => {
  it("Debería devolver el artículo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articuloscarniceria/1").send(articuloCarniceriaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/articuloscarniceria/:id", () => {
  it("Debería devolver el artículo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articuloscarniceria/1");
    expect(res.statusCode).toEqual(200);
  });
});
