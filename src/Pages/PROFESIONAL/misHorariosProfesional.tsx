import { useState } from "react";
import type { interfaceMisHorariosProfesional } from "../../Store/interfaces/interfaceHorarios";
import {
  editarHorario,
  eliminarHorario,
} from "../../Store/HorariosProfesional/HorarioProfesional.Thunks";
import { useAppDispatch } from "../../Store/hooks.Redux";

interface Props {
  misHorarios: interfaceMisHorariosProfesional[];
}

export function MisHorariosProfesional({ misHorarios }: Props) {
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);

  const [editedHorario, setEditedHorario] =
    useState<interfaceMisHorariosProfesional | null>(null);

  const handleEdit = (horario: interfaceMisHorariosProfesional) => {
    setEditingId(horario.idHorario);
    setEditedHorario({ ...horario });
  };

  const deleteHorario = async (editingId: string) => {
    try {
      await dispatch(eliminarHorario({ idHorario: editingId })).unwrap();
      alert("Horario eliminado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar horario");
    }
  };
  const handleChange = (
    field: "dia" | "horaInicio" | "horaFin" | "duracionTurno" | "activo",
    value: string | number | boolean,
  ) => {
    if (!editedHorario) return;
    setEditedHorario({
      ...editedHorario,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (!editedHorario) return;

    try {
      await dispatch(
        editarHorario({
          dataHorario: {
            idHorario: editedHorario.idHorario,
            dia: editedHorario.dia,
            horaInicio: editedHorario.horaInicio,
            horaFin: editedHorario.horaFin,
            duracionTurno: editedHorario.duracionTurno,
            activo: editedHorario.activo,
          },
        }),
      ).unwrap();

      alert("Horario actualizado correctamente");

      setEditingId(null);
      setEditedHorario(null);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar horario");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedHorario(null);
  };

  return (
    <div>
      {misHorarios.length === 0 && <p>Crea tus horarios profesionales</p>}

      <ul>
        {misHorarios.map((horario) => (
          <li key={horario.idHorario} style={{ marginBottom: "1rem" }}>
            {editingId === horario.idHorario && editedHorario ? (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={editedHorario.dia}
                  onChange={(e) => handleChange("dia", e.target.value)}
                  placeholder="Día"
                />
                <input
                  type="text"
                  value={editedHorario.horaInicio}
                  onChange={(e) => handleChange("horaInicio", e.target.value)}
                  placeholder="Hora inicio"
                />
                <input
                  type="text"
                  value={editedHorario.horaFin}
                  onChange={(e) => handleChange("horaFin", e.target.value)}
                  placeholder="Hora fin"
                />
                <input
                  type="number"
                  value={editedHorario.duracionTurno}
                  onChange={(e) =>
                    handleChange("duracionTurno", Number(e.target.value))
                  }
                  placeholder="Duración"
                  style={{ width: "4rem" }}
                />
                <label>
                  {editedHorario.activo ? "Activo" : "Inactivo"}
                  <input
                    type="checkbox"
                    checked={editedHorario.activo}
                    onChange={(e) => handleChange("activo", e.target.checked)}
                  />
                </label>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={() => deleteHorario(horario.idHorario)}>
                  Eliminar
                </button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            ) : (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                {horario.dia} {horario.horaInicio} - {horario.horaFin} -{" "}
                {horario.activo ? "Activo" : "Inactivo"}
                <button onClick={() => handleEdit(horario)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
