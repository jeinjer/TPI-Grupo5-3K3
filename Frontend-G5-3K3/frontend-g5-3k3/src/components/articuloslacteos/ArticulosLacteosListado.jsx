import React from "react";
import moment from "moment";

export default function ArticulosLacteosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Buscar,
}) {
  return (
    <>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Fecha de Vencimiento</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdArticuloLacteo}>
                <td>{Item.Nombre}</td>
                <td className="text-end">{Item.Precio}</td>
                <td className="text-end">{Item.Stock}</td>
                <td className="text-end">
                  {moment(Item.FechaVencimiento).format("DD/MM/YYYY")}
                </td>
                <td>{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm " +
                      (Item.Activo
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Activo ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Activo ? "times" : "check")}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="col">
        <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
          <i className="fa fa-print"></i>Imprimir
        </button>
      </div>
    </>
  );
}
