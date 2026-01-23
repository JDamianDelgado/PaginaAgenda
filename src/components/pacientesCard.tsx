import "../styles/PacienteCard.css";

interface Nota {
  fecha: string;
  texto: string;
}

interface Props {
  paciente: {
    nombre: string;
    apellido: string;
    imagenUrl: string;
    alDiaConPago: boolean;
    sesionesRealizadas: number;
    notas: Nota[];
  };
}

export function PacienteCard({ paciente }: Props) {
  return (
    <div className="PacienteCard">
      <img
        src={paciente.imagenUrl}
        alt={`${paciente.nombre} ${paciente.apellido}`}
        className="PacienteAvatar"
      />

      <div className="PacienteInfo">
        <h3>
          {paciente.nombre} {paciente.apellido}
        </h3>

        <span
          className={`PacientePago ${
            paciente.alDiaConPago ? "ok" : "pendiente"
          }`}
        >
          {paciente.alDiaConPago ? "Pago al día" : "Pago pendiente"}
        </span>

        <p>Sesiones realizadas: {paciente.sesionesRealizadas}</p>

        <div className="PacienteNotas">
          <strong>Notas clínicas:</strong>
          {paciente.notas.map((nota, index) => (
            <div key={index} className="PacienteNota">
              <span>{nota.fecha}</span>
              <p>{nota.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
