import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { loginUser, registerUser } from "../Store/auth/auth.Thunks";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useAppDispatch();

  const { loading, error, token, role } = useAppSelector((state) => state.auth);
  const [view, setView] = useState(false);
  const [register, setRegister] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    role: "",
  });
  const [login, setLogin] = useState({
    email: "",
    contrasena: "",
  });
  const navigate = useNavigate();
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

    dispatch(
      loginUser({
        email: login.email,
        password: login.contrasena,
      }),
    );
    setLogin({
      email: "",
      contrasena: "",
    });
  };

  const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        nombre: register.nombre,
        apellido: register.apellido,
        email: register.email,
        password: register.contrasena,
        role: register.role,
      }),
    );
    setRegister({
      nombre: "",
      apellido: "",
      email: "",
      contrasena: "",
      role: "",
    });
  };

  useEffect(() => {
    if (!token || !role) return;

    const routes: Record<string, string> = {
      ADMIN: "/panelAdmin",
      PROFESIONAL: "/miPerfil",
      PACIENTE: "/",
    };

    navigate(routes[role]);
  }, [token, role, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }
  return (
    <div className="contenedorForm">
      {view === false ? (
        <form onSubmit={handleSubmitLogin} className="contenedorLogin">
          <label htmlFor="usuario">Email</label>
          <input
            onChange={handleLoginChange}
            type="text"
            value={login.email}
            name="email"
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
          <Link to="/forgot-password">Haz olvidado tu contrasena?</Link>
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

      {error && <p style={{ color: "red" }}>{error.toString()}</p>}
      {token && <p style={{ color: "green" }}>Login exitoso</p>}
    </div>
  );
}
