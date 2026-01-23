import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import { useNavigate } from "react-router-dom";
import { ViewMoreUsers } from "../../components/viewMoreUsers";
import { deleteUser, allUsers } from "../../Store/Usuarios/usuarios.Thunks";
import "../../styles/panelAdmin.css";
export function PanelAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const dispatch = useAppDispatch();
  const { usuarios, loading, error } = useAppSelector(
    (state) => state.usuarios,
  );

  const pacientes = usuarios.filter((u) => u.role === "PACIENTE");
  const profesionales = usuarios.filter((u) => u.role === "PROFESIONAL");

  const deleteUsuario = (id: string, name: string) => {
    dispatch(deleteUser({ id }));
    if (error) {
      alert(`Error al eliminar el usuario: ${name}`);
    }
    alert("Usuario eliminado correctamente: " + name);
  };

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);
  if (!token) {
    navigate("/login");
    return <p>No autorizado. Por favor, inicie sesión.</p>;
  }
  return (
    <div className="PanelAdmin">
      <h1>Panel de Administración</h1>

      {loading && <p className="PanelAdminLoading">Cargando usuarios...</p>}
      {error && <p className="PanelAdminError">{error}</p>}

      <section>
        <h2>Pacientes</h2>
        <ul className="AdminList">
          {pacientes.map((user) => (
            <li className="AdminUserItem" key={user.idUser}>
              <span className="AdminUserInfo">
                {user.nombre} {user.apellido} - {user.email}
              </span>

              <div className="AdminActions">
                <button
                  className="AdminBtnEdit"
                  onClick={() => setSelectedUser(user)}
                >
                  Editar
                </button>
                <button
                  className="AdminBtnDelete"
                  onClick={() => deleteUsuario(user.idUser, user.nombre)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Profesionales</h2>
        <ul className="AdminList">
          {profesionales.map((user) => (
            <li className="AdminUserItem" key={user.idUser}>
              <span className="AdminUserInfo">
                {user.nombre} {user.apellido} - {user.email}
              </span>

              <div className="AdminActions">
                <button
                  className="AdminBtnEdit"
                  onClick={() => setSelectedUser(user)}
                >
                  Editar
                </button>
                <button
                  className="AdminBtnDelete"
                  onClick={() => deleteUsuario(user.idUser, user.nombre)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {selectedUser && (
        <>
          <ViewMoreUsers
            users={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
          <button
            className="AdminCloseBtn"
            onClick={() => setSelectedUser(null)}
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
}
