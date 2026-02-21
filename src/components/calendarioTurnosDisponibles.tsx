import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import {
  crearTurno,
  TurnosProfesionalDisponible,
} from "../Store/Turnos/Turnos.thunks";

interface Props {
  idProfesional: string;
  onClose: () => void;
}

export function CalendarioTurnos({ idProfesional, onClose }: Props) {
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
      toast.success("Turno creado con éxito!");
      setTimeout(() => onClose(), 3000);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Error al crear el turno");
    }
  };

  const esFinDeSemana = (fecha: Date) => {
    const day = fecha.getDay();
    return day === 0 || day === 6;
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

        {fechaSelect && esFinDeSemana(fechaSelect) && (
          <p className="calendarWarning">No hay atención los fines de semana</p>
        )}

        {fechaSelect && !esFinDeSemana(fechaSelect) && (
          <>
            <h3 className="horariosTitle">Horarios disponibles</h3>

            {turnosDisponibles.length === 0 ? (
              <p className="calendarMessage">No hay horarios disponibles</p>
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
          className="crearTurnoBtn"
          onClick={() => {
            if (!horaSelect || !fechaSelect) return;
            handleCrearTurno(horaSelect, fechaSelect, idProfesional);
          }}
        >
          Confirmar Turno
        </button>
        <button className="crearTurnoBtn" onClick={onClose}>
          Cancelar
        </button>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
