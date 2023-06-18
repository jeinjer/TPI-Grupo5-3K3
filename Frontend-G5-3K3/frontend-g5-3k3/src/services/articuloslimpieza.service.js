import axios from "axios";

const urlResource = "http://localhost:4000/api/articuloslimpieza";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticuloLimpieza);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticuloLimpieza);
}

async function Grabar(item) {
  if (item.IdArticuloLimpieza === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticuloLimpieza, item);
  }
}

export const articuloslimpiezaService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};