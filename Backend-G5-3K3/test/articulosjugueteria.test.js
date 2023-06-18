const request = require("supertest");
const app = require("../index");

const articuloJugueteriaAlta = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 15,
  Stock: 10,
  FechaIngreso: '2020-05-25',
};

const articuloJugueteriaModificacion = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 17,
  Stock: 9,
  FechaIngreso: '2020-05-31',
};

describe('GET /api/articulosjugueteria', () => {
  it('Devolvería todos los artículos juguetería', async () => {
    const response = await request(app).get('/api/articulosjugueteria');
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(response.statusCode).toEqual(200);
    expect(response.body.Items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloJugueteria: expect.any(Number),
          Nombre: expect.any(String)
        })
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
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articulosjugueteria/1");
    expect(res.statusCode).toEqual(200);
  });
});
