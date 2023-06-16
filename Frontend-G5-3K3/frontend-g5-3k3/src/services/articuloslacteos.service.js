import axios from "axios";

const urlResource = "http://localhost:4000/api/articuloslacteos";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticuloLacteo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticuloLacteo);
}

async function Grabar(item) {
  if (item.IdArticuloLacteo === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticuloLacteo, item);
  }
}

export const articuloslacteosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
