import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import "./App.css";
import "./styles/Navbar.css";
import "./styles/Home.css";
import "./styles/footer.css";
import "./styles/planes.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Login } from "./Pages/Login";
import { Planes } from "./Pages/Planes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "./Store/hooks.Redux";
import { PanelAdmin } from "./Pages/ADMIN/panelAdmin";
import { ProtectedRoute } from "./utils/proteccionRutas";
import { MiCuenta } from "./Pages/MiCuenta";
import { MisTurnos } from "./Pages/Turnos";
import { PerfilProfesional } from "./Pages/PROFESIONAL/perfilProfesional";
import { NuevoTurno } from "./components/nuevoTurno";
import { AgendaTurnos } from "./Pages/PROFESIONAL/agendaTurnosProfesional";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
function App() {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/planes" element={<Planes />} />
          {role === "PACIENTE" && (
            <>
              <Route
                path="/miCuenta"
                element={
                  <ProtectedRoute allowedRoles={["PACIENTE"]}>
                    <MiCuenta />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/misTurnos"
                element={
                  <ProtectedRoute allowedRoles={["PACIENTE"]}>
                    <MisTurnos />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {role === "ADMIN" && (
            <Route
              path="/panelAdmin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <PanelAdmin />
                </ProtectedRoute>
              }
            />
          )}
          {role === "PROFESIONAL" && (
            <>
              <Route
                path="/miPerfil"
                element={
                  <ProtectedRoute allowedRoles={["PROFESIONAL"]}>
                    <PerfilProfesional />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/miAgenda"
                element={
                  <ProtectedRoute allowedRoles={["PROFESIONAL"]}>
                    <AgendaTurnos></AgendaTurnos>
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {role === "PACIENTE" && (
            <Route
              path="/nuevoTurno"
              element={<NuevoTurno></NuevoTurno>}
            ></Route>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
