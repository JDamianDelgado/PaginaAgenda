import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function Login() {
  const [view, setView] = useState(false);
  const [register, setRegister] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const [login, setLogin] = useState({
    nombre: "",
    contrasena: "",
  });

  const [viewPassword, setViewPassword] = useState(false);
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("LOGIN:", login);
    setLogin({
      nombre: "",
      contrasena: "",
    });
  };

  const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("REGISTER:", register);
    setRegister({
      nombre: "",
      apellido: "",
      email: "",
      contrasena: "",
    });
  };
  return (
    <div className="contenedorForm">
      {view === false ? (
        <form onSubmit={handleSubmitLogin} className="contenedorLogin">
          <label htmlFor="usuario">Usuario</label>
          <input
            onChange={handleLoginChange}
            type="text"
            value={login.nombre}
            name="nombre"
          />

          <label htmlFor="password">Contrasena</label>

          <div className="verPassword">
            <input
              onChange={handleLoginChange}
              type={viewPassword ? "text" : "password"}
              value={login.contrasena}
              name="contrasena"
              required
            />

            <span
              className="togglePassword"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Iniciar sesion</button>

          <span onClick={() => setView(true)}>Registrate</span>
          <span>Haz olvidado tu contrasena?</span>
        </form>
      ) : (
        <form onSubmit={handleSubmitRegister} className="contenedorRegistro">
          <label htmlFor="">Nombre</label>
          <input
            onChange={handleRegisterChange}
            type="text"
            value={register.nombre}
            placeholder="Inserte su nombre"
            required
            name="nombre"
          />
          <label htmlFor="">Apellido</label>
          <input
            name="apellido"
            onChange={handleRegisterChange}
            type="text"
            value={register.apellido}
            placeholder="Inserte su apellido"
            required
          />

          <label htmlFor="">Email</label>
          <input
            name="email"
            onChange={handleRegisterChange}
            type="email"
            value={register.email}
            placeholder="Inserte su email"
            required
          />

          <label htmlFor="">Contrasena</label>
          <div className="verPassword">
            <input
              name="contrasena"
              onChange={handleRegisterChange}
              type={viewPassword ? "text" : "password"}
              value={register.contrasena}
              required
            />
            <span
              // className="togglePassword"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <small>
            Debe contener 1 mayúscula y 1 carácter especial como mínimo{" "}
          </small>
          <div className="botonesRegistro">
            <button type="submit">Registrate</button>
            <button onClick={() => setView(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
