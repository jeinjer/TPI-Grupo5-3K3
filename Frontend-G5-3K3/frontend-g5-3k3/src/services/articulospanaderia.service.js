import axios from "axios";

const urlResource = "http://localhost:4000/api/articulospanaderia";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticuloPanaderia);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticuloPanaderia);
}

async function Grabar(item) {
  if (item.IdArticuloPanaderia === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticuloPanaderia, item);
  }
}

export const articulospanaderiaService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};