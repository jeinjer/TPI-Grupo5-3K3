import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { ArticulosLacteos } from "./components/articuloslacteos/ArticulosLacteos";
import { ArticulosPanaderia } from "./components/articulospanaderia/ArticulosPanaderia";
import { ArticulosLimpieza } from "./components/articuloslimpieza/ArticulosLimpieza.jsx";
import { ArticulosCarniceria } from "./components/articuloscarniceria/ArticulosCarniceria.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/articuloslacteos" element={<ArticulosLacteos/>} />
              <Route path="/articulospanaderia" element={<ArticulosPanaderia/>} />
              <Route path="/articuloslimpieza" element={<ArticulosLimpieza/>} />
              <Route path="/articuloscarniceria" element={<ArticulosCarniceria/>} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}
export default App;