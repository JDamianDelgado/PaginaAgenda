import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/nuevoTurnoPaciente.css";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";

import { allProfesionales } from "../Store/Profesionales/profesional.Thunks";
import { CalendarioTurnos } from "./calendarioTurnosDisponibles";

export function NuevoTurno() {
  const dispatch = useAppDispatch();
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState("");
  const { profesionales, loading, error } = useAppSelector(
    (state) => state.profesionales,
  );
  useEffect(() => {
    dispatch(allProfesionales());
  }, [dispatch]);
  return (
    <div className="nuevoTurnoContainer">
      <h1>Sacar turno</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {profesionales.length === 0 ? (
        <p>No hay profesionales Disponibles</p>
      ) : (
        profesionales.map((prof) => (
          <div key={prof.idProfesional}>
            <h2>
              {prof.UserProfesional.nombre} {prof.UserProfesional.apellido}
            </h2>
            <img
              src={
                prof.imagenUrl ||
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt={prof.idProfesional}
              width={100}
            />
            <h3>{prof.especialidad}</h3>
            <p>{prof.descripcion}</p>

            <button
              onClick={() => setProfesionalSeleccionado(prof.idProfesional)}
            >
              Sacar Turno
            </button>
          </div>
        ))
      )}
      {profesionalSeleccionado && (
        <CalendarioTurnos idProfesional={profesionalSeleccionado} />
      )}

      {/* {viewHorarios && (
        <>
          <p>Elegí una fecha y horario disponible</p>

          <div className="calendarContainer">
            <Calendar
              onChange={(value: Value) => setFecha(value as Date)}
              value={fecha}
              minDate={new Date()}
            />
          </div>

          {fecha && !esFinDeSemana(fecha) && (
            <>
              <h3>Horarios disponibles</h3>
              <div className="horariosContainer">
                {horariosDisponibles.map((hora) => (
                  <button
                    key={hora}
                    className={`horaBtn ${
                      hora === horaSeleccionada ? "activa" : ""
                    }`}
                    onClick={() => setHoraSeleccionada(hora)}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </>
          )}

          {fecha && esFinDeSemana(fecha) && (
            <p className="noAtencion">No hay atención los fines de semana</p>
          )}

          {fecha && horaSeleccionada && (
            <button className="reservarBtn" onClick={() => reservarTurno()}>
              Reservar turno
            </button>
          )}
        </>
      )} */}
    </div>
  );
}
