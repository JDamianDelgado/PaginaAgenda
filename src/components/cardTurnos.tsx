import type { InterfaceTurno } from "../Store/interfaces/interfaceTurnos";
interface Props {
  turno: InterfaceTurno;
}
import "../styles/cardComponent.css";
interface Props {
  turno: InterfaceTurno;
  onCancelar: (idTurno: string) => void;
}

export function CardComponente({ turno, onCancelar }: Props) {
  return (
    <div className="CardTurno">
      <h3>{turno.fecha}</h3>
      <p>Hora: {turno.hora}</p>

      {turno.profesional && (
        <p>
          Profesional: {turno.profesional.nombre} {turno.profesional.apellido}
        </p>
      )}

      <small className={`estado ${turno.estado}`}>{turno.estado}</small>

      {turno.estado === "RESERVADO" && (
        <button onClick={() => onCancelar(turno.idTurno)}>
          Cancelar turno
        </button>
      )}
    </div>
  );
}
