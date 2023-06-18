const request = require("supertest");
const app = require("../index");

const articuloLimpiezaAlta = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaEnvasado: '2020-05-10',
};

const articuloLimpiezaModificacion = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaEnvasado: '2021-05-20',
};

describe('GET /api/articuloslimpieza', () => {
  it('Devolvería todos los artículos limpieza', async () => {
    const response = await request(app).get('/api/articuloslimpieza');
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(response.statusCode).toEqual(200);
    expect(response.body.Items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloLimpieza: expect.any(Number),
          Nombre: expect.any(String)
        })
      ])
    );
  });
});

describe("GET /api/articuloslimpieza/:id", function () {
  it("Debería devolver el artículo con el id 1", async function () {
    const res = await request(app)
      .get("/api/articuloslimpieza/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloLimpieza: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

describe("POST /api/articuloslimpieza/", () => {
  it("Debería devolver el artículo que acabo de crear", async () => {
    const res = await request(app).post("/api/articuloslimpieza").send(articuloLimpiezaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloLimpieza: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

describe("PUT /api/articuloslimpieza/:id", () => {
  it("Debería devolver el artículo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articuloslimpieza/1").send(articuloLimpiezaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/articuloslimpieza/:id", () => {
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articuloslimpieza/1");
    expect(res.statusCode).toEqual(200);
  });
});

