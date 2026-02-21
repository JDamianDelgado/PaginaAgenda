import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks.Redux";
import { useDispatch } from "react-redux";
import { logout } from "../Store/auth/auth.Slice";
import { useState } from "react";

export function Navbar() {
  const { role, token } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAuth = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <div className="NavbarLogo">
        <Link to="/">
          <img src="image.png" alt="Power of mind" />
        </Link>
      </div>

      <div className="NavbarMenu">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
        {!isAuth && (
          <ul className={`nav-links ${open ? "active" : ""}`}>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <a href="/#Proceso" onClick={() => setOpen(false)}>
              Nuestro Proceso
            </a>

            <Link to="/planes" onClick={() => setOpen(false)}>
              Planes
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              Iniciar sesión
            </Link>
          </ul>
        )}

        {isAuth && (
          <ul className={`nav-links ${open ? "active" : ""}`}>
            <button
              className="NavbarButtonmiCuenta"
              onClick={() => setOpen(!open)}
            >
              Mi cuenta
            </button>
            {role === "PACIENTE" && (
              <>
                {open && (
                  <>
                    <Link to="/planes" onClick={() => setOpen(false)}>
                      Planes
                    </Link>
                    <Link to="/nuevoTurno" onClick={() => setOpen(false)}>
                      Agendar sesión
                    </Link>
                    <Link to="/misTurnos" onClick={() => setOpen(false)}>
                      Mis Turnos
                    </Link>
                    <Link to="/miCuenta" onClick={() => setOpen(false)}>
                      Mis datos
                    </Link>
                    <button
                      className="NavbarButtonCerarSesion"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </>
            )}
            {role === "PROFESIONAL" && (
              <>
                <Link to="/miPerfil" onClick={() => setOpen(false)}>
                  Mi Perfil
                </Link>
                <Link to="/miAgenda" onClick={() => setOpen(false)}>
                  Mi agenda
                </Link>
                <button
                  className="NavbarButtonCerarSesion"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}
            {role === "ADMIN" && (
              <>
                <Link to="/panelAdmin" onClick={() => setOpen(false)}>
                  Panel Admin
                </Link>
                <button
                  className="NavbarButtonCerarSesion"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>{" "}
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
