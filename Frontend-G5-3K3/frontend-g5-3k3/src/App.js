import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Footer } from "./components/Footer";
import Menu from "./components/Menu";
import { Inicio } from "./components/Inicio";
import { ArticulosLacteos } from "./components/articuloslacteos/ArticulosLacteos";
import ErrorB from "./components/ErrorB";
import ModalDialog from "./components/ModalDialog";
import { config } from './config';


window.onerror = (msg, url, line, col, error) => {
  // Note that col & error are new to the HTML 5 spec and may not be
  // supported in every browser.  
  var extra = !col ? "" : "\ncolumn: " + col;
  extra += !error ? "" : "\nerror: " + error;

  // You can view the information in an alert to see things working like this:
  let mensaje = "Error: " + msg + "\nurl: " + url + "\nline: " + line + extra;
  console.error(mensaje);
  logError(mensaje);

  var suppressErrorAlert = true;
  // If you return true, then error alerts (like in older versions of
  // Internet Explorer) will be suppressed.
  return suppressErrorAlert;
};

window.onunhandledrejection = (e) => {
  logError(e);
};

const logError = (error) => {
  console.log( error);
  // eviar al servidor este error para que lo loguee
};

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorB} onError={logError}>
        <BrowserRouter basename={config.basePath} >
          <ModalDialog/>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/articuloslacteos" element={<ArticulosLacteos />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
