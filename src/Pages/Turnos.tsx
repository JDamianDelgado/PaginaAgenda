import { useNavigate } from "react-router-dom";
import { CardComponente } from "../components/cardTurnos";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { useEffect, useState } from "react";
import "../styles/MisTurnos.css";
import {
  cancelarTurno,
  eliminarTurno,
  misTurnosPaciente,
} from "../Store/Turnos/Turnos.thunks";
import { ChatTurnoPanel } from "../components/chat/ChatTurnoPanel";
import {
  createOrGetConversationByTurno,
  getConversationMessages,
  getMyConversations,
  markConversationMessagesRead,
} from "../Store/Chat/chat.thunks";

type EstadoVista = "reservados" | "cancelados" | "completados";

export function MisTurnos() {
  const [openPanel, setOpenPanel] = useState<EstadoVista>("reservados");
  const [cancelandoTurnoId, setCancelandoTurnoId] = useState<string | null>(
    null,
  );
  const [eliminandoTurnoId, setEliminandoTurnoId] = useState<string | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, misTurnos } = useAppSelector((state) => state.turnos);

  useEffect(() => {
    dispatch(misTurnosPaciente());
  }, [dispatch]);

  const handleCancelarTurno = async (idTurno: string) => {
    try {
      setCancelandoTurnoId(idTurno);
      await dispatch(cancelarTurno({ idTurno })).unwrap();
      alert("Turno cancelado");
      dispatch(misTurnosPaciente());
    } finally {
      setCancelandoTurnoId(null);
    }
  };

  const handleEliminarTurno = async (idTurno: string) => {
    try {
      setEliminandoTurnoId(idTurno);
      await dispatch(eliminarTurno({ idTurno })).unwrap();
      alert("Turno eliminado correctamente");
      dispatch(misTurnosPaciente());
    } finally {
      setEliminandoTurnoId(null);
    }
  };

  const handleAbrirChat = async (idTurno: string) => {
    try {
      const conversation = await dispatch(
        createOrGetConversationByTurno(idTurno),
      ).unwrap();
      await dispatch(getConversationMessages(conversation.idConversacion));
      await dispatch(markConversationMessagesRead(conversation.idConversacion));
      dispatch(getMyConversations());
    } catch {
      // La UI del chat toma el error desde el slice.
    }
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

  const turnosParaChat = misTurnos
    .filter((turno) => turno.estado !== "CANCELADO")
    .map((turno) => ({
      idTurno: turno.idTurno,
      label: `${turno.profesional.UserProfesional.nombre} ${turno.profesional.UserProfesional.apellido}`,
      subtitle: `${turno.fecha} - ${turno.hora}`,
    }));

  const sections = [
    {
      key: "reservados" as const,
      title: "Reservados",
      description: "Proximos turnos confirmados.",
      data: reservados,
    },
    {
      key: "completados" as const,
      title: "Completados",
      description: "Historial de sesiones finalizadas.",
      data: completados,
    },
    {
      key: "cancelados" as const,
      title: "Cancelados",
      description: "Turnos cancelados por vos o por el sistema.",
      data: cancelados,
    },
  ];

  return (
    <section className="MisTurnos">
      <header className="MisTurnosHeader">
        <h1>Mis turnos</h1>
        <p>{misTurnos.length} turnos en total</p>
      </header>

      {loading && misTurnos.length === 0 && <p>Cargando turnos...</p>}
      {error && <p className="error">{error}</p>}

      {misTurnos.length === 0 && <div className="empty">No tenes turnos.</div>}

      {misTurnos.length > 0 && (
        <div className="MisTurnosPaneles">
          {sections.map((section) => (
            <article key={section.key} className="MisTurnosPanel">
              <button
                type="button"
                className={`MisTurnosPanelBtn ${openPanel === section.key ? "active" : ""}`}
                onClick={() =>
                  setOpenPanel((prev) => (prev === section.key ? "reservados" : section.key))
                }
              >
                <span>{section.title}</span>
                <strong>{section.data.length}</strong>
              </button>

              {openPanel === section.key && (
                <div className="MisTurnosPanelBody">
                  <p className="MisTurnosPanelDesc">{section.description}</p>
                  {section.data.length === 0 ? (
                    <p className="MisTurnosVacio">No hay turnos en esta categoria.</p>
                  ) : (
                    <div className="estadoTurno">
                      {section.data.map((turno) => (
                        <div key={turno.idTurno} className="MisTurnosCardWrap">
                          <CardComponente
                            turno={turno}
                            handleCancelarTurno={handleCancelarTurno}
                            handleEliminarTurno={handleEliminarTurno}
                            handleAbrirChat={handleAbrirChat}
                            cancelandoTurnoId={cancelandoTurnoId}
                            eliminandoTurnoId={eliminandoTurnoId}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <ChatTurnoPanel
        title="Chat con profesionales"
        turnos={turnosParaChat}
        emptyLabel="No tienes conversaciones todavia."
      />

      <button className="BtnNuevoTurno" onClick={() => navigate("/nuevoTurno")}>
        Sacar turno
      </button>
    </section>
  );
}
