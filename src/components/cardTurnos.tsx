import type { InterfaceMisTurnos } from "../Store/interfaces/interfaceTurnos";
import "../styles/cardComponent.css";

interface Props {
  turno: InterfaceMisTurnos;
  handleCancelarTurno: (idTurno: string) => Promise<void>;
  handleEliminarTurno: (idTurno: string) => Promise<void>;
  handleAbrirChat?: (idTurno: string) => void;
  cancelandoTurnoId: string | null;
  eliminandoTurnoId: string | null;
}

export function CardComponente({
  turno,
  handleCancelarTurno,
  handleEliminarTurno,
  handleAbrirChat,
  cancelandoTurnoId,
  eliminandoTurnoId,
}: Props) {
  const cancelandoEsteTurno = cancelandoTurnoId === turno.idTurno;
  const eliminandoEsteTurno = eliminandoTurnoId === turno.idTurno;
  const deshabilitarAcciones = cancelandoEsteTurno || eliminandoEsteTurno;

  const fechaFormateada = (fecha: string) => {
    const [year, month, day] = fecha.split("-");

    const meses: Record<string, string> = {
      "01": "enero",
      "02": "febrero",
      "03": "marzo",
      "04": "abril",
      "05": "mayo",
      "06": "junio",
      "07": "julio",
      "08": "agosto",
      "09": "septiembre",
      "10": "octubre",
      "11": "noviembre",
      "12": "diciembre",
    };

    return `${day} de ${meses[month]} de ${year}`;
  };

  return (
    <div className="CardTurno">
      <h2>
        {turno.profesional.UserProfesional.nombre}
        <br />
        {turno.profesional.UserProfesional.apellido}
      </h2>

      <img
        src={turno.profesional.imagenUrl}
        alt={turno.profesional.idProfesional}
        width={100}
      />

      <h3>{fechaFormateada(turno.fecha)}</h3>
      <p>Hora: {turno.hora}</p>

      {/* RESERVADO */}
      {turno.estado === "RESERVADO" && (
        <button
          disabled={deshabilitarAcciones}
          onClick={() => handleCancelarTurno(turno.idTurno)}
        >
          {cancelandoEsteTurno ? "Cancelando..." : "Cancelar turno"}
        </button>
      )}

      {/* CANCELADO */}
      {turno.estado === "CANCELADO" && (
        <button
          disabled={deshabilitarAcciones}
          onClick={() => handleEliminarTurno(turno.idTurno)}
        >
          {eliminandoEsteTurno ? "Eliminando..." : "Eliminar turno"}
        </button>
      )}

      {/* COMPLETADO */}
      {turno.estado === "COMPLETADO" && (
        <p className="estado completado">Turno completado</p>
      )}

      {turno.estado !== "CANCELADO" && handleAbrirChat && (
        <button
          className="CardTurnoChatBtn"
          type="button"
          onClick={() => handleAbrirChat(turno.idTurno)}
        >
          Abrir chat
        </button>
      )}
    </div>
  );
}
