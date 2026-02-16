import { useNavigate } from "react-router-dom";
import { CardComponente } from "../components/cardTurnos";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { useEffect } from "react";
import "../styles/MisTurnos.css";
import {
  cancelarTurno,
  eliminarTurno,
  misTurnosPaciente,
} from "../Store/Turnos/Turnos.thunks";

export function MisTurnos() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, misTurnos } = useAppSelector((state) => state.turnos);

  useEffect(() => {
    dispatch(misTurnosPaciente());
  }, [dispatch]);

  const handleCancelarTurno = async (idTurno: string) => {
    await dispatch(cancelarTurno({ idTurno }));
    alert("Turno cancelado");
    dispatch(misTurnosPaciente());
  };

  const handleEliminarTurno = async (idTurno: string) => {
    await dispatch(eliminarTurno({ idTurno }));
    alert("Turno eliminado correctamente");
    dispatch(misTurnosPaciente());
  };

  const hoy = new Date();

  const reservados = misTurnos.filter((t) => {
    const fechaTurno = new Date(t.fecha);
    return t.estado === "RESERVADO" && fechaTurno >= hoy;
  });

  const cancelados = misTurnos.filter((t) => t.estado === "CANCELADO");

  const completados = misTurnos.filter((t) => {
    const fechaTurno = new Date(t.fecha);
    return t.estado === "COMPLETADO" || fechaTurno < hoy;
  });

  return (
    <div className="MisTurnos">
      <h1>Mis turnos</h1>

      {loading && <p>Cargando turnos...</p>}
      {error && <p className="error">{error}</p>}

      {misTurnos.length === 0 && <div className="empty">No tenés turnos.</div>}

      <div className="MisTurnosLista">
        {/* RESERVADOS */}
        <h1>Reservados</h1>
        <div className="estadoTurno">
          {reservados.length === 0 ? (
            <p>No existen turnos</p>
          ) : (
            reservados.map((turno) => (
              <div key={turno.idTurno}>
                <CardComponente
                  turno={turno}
                  handleCancelarTurno={handleCancelarTurno}
                  handleEliminarTurno={handleEliminarTurno}
                />
              </div>
            ))
          )}
        </div>

        {/* CANCELADOS */}
        <h1>Cancelados</h1>
        <div className="estadoTurno">
          {cancelados.length === 0 ? (
            <p>No existen turnos</p>
          ) : (
            cancelados.map((turno) => (
              <div key={turno.idTurno}>
                <CardComponente
                  turno={turno}
                  handleCancelarTurno={handleCancelarTurno}
                  handleEliminarTurno={handleEliminarTurno}
                />
              </div>
            ))
          )}
        </div>

        {/* COMPLETADOS */}
        <h1>Completados</h1>
        <div className="estadoTurno">
          {completados.length === 0 ? (
            <p>No existen turnos</p>
          ) : (
            completados.map((turno) => (
              <div key={turno.idTurno}>
                <CardComponente
                  turno={turno}
                  handleCancelarTurno={handleCancelarTurno}
                  handleEliminarTurno={handleEliminarTurno}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <button className="BtnNuevoTurno" onClick={() => navigate("/nuevoTurno")}>
        Sacar turno
      </button>
    </div>
  );
}
