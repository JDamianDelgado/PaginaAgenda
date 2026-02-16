import { useAppSelector } from "../Store/hooks.Redux";
import type { InterfaceMisTurnos } from "../Store/interfaces/interfaceTurnos";
import "../styles/cardComponent.css";

interface Props {
  turno: InterfaceMisTurnos;
  handleCancelarTurno: (idTurno: string) => void;
  handleEliminarTurno: (idTurno: string) => void;
}

export function CardComponente({
  turno,
  handleCancelarTurno,
  handleEliminarTurno,
}: Props) {
  const { loading } = useAppSelector((state) => state.turnos);

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
          disabled={loading}
          onClick={() => handleCancelarTurno(turno.idTurno)}
        >
          {loading ? "Cancelando..." : "Cancelar turno"}
        </button>
      )}

      {/* CANCELADO */}
      {turno.estado === "CANCELADO" && (
        <button
          disabled={loading}
          onClick={() => handleEliminarTurno(turno.idTurno)}
        >
          {loading ? "Eliminando..." : "Eliminar turno"}
        </button>
      )}

      {/* COMPLETADO */}
      {turno.estado === "COMPLETADO" && (
        <p className="estado completado">Turno completado</p>
      )}
    </div>
  );
}
