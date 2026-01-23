import { useState } from "react";
import { useAppDispatch } from "../../Store/hooks.Redux";
import { creatPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";
import "../../styles/panelProfesional.css";
interface Props {
  setViewForm: (value: boolean) => void;
}

export function FormPerfilProfesional({ setViewForm }: Props) {
  const dispatch = useAppDispatch();

  const [dataPerfil, setDataPerfil] = useState({
    imagenUrl: "",
    especialidad: "",
    descripcion: "",
    activo: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataPerfil({ ...dataPerfil, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dispatch(creatPerfilProfesional(dataPerfil));
    setViewForm(false);
  }

  return (
    <div className="perfil-profesional-box">
      <h2>Crear perfil profesional</h2>

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

        <button type="submit">Guardar perfil</button>
      </form>
    </div>
  );
}
