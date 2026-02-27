import { useState } from "react";
import { useAppDispatch } from "../../Store/hooks.Redux";
import {
  creatPerfilProfesional,
  miPerfilProfesional,
} from "../../Store/Profesionales/profesional.Thunks";
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setDataPerfil({ ...dataPerfil, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(creatPerfilProfesional(dataPerfil));
    if (creatPerfilProfesional.fulfilled.match(result)) {
      await dispatch(miPerfilProfesional());
      setViewForm(false);
    }
  }

  return (
    <div className="perfil-profesional-box">
      <h2>Crear perfil profesional</h2>

      <form className="perfil-form" onSubmit={handleSubmit}>
        <label>Imagen de perfil (URL)</label>
        <input
          name="imagenUrl"
          type="url"
          value={dataPerfil.imagenUrl}
          onChange={handleChange}
          placeholder="https://..."
          required
        />

        <label>Especialidad</label>
        <input
          name="especialidad"
          value={dataPerfil.especialidad}
          onChange={handleChange}
          placeholder="Psicologia clinica"
          required
        />

        <label>Descripcion</label>
        <textarea
          name="descripcion"
          value={dataPerfil.descripcion}
          onChange={handleChange}
          rows={4}
          placeholder="Describe tu enfoque terapeutico"
          required
        />

        <div className="perfil-form-actions">
          <button type="submit">Guardar perfil</button>
          <button type="button" onClick={() => setViewForm(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
