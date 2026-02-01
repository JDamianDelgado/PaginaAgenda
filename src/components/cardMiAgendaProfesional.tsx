interface Props {
  turno: {
    idTurno: string;
    fecha: string;
    hora: string;
    estado: string;
    user: {
      nombre: string;
      apellido: string;
      email: string;
    };
  };
}

export function CardTurnoProfesional({ turno }: Props) {
  return (
    <div className={`card-turno estado-${turno.estado.toLowerCase()}`}>
      <div className="card-header">
        <h3>
          {turno.user.nombre} {turno.user.apellido}
        </h3>
        <h4>email: {turno.user.email}</h4>
        <span className={`estado ${turno.estado.toLowerCase()}`}>
          {turno.estado}
        </span>
      </div>

      <div className="card-body">
        <p>
          <strong>📅 Fecha:</strong> {turno.fecha}
        </p>
        <p>
          <strong>⏰ Hora:</strong> {turno.hora}
        </p>
      </div>
    </div>
  );
}
