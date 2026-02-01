import "../../styles/panelProfesional.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import {
  editPerfilProfesional,
  miPerfilProfesional,
} from "../../Store/Profesionales/profesional.Thunks";
import "../../styles/panelProfesional.css";

interface Props {
  setViewForm: (value: boolean) => void;
}

export function UpdateFormPerfilProfesional({ setViewForm }: Props) {
  const dispatch = useAppDispatch();
  const profesional = useAppSelector(
    (state) => state.profesionales.usuario?.profesional,
  );

  const [dataPerfil, setDataPerfil] = useState({
    imagenUrl: profesional?.imagenUrl || "",
    especialidad: profesional?.especialidad || "",
    descripcion: profesional?.descripcion || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataPerfil({ ...dataPerfil, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dispatch(editPerfilProfesional(dataPerfil));
    setViewForm(false);
    dispatch(miPerfilProfesional());
  }

  return (
    <div className="perfil-profesional-box">
      <h2>Editar perfil profesional</h2>

      <form className="perfil-form" onSubmit={handleSubmit}>
        <label>Imagen de perfil (URL)</label>
        <input
          name="imagenUrl"
          value={dataPerfil.imagenUrl}
          onChange={handleChange}
        />

        <label>Especialidad</label>
        <input
          name="especialidad"
          value={dataPerfil.especialidad}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <input
          name="descripcion"
          value={dataPerfil.descripcion}
          onChange={handleChange}
        />

        <button type="submit">Actualizar perfil</button>
      </form>
    </div>
  );
}
