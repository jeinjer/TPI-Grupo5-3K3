import axios from "axios";

const urlResource = "http://localhost:4000/api/articuloscarniceria";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticuloCarniceria);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticuloCarniceria);
}

async function Grabar(item) {
  if (item.IdArticuloCarniceria === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticuloCarniceria, item);
  }
}

export const articuloscarniceriaService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};