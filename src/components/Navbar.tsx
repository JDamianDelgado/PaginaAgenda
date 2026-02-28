import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { logout } from "../Store/auth/auth.Slice";
import { useEffect, useMemo, useState } from "react";
import { getMyConversations } from "../Store/Chat/chat.thunks";
import { FiBell } from "react-icons/fi";

export function Navbar() {
  const { role, token } = useAppSelector((state) => state.auth);
  const { conversaciones } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAuth = Boolean(token);
  const canUseChat = role === "PACIENTE" || role === "PROFESIONAL";

  const unreadCount = useMemo(
    () =>
      conversaciones.reduce(
        (acum, conversation) => acum + (conversation.noLeidos || 0),
        0,
      ),
    [conversaciones],
  );

  useEffect(() => {
    if (!isAuth || !canUseChat) {
      return;
    }

    dispatch(getMyConversations());
    const interval = window.setInterval(() => {
      dispatch(getMyConversations());
    }, 30000);

    return () => window.clearInterval(interval);
  }, [dispatch, isAuth, canUseChat]);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <div className="NavbarLogo">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src="logoEliz.png" alt="Power of mind" className="Logo" />
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
              {canUseChat && (
                <span
                  className="NavbarNotification"
                  aria-label="Mensajes sin leer"
                >
                  <FiBell />
                  {unreadCount > 0 && <strong>{unreadCount}</strong>}
                </span>
              )}
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
                      {unreadCount > 0 && (
                        <span className="NavbarInlineBadge">{unreadCount}</span>
                      )}
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
                  {unreadCount > 0 && (
                    <span className="NavbarInlineBadge">{unreadCount}</span>
                  )}
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
