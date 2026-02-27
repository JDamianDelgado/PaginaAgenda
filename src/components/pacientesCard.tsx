import "../styles/PacienteCard.css";

interface Nota {
  fecha: string;
  texto: string;
}

interface TurnoData {
  fecha: string;
  hora: string;
  estado: string;
}

interface Props {
  paciente: {
    nombre: string;
    apellido: string;
    imagenUrl?: string;
    email?: string;
    alDiaConPago?: boolean;
    sesionesRealizadas?: number;
    notas?: Nota[];
  };
  turno?: TurnoData;
}

const formatFecha = (fecha: string) => {
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;

  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export function PacienteCard({ paciente, turno }: Props) {
  const avatarSrc =
    paciente.imagenUrl?.trim() ||
    "https://png.pngtree.com/png-clipart/20250820/original/pngtree-whatsapp-default-profile-photo-vector-png-image_22204331.png";

  return (
    <article className="PacienteCard">
      <img
        src={avatarSrc}
        alt={`${paciente.nombre} ${paciente.apellido}`}
        className="PacienteAvatar"
      />

      <div className="PacienteInfo">
        <div className="PacienteHeader">
          <h3>
            {paciente.nombre} {paciente.apellido}
          </h3>
          {turno?.estado && (
            <span
              className={`PacienteEstado estado-${turno.estado.toLowerCase()}`}
            >
              {turno.estado}
            </span>
          )}
        </div>

        {paciente.email && <p className="PacienteEmail">{paciente.email}</p>}

        {typeof paciente.alDiaConPago === "boolean" && (
          <span
            className={`PacientePago ${paciente.alDiaConPago ? "ok" : "pendiente"}`}
          >
            {paciente.alDiaConPago ? "Pago al dia" : "Pago pendiente"}
          </span>
        )}

        {(turno || typeof paciente.sesionesRealizadas === "number") && (
          <div className="PacienteMetaGrid">
            {turno?.fecha && (
              <div className="PacienteMetaItem">
                <span>Dia del turno</span>
                <p>{formatFecha(turno.fecha)}</p>
              </div>
            )}
            {turno?.hora && (
              <div className="PacienteMetaItem">
                <span>Hora</span>
                <p>{turno.hora}</p>
              </div>
            )}
            {typeof paciente.sesionesRealizadas === "number" && (
              <div className="PacienteMetaItem">
                <span>Sesiones realizadas</span>
                <p>{paciente.sesionesRealizadas}</p>
              </div>
            )}
          </div>
        )}

        {paciente.notas && paciente.notas.length > 0 && (
          <div className="PacienteNotas">
            <strong>Notas clinicas:</strong>
            {paciente.notas.map((nota, index) => (
              <div key={index} className="PacienteNota">
                <span>{nota.fecha}</span>
                <p>{nota.texto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
