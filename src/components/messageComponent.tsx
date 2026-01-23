import "../styles/messageCard.css";

interface Props {
  mensaje: {
    paciente: {
      nombre: string;
      apellido: string;
      imagenUrl: string;
    };
    mensaje: string;
    fecha: string;
  };
}

export function MessageCard({ mensaje }: Props) {
  return (
    <div className="MessageCard">
      <img
        src={mensaje.paciente.imagenUrl}
        alt={`${mensaje.paciente.nombre} ${mensaje.paciente.apellido}`}
        className="MessageCardAvatar"
      />

      <div className="MessageCardContent">
        <div className="MessageCardHeader">
          <h4>
            {mensaje.paciente.nombre} {mensaje.paciente.apellido}
          </h4>
          <span>{mensaje.fecha}</span>
        </div>

        <p className="MessageCardText">{mensaje.mensaje}</p>
      </div>
    </div>
  );
}
