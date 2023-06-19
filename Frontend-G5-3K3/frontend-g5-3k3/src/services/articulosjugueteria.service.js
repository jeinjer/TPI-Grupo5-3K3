import axios from "axios";

const urlResource = "http://localhost:4000/api/articulosjugueteria";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticuloJugueteria);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticuloJugueteria);
}

async function Grabar(item) {
  if (item.IdArticuloJugueteria === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticuloJugueteria, item);
  }
}

export const articulosjugueteriaService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};