import { config } from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceArticulosLacteos;

async function Buscar(Nombre, Activo) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdArticuloLacteo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdArticuloLacteo);
}

async function Grabar(item) {
  if (item.IdArticuloLacteo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdArticuloLacteo, item);
  }
}

export const articuloslacteosService = {
  Buscar,
  BuscarPorId,
  ActivarDesactivar,
  Grabar,
};
