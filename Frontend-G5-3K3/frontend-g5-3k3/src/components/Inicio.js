import React from 'react';
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: "lightgray" }}>
      <h1>Trabajo Práctico Integrador Grupo 5 - 3K3</h1>
      <p>Este TPI está desarrollado con las siguientes tecnologías:</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        múltiples capas en Javascript/Typescript.
      </p>
      <p>
        Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs,
        Javascript y React.
      </p>
      <Link to="/articuloslacteos" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Lacteos
      </Link>

    </div>
  );
}
export { Inicio };
