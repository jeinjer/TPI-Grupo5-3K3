import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import { Inicio } from "./components/Inicio";
import { ArticulosLacteos } from "./components/articuloslacteos/ArticulosLacteos";

function App() {
  return (
    <>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/articuloslacteos" element={<ArticulosLacteos />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
    </>
  );
}
export default App;
