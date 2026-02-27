import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import {
  createOrGetConversationByTurno,
  getConversationMessages,
  getMyConversations,
  markConversationMessagesRead,
  sendConversationMessage,
} from "../../Store/Chat/chat.thunks";

export interface ChatTurnoOption {
  idTurno: string;
  label: string;
  subtitle?: string;
}

interface ChatTurnoPanelProps {
  title: string;
  turnos: ChatTurnoOption[];
  emptyLabel: string;
}

const getContraparteLabel = (
  contraparte:
    | {
        nombre?: string;
        apellido?: string;
        email?: string;
      }
    | string
    | null
    | undefined,
) => {
  if (!contraparte) return "Sin contraparte";
  if (typeof contraparte === "string") return contraparte;

  const nombre = contraparte.nombre?.trim() ?? "";
  const apellido = contraparte.apellido?.trim() ?? "";
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  if (nombreCompleto) return nombreCompleto;
  return contraparte.email ?? "Sin contraparte";
};

const getUltimoMensajePreview = (ultimoMensaje: unknown) => {
  if (!ultimoMensaje) return "Sin mensajes";
  if (typeof ultimoMensaje === "string") return ultimoMensaje;

  if (
    typeof ultimoMensaje === "object" &&
    ultimoMensaje !== null &&
    "contenido" in ultimoMensaje
  ) {
    const contenido = (ultimoMensaje as { contenido?: unknown }).contenido;
    if (typeof contenido === "string" && contenido.trim()) {
      return contenido;
    }
  }

  return "Sin mensajes";
};

const isOwnMessage = (emisor: string, idUser: string | null, role: string | null) => {
  const normalizedEmisor = emisor.toLowerCase();
  if (idUser && emisor === idUser) return true;
  if (role && normalizedEmisor === role.toLowerCase()) return true;
  return normalizedEmisor === "yo";
};

export function ChatTurnoPanel({ title, turnos, emptyLabel }: ChatTurnoPanelProps) {
  const dispatch = useAppDispatch();
  const { idUser, role } = useAppSelector((state) => state.auth);
  const {
    conversaciones,
    conversacionActiva,
    mensajes,
    loadingConversations,
    loadingMensajes,
    sendingMensaje,
    error,
  } = useAppSelector((state) => state.chat);

  const [selectedTurnoId, setSelectedTurnoId] = useState<string>("");
  const [mensaje, setMensaje] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getMyConversations());
  }, [dispatch]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      dispatch(getMyConversations());
      if (conversacionActiva?.idConversacion) {
        dispatch(getConversationMessages(conversacionActiva.idConversacion));
      }
    }, 20000);

    return () => window.clearInterval(interval);
  }, [dispatch, conversacionActiva?.idConversacion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes]);

  const turnosMap = useMemo(() => {
    const map = new Map<string, ChatTurnoOption>();
    turnos.forEach((turno) => map.set(turno.idTurno, turno));
    return map;
  }, [turnos]);

  const handleOpenFromTurno = async () => {
    if (!selectedTurnoId) return;

    try {
      const conversation = await dispatch(
        createOrGetConversationByTurno(selectedTurnoId),
      ).unwrap();
      await dispatch(getConversationMessages(conversation.idConversacion));
      await dispatch(markConversationMessagesRead(conversation.idConversacion));
      dispatch(getMyConversations());
    } catch {
      // El error se refleja en el slice.
    }
  };

  const handleOpenConversation = async (idConversacion: string) => {
    await dispatch(getConversationMessages(idConversacion));
    await dispatch(markConversationMessagesRead(idConversacion));
    dispatch(getMyConversations());
  };

  const handleSendMessage = async () => {
    const contenido = mensaje.trim();
    if (!contenido || !conversacionActiva) return;

    await dispatch(
      sendConversationMessage({
        idConversacion: conversacionActiva.idConversacion,
        contenido,
      }),
    );
    setMensaje("");
    dispatch(getMyConversations());
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!sendingMensaje && mensaje.trim()) {
        handleSendMessage();
      }
    }
  };

  return (
    <section className="ChatPanel">
      <h2>{title}</h2>

      <div className="ChatPanelCreate">
        <select
          value={selectedTurnoId}
          onChange={(event) => setSelectedTurnoId(event.target.value)}
        >
          <option value="">Selecciona un turno para abrir chat</option>
          {turnos.map((turno) => (
            <option key={turno.idTurno} value={turno.idTurno}>
              {turno.label}
            </option>
          ))}
        </select>
        <button onClick={handleOpenFromTurno} disabled={!selectedTurnoId || loadingMensajes}>
          {loadingMensajes ? "Abriendo..." : "Abrir chat"}
        </button>
      </div>

      {selectedTurnoId && turnosMap.get(selectedTurnoId)?.subtitle && (
        <p className="ChatPanelSubtitle">{turnosMap.get(selectedTurnoId)?.subtitle}</p>
      )}

      <div className="ChatPanelGrid">
        <aside className="ChatPanelInbox">
          <h3>Conversaciones</h3>
          {loadingConversations && <p>Cargando conversaciones...</p>}
          {!loadingConversations && conversaciones.length === 0 && <p>{emptyLabel}</p>}

          {conversaciones.map((conversation) => (
            <button
              key={conversation.idConversacion}
              className={`ChatPanelInboxItem ${
                conversation.idConversacion === conversacionActiva?.idConversacion
                  ? "active"
                  : ""
              }`}
              onClick={() => handleOpenConversation(conversation.idConversacion)}
            >
              <span>{getContraparteLabel(conversation.contraparte)}</span>
              <small>{getUltimoMensajePreview(conversation.ultimoMensaje)}</small>
              {conversation.noLeidos > 0 && (
                <strong className="ChatBadge">{conversation.noLeidos}</strong>
              )}
            </button>
          ))}
        </aside>

        <div className="ChatPanelMessages">
          <h3>Mensajes</h3>
          {!conversacionActiva && <p>Selecciona una conversacion para ver mensajes.</p>}

          {conversacionActiva && (
            <>
              <div className="ChatMessagesList">
                {mensajes.length === 0 && <p>Aun no hay mensajes en esta conversacion.</p>}
                {mensajes.map((item) => (
                  <article
                    key={item.idMensaje}
                    className={`ChatMessage ${
                      isOwnMessage(item.emisor, idUser, role) ? "mine" : "other"
                    }`}
                  >
                    <p>{item.contenido}</p>
                    <small>{new Date(item.createdAt).toLocaleString("es-AR")}</small>
                  </article>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="ChatInputRow">
                <textarea
                  value={mensaje}
                  onChange={(event) => setMensaje(event.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSendMessage} disabled={sendingMensaje || !mensaje.trim()}>
                  {sendingMensaje ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {error && <p className="ChatPanelError">{error}</p>}
    </section>
  );
}
