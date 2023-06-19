import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand">
          <i className="fa fa-industry"></i>
          &nbsp;<i>TPI</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/articuloslacteos">
                Articulos Lacteos
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/articulospanaderia">
                Articulos Panaderia
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/articuloslimpieza">
                Articulos Limpieza
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/articuloscarniceria">
                Articulos Carniceria
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link" to="/articulosjugueteria">
                Articulos Jugueteria
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
