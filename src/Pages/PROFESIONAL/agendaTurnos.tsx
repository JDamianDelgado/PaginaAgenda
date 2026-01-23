import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { turnosProfesionalMock } from "../../Mock/agendaTurnos.Mock";
import type { InterfaceTurno } from "../../Store/interfaces/interfaceTurnos";

export function AgendaTurnos() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [turnoCancelar, setTurnoCancelar] = useState<InterfaceTurno | null>(
    null,
  );
  const [mensaje, setMensaje] = useState("");
  function formatFechaLocal(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const fechaISO = fechaSeleccionada
    ? formatFechaLocal(fechaSeleccionada)
    : null;

  const turnosDelDia = useMemo(() => {
    if (!fechaISO) return [];
    return turnosProfesionalMock
      .filter((t) => t.fecha === fechaISO)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }, [fechaISO]);

  function cancelarTurno() {
    if (!turnoCancelar) return;

    console.log("Cancelar turno:", {
      turno: turnoCancelar,
      mensaje,
    });

    alert("Turno cancelado y email enviado 📩");

    setTurnoCancelar(null);
    setMensaje("");
  }

  return (
    <div className="AgendaTurnos">
      <h1>Agenda de turnos</h1>

      <Calendar
        value={fechaSeleccionada}
        onChange={(value) => setFechaSeleccionada(value as Date)}
      />

      {fechaISO && (
        <>
          <h2>Turnos del {fechaSeleccionada?.toLocaleDateString("es-AR")}</h2>

          <div className="TurnosLista">
            {turnosDelDia.length === 0 && <p>No hay turnos</p>}

            {turnosDelDia.map((turno) => (
              <div key={turno.idTurno} className="TurnoCard">
                <div className="TurnoInfo">
                  <p>
                    <strong>Hora:</strong> {turno.hora}
                  </p>
                  <p className={`estado ${turno.estado}`}>{turno.estado}</p>
                </div>

                {turno.estado === "RESERVADO" && (
                  <button onClick={() => setTurnoCancelar(turno)}>
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {turnoCancelar && (
        <div className="ModalOverlay">
          <div className="Modal">
            <h3>Cancelar turno</h3>
            <p>
              Turno del {turnoCancelar.fecha} a las {turnoCancelar.hora}
            </p>

            <textarea
              placeholder="Mensaje para el paciente"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />

            <div className="ModalActions">
              <button className="confirm" onClick={cancelarTurno}>
                Enviar y cancelar
              </button>
              <button className="close" onClick={() => setTurnoCancelar(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
