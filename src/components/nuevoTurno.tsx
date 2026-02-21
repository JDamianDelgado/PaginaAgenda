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
    <div className="nuevo-turno-container">
      <h1 className="nuevo-turno-title">Sacar turno</h1>

      {loading && <p className="loading-text">Cargando...</p>}
      {error && <p className="error-text">{error}</p>}

      {profesionales.length === 0 ? (
        <p className="no-profesionales">No hay profesionales disponibles</p>
      ) : (
        <div className="profesionales-list">
          {profesionales.map((prof) => (
            <div key={prof.idProfesional} className="profesional-card">
              <img
                src={
                  prof.imagenUrl ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt={prof.idProfesional}
                className="profesional-avatar"
              />
              <div className="profesional-info">
                <h2 className="profesional-name">
                  {prof.UserProfesional.nombre} {prof.UserProfesional.apellido}
                </h2>
                <h3 className="profesional-especialidad">
                  {prof.especialidad}
                </h3>
                <p className="profesional-descripcion">{prof.descripcion}</p>
              </div>
              <button
                className="profesional-btn"
                onClick={() => setProfesionalSeleccionado(prof.idProfesional)}
              >
                Sacar Turno
              </button>
            </div>
          ))}
        </div>
      )}

      {profesionalSeleccionado && (
        <CalendarioTurnos
          idProfesional={profesionalSeleccionado}
          onClose={() => setProfesionalSeleccionado("")}
        />
      )}
    </div>
  );
}
