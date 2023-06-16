const urlServidor = 'http://localhost:4000';
const basePath = process.env.REACT_APP_BASE_PATH;

const urlResourceArticulosLacteos = urlServidor + "/api/articuloslacteos";

export const config = {
    basePath,
    urlServidor,
    urlResourceArticulosLacteos,
}
