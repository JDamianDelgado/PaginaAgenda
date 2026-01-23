import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/nuevoTurnoPaciente.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function NuevoTurno() {
  const [fecha, setFecha] = useState<Date | null>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [tipoReunion, setTipoReunion] = useState("");
  const [emails, setEmails] = useState<string[]>([""]);

  const horariosDisponibles = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const esFinDeSemana = (fecha: Date) => {
    const day = fecha.getDay();
    return day === 0 || day === 6;
  };

  //funcioton proisorioa
  function reservarTurno() {
    if (!fecha || !horaSeleccionada || !tipoReunion) {
      alert("complete todos los campos");
    } else {
      console.log("Turno reservado:", {
        fecha: fecha.toISOString().split("T")[0],

        hora: horaSeleccionada,
        tipoReunion: tipoReunion,
      });
      const fechaModificada = fecha.toISOString().split("T")[0];
      if (emails.length <= 0) {
        alert(`Turno reservado con éxito ✅
        Fecha: ${fechaModificada}
        Tipo: ${tipoReunion}
        Hora: ${horaSeleccionada}
        `);
      } else {
        alert(`
        Turno reservado con éxito ✅
        Fecha: ${fechaModificada}
        Tipo: ${tipoReunion}
        Hora: ${horaSeleccionada}
        Invitados: ${emails}
            `);
      }
      setFecha(null);
      setHoraSeleccionada(null);
      setTipoReunion("");
      setEmails([]);
    }
  }
  return (
    <div className="nuevoTurnoContainer">
      <h1>Sacar turno</h1>

      <label>Tipo de reunión</label>
      <select
        value={tipoReunion}
        onChange={(e) => setTipoReunion(e.target.value)}
      >
        <option value="">Seleccionar</option>
        <option value="grupal">Grupal</option>
        <option value="individual">Individual</option>
        <option value="organizacion">Organización</option>
      </select>

      {tipoReunion === "grupal" && (
        <>
          <label>Emails de participantes</label>

          {emails.map((email, index) => (
            <div key={index} className="emailRow">
              <input
                type="email"
                value={email}
                placeholder="email@ejemplo.com"
                onChange={(e) => {
                  const nuevos = [...emails];
                  nuevos[index] = e.target.value;
                  setEmails(nuevos);
                }}
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setEmails(emails.filter((_, i) => i !== index))
                  }
                >
                  X
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="agregarEmailBtn"
            onClick={() => setEmails([...emails, ""])}
          >
            + Agregar otro email
          </button>
        </>
      )}

      <p>Elegí una fecha y horario disponible</p>

      <div className="calendarContainer">
        <Calendar
          onChange={(value: Value) => setFecha(value as Date)}
          value={fecha}
          minDate={new Date()}
        />
      </div>

      {fecha && !esFinDeSemana(fecha) && (
        <>
          <h3>Horarios disponibles</h3>
          <div className="horariosContainer">
            {horariosDisponibles.map((hora) => (
              <button
                key={hora}
                className={`horaBtn ${
                  hora === horaSeleccionada ? "activa" : ""
                }`}
                onClick={() => setHoraSeleccionada(hora)}
              >
                {hora}
              </button>
            ))}
          </div>
        </>
      )}

      {fecha && esFinDeSemana(fecha) && (
        <p className="noAtencion">No hay atención los fines de semana</p>
      )}

      {fecha && horaSeleccionada && (
        <button className="reservarBtn" onClick={() => reservarTurno()}>
          Reservar turno
        </button>
      )}
    </div>
  );
}
