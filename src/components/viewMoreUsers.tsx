import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { editUser } from "../Store/Usuarios/usuarios.Thunks";

export function ViewMoreUsers({
  users,
  onClose,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);
  const { error } = useAppSelector((state) => state.usuarios);

  const [editMode, setEditMode] = useState(false);

  const [editData, setEditData] = useState({
    nombre: users.nombre,
    apellido: users.apellido,
    email: users.email,
    role: users.role,
  });

  if (!token) return <p>No autorizado. Inicie sesión.</p>;
  if (role !== "ADMIN") return <p>No tienes permisos.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const editarUsuario = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      editUser({
        id: users.idUser,
        userData: editData,
      })
    );

    setEditMode(false);
    onClose();
  };

  return (
    <div className="cardUsuario">
      <h2>
        {users.nombre} {users.apellido}
      </h2>

      {!editMode ? (
        <>
          <p>Nombre: {users.nombre}</p>
          <p>Apellido: {users.apellido}</p>

          <p>Email: {users.email}</p>
          <p>Rol: {users.role}</p>
          <p>
            Registrado : {new Date(users.createdAt).toLocaleDateString("es-AR")}
          </p>
          <button onClick={() => setEditMode(true)}>Editar</button>
        </>
      ) : (
        <form onSubmit={editarUsuario}>
          <input
            name="nombre"
            value={editData.nombre}
            onChange={handleChange}
          />

          <input
            name="apellido"
            value={editData.apellido}
            onChange={handleChange}
          />

          <input name="email" value={editData.email} onChange={handleChange} />

          <select
            name="role"
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
          >
            <option value="PACIENTE">PACIENTE</option>
            <option value="PROFESIONAL">PROFESIONAL</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancelar
          </button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
