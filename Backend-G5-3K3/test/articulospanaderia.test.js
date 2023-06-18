const request = require("supertest");
const app = require("../index");

const articulopanaderiaAlta = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaVencimiento: '2020-05-10',
};

const articulopanaderiaModificacion = {
  Nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  Stock: 11,
  FechaVencimiento: '2021-05-20',
};

describe('GET /api/articulospanaderia', () => {
  it('Devolvería todos los artículos panaderia', async () => {
    const response = await request(app).get('/api/articulospanaderia');
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(response.statusCode).toEqual(200);
    expect(response.body.Items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloPanaderia: expect.any(Number),
          Nombre: expect.any(String)
        })
      ])
    );
  });
});

describe("GET /api/articulospanaderia/:id", function () {
  it("Debería devolver el artículo con el id 1", async function () {
    const res = await request(app)
      .get("/api/articulospanaderia/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloPanaderia: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

describe("POST /api/articulospanaderia/", () => {
  it("Debería devolver el artículo que acabo de crear", async () => {
    const res = await request(app).post("/api/articulospanaderia").send(articulopanaderiaAlta);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloPanaderia: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

describe("PUT /api/articulospanaderia/:id", () => {
  it("Debería devolver el artículo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articulospanaderia/1").send(articulopanaderiaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/articulospanaderia/:id", () => {
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articulospanaderia/1");
    expect(res.statusCode).toEqual(200);
  });
});