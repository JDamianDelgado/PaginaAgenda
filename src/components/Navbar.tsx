import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks.Redux";
import { useDispatch } from "react-redux";
import { logout } from "../Store/auth/auth.Slice";
import { useState } from "react";

export function Navbar() {
  const { role, token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMiCuenta, setOpenMiCuenta] = useState(false);

  const isAuth = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    setOpenMiCuenta(false);
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <div className="NavbarLogo">
        <Link to="/">
          <img src="/LogoPagina.png" alt="Power of mind" />
        </Link>
      </div>

      <div className="NavbarMenu">
        <Link to="/">Home</Link>

        {!isAuth && (
          <>
            <a href="/#Proceso">Nuestro Proceso</a>
            <a href="/#NuestrosServicios">Nuestros Servicios</a>
            <Link to="/planes">Planes</Link>
            <Link to="/login">Iniciar sesión</Link>
          </>
        )}

        {isAuth && (
          <>
            <Link to="/planes">Planes</Link>
            {role === "PACIENTE" && (
              <>
                <button
                  className="NavbarButton"
                  onClick={() => setOpenMiCuenta(!openMiCuenta)}
                >
                  Mi cuenta
                </button>

                {openMiCuenta && (
                  <div className="dropdown">
                    <Link to="/nuevoTurno">Agendar sesión</Link>
                    <Link to="/misTurnos">Mis Turnos</Link>
                    <Link to="/miCuenta">Mis datos</Link>
                  </div>
                )}
              </>
            )}
            {role === "PROFESIONAL" && (
              <>
                <Link to="/miPerfil">Mi Perfil</Link>
                <Link to="/miAgenda">Mi agenda</Link>
              </>
            )}
            {role === "ADMIN" && <Link to="/panelAdmin">Panel Admin</Link>}
            <button className="NavbarButton" onClick={handleLogout}>
              Cerrar sesión
            </button>{" "}
          </>
        )}
      </div>
    </nav>
  );
}
