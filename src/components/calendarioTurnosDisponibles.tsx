import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import {
  crearTurno,
  TurnosProfesionalDisponible,
} from "../Store/Turnos/Turnos.thunks";
import { clearTurnosDisponibles } from "../Store/Turnos/Turnos.Slice";

interface Props {
  idProfesional: string;
  onClose: () => void;
}

export function CalendarioTurnos({ idProfesional, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { turnosDisponibles, loading, error } = useAppSelector(
    (state) => state.turnos,
  );

  const [fechaSelect, setFechaSelect] = useState<Date>(() => new Date());
  const [horaSelect, setHoraSelect] = useState<string | null>(null);

  const actualizarTurnos = (fecha: Date) => {
    const fechaFormateada = fecha.toISOString().split("T")[0];
    dispatch(
      TurnosProfesionalDisponible({
        profesionalId: idProfesional,
        fecha: fechaFormateada,
      }),
    );
  };

  useEffect(() => {
    const fechaFormateada = new Date().toISOString().split("T")[0];
    dispatch(clearTurnosDisponibles());
    dispatch(
      TurnosProfesionalDisponible({
        profesionalId: idProfesional,
        fecha: fechaFormateada,
      }),
    );
    return () => {
      dispatch(clearTurnosDisponibles());
    };
  }, [dispatch, idProfesional]);

  const handleFechaChange = (date: Date) => {
    setFechaSelect(date);
    setHoraSelect(null);
    actualizarTurnos(date);
  };

  const handleCrearTurno = async (
    hora: string,
    fecha: Date,
    profesionalId: string,
  ) => {
    if (!hora || !fecha) return;

    const fechaFormateada = fecha.toISOString().split("T")[0];

    try {
      await dispatch(
        crearTurno({
          profesionalId,
          fecha: fechaFormateada,
          hora,
        }),
      ).unwrap();

      alert("Turno creado con exito");
      actualizarTurnos(fecha);
      setHoraSelect(null);
      setTimeout(() => onClose(), 3000);
    } catch (err) {
      alert("Error al crear el turno");
      console.error(err);
    }
  };

  const handleClose = () => {
    dispatch(clearTurnosDisponibles());
    onClose();
  };

  return (
    <div className="calendarModal">
      <div className="calendarCard">
        <h2 className="calendarTitle">Seleccionar Turno</h2>

        <Calendar
          className="calendarComponent"
          onChange={(value) => handleFechaChange(value as Date)}
          value={fechaSelect}
          minDate={new Date()}
        />

        {loading && <p className="calendarMessage">Cargando horarios...</p>}
        {error && <p className="calendarError">{error}</p>}

        <h3 className="horariosTitle">Horarios disponibles</h3>

        {turnosDisponibles.length === 0 && !loading ? (
          <p className="calendarMessage">
            Este profesional no tiene turnos asignados para este dia.
          </p>
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

        <button
          className="crearTurnoBtn"
          onClick={() => {
            if (!horaSelect || !fechaSelect) return;
            handleCrearTurno(horaSelect, fechaSelect, idProfesional);
          }}
          disabled={!horaSelect || loading}
        >
          Confirmar Turno
        </button>
        <button className="crearTurnoBtn" onClick={handleClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
