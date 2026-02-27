import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { deleteUser, editUser } from "../Store/Usuarios/usuarios.Thunks";
import type { InterfaceUsuario } from "../Store/interfaces/interfaceUsers";

interface ViewMoreUsersProps {
  users: InterfaceUsuario;
  onClose: () => void;
}

export function ViewMoreUsers({ users, onClose }: ViewMoreUsersProps) {
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);
  const { error, loading } = useAppSelector((state) => state.usuarios);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    nombre: users.nombre,
    apellido: users.apellido,
    email: users.email,
    role: users.role ?? "PACIENTE",
  });

  if (!token) return <p>No autorizado. Inicie sesion.</p>;
  if (role !== "ADMIN") return <p>No tienes permisos.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const editarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        editUser({
          id: users.idUser,
          userData: editData,
        }),
      ).unwrap();
      setEditMode(false);
      onClose();
    } catch {
      // El error se refleja en el slice.
    }
  };

  const eliminarUsuario = async () => {
    const confirmado = window.confirm(
      `Estas seguro de eliminar a ${users.nombre} ${users.apellido}?`,
    );
    if (!confirmado) return;

    try {
      await dispatch(deleteUser({ id: users.idUser })).unwrap();
      onClose();
    } catch {
      // El error se refleja en el slice.
    }
  };

  return (
    <div className="AdminModalOverlay" onClick={onClose}>
      <div className="AdminModalCard" onClick={(e) => e.stopPropagation()}>
        <div className="AdminModalHeader">
          <h2>
            {users.nombre} {users.apellido}
          </h2>
          <button className="AdminModalClose" type="button" onClick={onClose}>
            X
          </button>
        </div>

        {!editMode ? (
          <div className="AdminModalBody">
            <p>
              <strong>Nombre:</strong> {users.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {users.apellido}
            </p>
            <p>
              <strong>Email:</strong> {users.email}
            </p>
            <p>
              <strong>Rol:</strong> {users.role}
            </p>
            {users.createdAt && (
              <p>
                <strong>Registrado:</strong>{" "}
                {new Date(users.createdAt).toLocaleDateString("es-AR")}
              </p>
            )}

            <div className="AdminModalActions">
              <button
                className="AdminBtnEdit"
                type="button"
                onClick={() => setEditMode(true)}
                disabled={loading}
              >
                Editar
              </button>
              <button
                className="AdminBtnDelete"
                type="button"
                onClick={eliminarUsuario}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Eliminar"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={editarUsuario} className="AdminModalForm">
            <input
              name="nombre"
              value={editData.nombre}
              onChange={handleChange}
              required
            />

            <input
              name="apellido"
              value={editData.apellido}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              value={editData.email}
              onChange={handleChange}
              required
              type="email"
            />

            <select
              name="role"
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
            >
              <option value="PACIENTE">PACIENTE</option>
              <option value="PROFESIONAL">PROFESIONAL</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="AdminModalActions">
              <button className="AdminBtnEdit" type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                className="AdminCloseBtn"
                type="button"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {error && <p className="PanelAdminError">{error}</p>}
      </div>
    </div>
  );
}
