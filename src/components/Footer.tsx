import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="contenedorFooter">
      {/* <form action="" className="formFooter">
        <h2>Network MD</h2>
        <p>SUBSCRIBE</p>
        <input
          type="text"
          name="Email"
          id="Email"
          placeholder="Ingrese su email..."
        />
        <button type="submit" className="buttonShadow">
          Enviar
        </button>
      </form> */}

      <section className="footerContacto">
        <div className="footer">
          <h2>Menu</h2>
          <Link to={"/"}>Home</Link>
          <a href="#Proceso">Nuestro Proceso</a>
          <a href="#NuestosServicios">Nuestros Servicios</a>
        </div>
        <div className="footer">
          <h2>Redes sociales </h2>
          <Link to={"/"}>Facebook</Link>
          <Link to={"/"}>Instagram</Link>
          <Link to={"/"}>Telegram</Link>
        </div>
        <div className="footer">
          <h2>Contacto</h2>
          <a>Number</a>
          <a>email</a>
        </div>
      </section>
    </div>
  );
}
