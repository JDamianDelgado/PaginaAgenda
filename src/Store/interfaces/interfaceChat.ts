export interface ChatTurnoRef {
  idTurno: string;
  fecha?: string;
  hora?: string;
}

export interface ChatPersonaResumen {
  idUser?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
}

export type ChatContraparte = ChatPersonaResumen | string | null;

export interface ChatMensaje {
  idMensaje: string;
  contenido: string;
  emisor: string;
  leido: boolean;
  createdAt: string;
}

export interface ChatConversacionResumen {
  idConversacion: string;
  cerrada: boolean;
  turno?: ChatTurnoRef | null;
  contraparte?: ChatContraparte;
  ultimoMensaje?: string | null;
  noLeidos: number;
  updatedAt: string;
}

export interface ChatConversacionDetalle extends ChatConversacionResumen {
  paciente?: ChatPersonaResumen | null;
  profesional?: ChatPersonaResumen | null;
  mensajes: ChatMensaje[];
}

export interface ChatState {
  conversaciones: ChatConversacionResumen[];
  conversacionActiva: ChatConversacionDetalle | null;
  mensajes: ChatMensaje[];
  loadingConversations: boolean;
  loadingMensajes: boolean;
  sendingMensaje: boolean;
  markingRead: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialChatState: ChatState = {
  conversaciones: [],
  conversacionActiva: null,
  mensajes: [],
  loadingConversations: false,
  loadingMensajes: false,
  sendingMensaje: false,
  markingRead: false,
  error: null,
  successMessage: null,
};
