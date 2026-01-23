import { useEffect } from "react";
import { miUsuario } from "../Store/Usuarios/usuarios.Thunks";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import "../styles/miCuenta.css";
export function MiCuenta() {
  const dispatch = useAppDispatch();
  const { idUser } = useAppSelector((state) => state.auth);
  const { usuarioActual, loading, error } = useAppSelector(
    (state) => state.usuarios,
  );

  useEffect(() => {
    if (idUser) {
      dispatch(miUsuario({ id: idUser }));
    }
  }, [dispatch, idUser]);

  return (
    <div className="MiCuenta">
      <h1>Mi cuenta</h1>

      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {usuarioActual === null && <p>Error en la base de datos</p>}

      {usuarioActual && (
        <div className="MiCuentaCard">
          <div className="MiCuentaItem">
            <span className="MiCuentaLabel">Nombre</span>
            <span className="MiCuentaValue">{usuarioActual.nombre}</span>
          </div>

          <div className="MiCuentaItem">
            <span className="MiCuentaLabel">Apellido</span>
            <span className="MiCuentaValue">{usuarioActual.apellido}</span>
          </div>

          <div className="MiCuentaItem">
            <span className="MiCuentaLabel">Email</span>
            <span className="MiCuentaValue">{usuarioActual.email}</span>
          </div>

          <span className="MiCuentaRole">{usuarioActual.role}</span>
        </div>
      )}
    </div>
  );
}
