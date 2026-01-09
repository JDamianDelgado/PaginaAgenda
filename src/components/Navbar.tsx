import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="Navbar">
      <div className="NavbarLogo">
        <Link to="/">
          <img src="/LogoPagina.png" alt="Power of mind" />
        </Link>
      </div>
      <div className="NavbarMenu">
        <Link to={"/"}>Home</Link>
        <a href="/#Proceso">Nuestro Proceso</a>
        <a href="/#NuestosServicios">Nuestros Servicios</a>
        <Link to={"/planes"}>Planes</Link>
        <Link to={"/login"}>Iniciar Sesion</Link>
        {/* <Link>Nuestros Servicios</Link>
      <Link>Sobre el proceso</Link>
      <Link>Agendar Sesion</Link>
      <Link>Iniciar Sesion</Link>
      <Link>Planes</Link> */}
      </div>
    </nav>
  );
}
