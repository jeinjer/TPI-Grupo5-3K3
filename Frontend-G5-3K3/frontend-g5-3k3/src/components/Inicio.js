import React from 'react';
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Trabajo Práctico Integrador Grupo 5 - 3K3</h1>
      <p>Este TPI está desarrollado por los siguientes estudiantes:</p>
      <p>
      </p>
      Barrera, Alejo<br></br>
      Boatti, Martina<br></br>
      Pininguer, Catalina<br></br>
      Tommasi, Gianfranco<br></br>
      Tommasi, Stefano<br></br><br></br>
      <Link to="/articuloslacteos" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Lacteos
      </Link>
      <Link to="/articulospanaderia" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Panaderia
      </Link>
      <Link to="/articuloslimpieza" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Limpieza
      </Link>
      <Link to="/articuloscarniceria" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Carniceria
      </Link>

    </div>
  );
}
export { Inicio };
