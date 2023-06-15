import React, { useState, useEffect } from "react";
import moment from "moment";
import ArticulosLacteosBuscar from "./ArticulosLacteosBuscar";
import ArticulosLacteosListado from "./ArticulosLacteosListado";
import ArticulosLacteosRegistro from "./ArticulosLacteosRegistro";
import { articuloslacteosService } from "../../services/articuloslacteos.service";

function ArticulosLacteos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  const [ArticulosLacteos, setArticulosLacteos] = useState(null);

  useEffect(() => {
    async function BuscarArticulosLacteos() {
      let data = await articuloslacteosService.Buscar();
      setArticulosLacteos(data);
    }
    BuscarArticulosLacteos();
  }, []);

  async function Buscar(_pagina) {
    const data = await articuloslacteosService.Buscar(Nombre, Activo);
    setItems(data.Items);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await articuloslacteosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); 
  }
  
  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); 
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdArticuloLacteo: 0,
      Nombre: null,
      Precio: null,
      Stock: null,
      FechaVencimiento: moment(new Date()).format("YYYY-MM-DD"),
      Activo: true,
    });
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      await articuloslacteosService.ActivarDesactivar(item);
      await Buscar();
    }
  }

  async function Grabar(item) {
    await articuloslacteosService.Grabar(item);
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Articulos Lacteos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ArticulosLacteosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <ArticulosLacteosListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ArticulosLacteosRegistro
          {...{ AccionABMC, ArticulosLacteos, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { ArticulosLacteos };
