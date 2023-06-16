import axios from "axios";
import modalService from "./modalDialog.service";

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  (error) => {
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);

    error.message =
      error?.response?.data?.message ??
      "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    modalService.Alert(error.message);

    return Promise.reject(error);
  }
);

export default httpService;
