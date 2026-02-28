import { useState } from "react";
import type { interfaceMisHorariosProfesional } from "../../Store/interfaces/interfaceHorarios";
import {
  createHorario,
  editarHorario,
  eliminarHorario,
} from "../../Store/HorariosProfesional/HorarioProfesional.Thunks";
import { useAppDispatch } from "../../Store/hooks.Redux";
import { miPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";

interface Props {
  misHorarios: interfaceMisHorariosProfesional[];
}

export function MisHorariosProfesional({ misHorarios }: Props) {
  const dispatch = useAppDispatch();

  const [crearHorario, setCrearHorario] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedHorario, setEditedHorario] =
    useState<interfaceMisHorariosProfesional | null>(null);

  const handleEdit = (horario: interfaceMisHorariosProfesional) => {
    setEditingId(horario.idHorario);
    setEditedHorario({ ...horario });
  };

  const deleteHorario = async (id: string) => {
    try {
      await dispatch(eliminarHorario({ idHorario: id })).unwrap();
      await dispatch(miPerfilProfesional());
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
      if (editingId) {
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
      } else {
        await dispatch(
          createHorario({
            dia: editedHorario.dia,
            horaInicio: editedHorario.horaInicio,
            horaFin: editedHorario.horaFin,
            duracionTurno: editedHorario.duracionTurno,
            activo: editedHorario.activo,
          }),
        ).unwrap();

        alert("Horario creado correctamente");
      }
      await dispatch(miPerfilProfesional());
      setEditingId(null);
      setEditedHorario(null);
      setCrearHorario(null);
    } catch (error) {
      console.error(error);
      alert("Error al guardar horario");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedHorario(null);
    setCrearHorario(null);
  };

  const DIAS_SEMANA = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ];

  return (
    <div className="horarios-container">
      <ul className="lista-horarios">
        {DIAS_SEMANA.map((dia) => {
          const horariosDelDia = misHorarios.filter(
            (horario) => horario.dia === dia,
          );

          return (
            <li key={dia} className="dia-bloque">
              <h3 className="dia-titulo">{dia}</h3>

              {horariosDelDia.length === 0 && (
                <>
                  <p className="sin-horario">
                    Estado: <span className="estado inactivo">Inactivo</span>
                  </p>
                  <p className="sin-horario">Sin franja horaria creada</p>

                  <button
                    className="btn crear-horario"
                    onClick={() => {
                      if (crearHorario === dia) {
                        handleCancel();
                      } else {
                        setCrearHorario(dia);
                        setEditingId(null);
                        setEditedHorario({
                          idHorario: "",
                          dia: dia,
                          horaInicio: "",
                          horaFin: "",
                          duracionTurno: 30,
                          activo: false,
                        });
                      }
                    }}
                  >
                    {crearHorario === dia ? "Cancelar" : "Crear horario"}{" "}
                  </button>
                </>
              )}

              {crearHorario === dia && editedHorario && (
                <div className="horario-edit">
                  <input
                    type="time"
                    placeholder="Hora inicio"
                    value={editedHorario.horaInicio}
                    onChange={(e) => handleChange("horaInicio", e.target.value)}
                  />

                  <input
                    type="time"
                    placeholder="Hora fin"
                    value={editedHorario.horaFin}
                    onChange={(e) => handleChange("horaFin", e.target.value)}
                  />

                  <input
                    type="number"
                    value={editedHorario.duracionTurno}
                    onChange={(e) =>
                      handleChange("duracionTurno", Number(e.target.value))
                    }
                  />

                  <label className="checkbox-label">
                    {editedHorario.activo ? "Activo" : "Inactivo"}
                    <input
                      type="checkbox"
                      checked={editedHorario.activo}
                      onChange={(e) => handleChange("activo", e.target.checked)}
                    />
                  </label>

                  <button className="btn guardar" onClick={handleSave}>
                    Guardar
                  </button>
                </div>
              )}

              {horariosDelDia.map((horario) => (
                <div key={horario.idHorario} className="horario-item">
                  {editingId === horario.idHorario && editedHorario ? (
                    <div className="horario-edit">
                      <input
                        type="text"
                        value={editedHorario.horaInicio}
                        onChange={(e) =>
                          handleChange("horaInicio", e.target.value)
                        }
                      />

                      <input
                        type="text"
                        value={editedHorario.horaFin}
                        onChange={(e) =>
                          handleChange("horaFin", e.target.value)
                        }
                      />

                      <input
                        type="number"
                        value={editedHorario.duracionTurno}
                        onChange={(e) =>
                          handleChange("duracionTurno", Number(e.target.value))
                        }
                      />

                      <label className="checkbox-label">
                        {editedHorario.activo ? "Activo" : "Inactivo"}
                        <input
                          type="checkbox"
                          checked={editedHorario.activo}
                          onChange={(e) =>
                            handleChange("activo", e.target.checked)
                          }
                        />
                      </label>

                      <button className="btn guardar" onClick={handleSave}>
                        Guardar
                      </button>

                      <button
                        className="btn eliminar"
                        onClick={() => deleteHorario(horario.idHorario)}
                      >
                        Eliminar
                      </button>

                      <button className="btn cancelar" onClick={handleCancel}>
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="horario-view">
                      {horario.horaInicio} - {horario.horaFin} - Duracion:{" "}
                      {horario.duracionTurno}min
                      <span
                        className={
                          horario.activo ? "estado activo" : "estado inactivo"
                        }
                      >
                        {horario.activo ? "Activo" : "Inactivo"}
                      </span>
                      <button
                        className="btn editar"
                        onClick={() => handleEdit(horario)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
