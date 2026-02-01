import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import {
  crearTurno,
  TurnosProfesionalDisponible,
} from "../Store/Turnos/Turnos.thunks";

interface Props {
  idProfesional: string;
}

export function CalendarioTurnos({ idProfesional }: Props) {
  const dispatch = useAppDispatch();
  const { turnosDisponibles, loading, error } = useAppSelector(
    (state) => state.turnos,
  );

  const [fechaSelect, setFechaSelect] = useState<Date | null>(null);
  const [horaSelect, setHoraSelect] = useState<string | null>(null);

  const handleFechaChange = (date: Date) => {
    setFechaSelect(date);
    setHoraSelect(null);

    const fechaFormateada = date
      .toISOString()
      .split("T")[0]
      .replaceAll("/", "-");

    dispatch(
      TurnosProfesionalDisponible({
        profesionalId: idProfesional,
        fecha: fechaFormateada,
      }),
    );
  };

  const handleCrearTurno = async (
    horaSelect: string,
    fechaSelect: Date,
    idProfesional: string,
  ) => {
    if (!horaSelect || !fechaSelect) return;
    const fechaFormateada = fechaSelect.toISOString().split("T")[0];

    try {
      await dispatch(
        crearTurno({
          profesionalId: idProfesional,
          fecha: fechaFormateada,
          hora: horaSelect,
        }),
      ).unwrap();
      dispatch(
        TurnosProfesionalDisponible({
          profesionalId: idProfesional,
          fecha: fechaFormateada,
        }),
      );

      setHoraSelect(null);
      alert("Turno creado con éxito");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Error al crear el turno");
    }
  };

  const esFinDeSemana = (fecha: Date) => {
    const day = fecha.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="calendarioTurnos">
      <Calendar
        onChange={(value) => handleFechaChange(value as Date)}
        value={fechaSelect}
        minDate={new Date()}
      />

      {loading && <p>Cargando horarios...</p>}
      {error && <p className="error">{error}</p>}

      {fechaSelect && esFinDeSemana(fechaSelect) && (
        <p className="noAtencion">No hay atención los fines de semana</p>
      )}

      {fechaSelect && !esFinDeSemana(fechaSelect) && (
        <>
          <h3>Horarios disponibles</h3>

          {turnosDisponibles.length === 0 ? (
            <p>No hay horarios disponibles</p>
          ) : (
            <div className="horariosContainer">
              {turnosDisponibles.map((hora) => (
                <button
                  key={hora}
                  className={`horaBtn ${hora === horaSelect ? "activa" : ""}`}
                  onClick={() => setHoraSelect(hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => {
          if (!horaSelect || !fechaSelect) return;
          handleCrearTurno(horaSelect, fechaSelect, idProfesional);
        }}
      >
        Crear turno
      </button>
    </div>
  );
}
