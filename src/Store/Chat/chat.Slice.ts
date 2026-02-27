import { createSlice } from "@reduxjs/toolkit";
import type {
  ChatConversacionDetalle,
  ChatConversacionResumen,
} from "../interfaces/interfaceChat";
import { initialChatState } from "../interfaces/interfaceChat";
import {
  createOrGetConversationByTurno,
  getConversationMessages,
  getMyConversations,
  markConversationMessagesRead,
  sendConversationMessage,
} from "./chat.thunks";

const toConversationSummary = (
  conversation: ChatConversacionDetalle,
): ChatConversacionResumen => ({
  idConversacion: conversation.idConversacion,
  cerrada: conversation.cerrada,
  turno: conversation.turno ?? null,
  contraparte: conversation.contraparte ?? null,
  ultimoMensaje: conversation.ultimoMensaje ?? null,
  noLeidos: conversation.noLeidos ?? 0,
  updatedAt: conversation.updatedAt,
});

const upsertConversation = (
  conversations: ChatConversacionResumen[],
  conversation: ChatConversacionResumen,
) => {
  const index = conversations.findIndex(
    (item) => item.idConversacion === conversation.idConversacion,
  );

  if (index === -1) {
    conversations.unshift(conversation);
    return;
  }

  conversations[index] = conversation;
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    clearChatMessages: (state) => {
      state.conversacionActiva = null;
      state.mensajes = [];
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrGetConversationByTurno.pending, (state) => {
        state.loadingMensajes = true;
        state.error = null;
      })
      .addCase(createOrGetConversationByTurno.fulfilled, (state, action) => {
        state.loadingMensajes = false;
        state.conversacionActiva = action.payload;
        state.mensajes = action.payload.mensajes ?? [];
        upsertConversation(state.conversaciones, toConversationSummary(action.payload));
      })
      .addCase(createOrGetConversationByTurno.rejected, (state, action) => {
        state.loadingMensajes = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(getMyConversations.pending, (state) => {
        state.loadingConversations = true;
        state.error = null;
      })
      .addCase(getMyConversations.fulfilled, (state, action) => {
        state.loadingConversations = false;
        state.conversaciones = action.payload;
      })
      .addCase(getMyConversations.rejected, (state, action) => {
        state.loadingConversations = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(getConversationMessages.pending, (state) => {
        state.loadingMensajes = true;
        state.error = null;
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.loadingMensajes = false;
        state.conversacionActiva = action.payload;
        state.mensajes = action.payload.mensajes ?? [];
        upsertConversation(state.conversaciones, toConversationSummary(action.payload));
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.loadingMensajes = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(sendConversationMessage.pending, (state) => {
        state.sendingMensaje = true;
        state.error = null;
      })
      .addCase(sendConversationMessage.fulfilled, (state, action) => {
        state.sendingMensaje = false;
        state.mensajes.push(action.payload.mensaje);

        if (
          state.conversacionActiva &&
          state.conversacionActiva.idConversacion === action.payload.idConversacion
        ) {
          state.conversacionActiva = {
            ...state.conversacionActiva,
            mensajes: [...state.mensajes],
            ultimoMensaje: action.payload.mensaje.contenido,
            updatedAt: action.payload.mensaje.createdAt,
          };
        }

        const conversation = state.conversaciones.find(
          (item) => item.idConversacion === action.payload.idConversacion,
        );
        if (conversation) {
          conversation.ultimoMensaje = action.payload.mensaje.contenido;
          conversation.updatedAt = action.payload.mensaje.createdAt;
        }
      })
      .addCase(sendConversationMessage.rejected, (state, action) => {
        state.sendingMensaje = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(markConversationMessagesRead.pending, (state) => {
        state.markingRead = true;
      })
      .addCase(markConversationMessagesRead.fulfilled, (state, action) => {
        state.markingRead = false;
        state.successMessage = action.payload.message;

        state.mensajes = state.mensajes.map((mensaje) => ({
          ...mensaje,
          leido: true,
        }));

        const conversation = state.conversaciones.find(
          (item) => item.idConversacion === action.payload.idConversacion,
        );
        if (conversation) {
          conversation.noLeidos = 0;
        }
      })
      .addCase(markConversationMessagesRead.rejected, (state, action) => {
        state.markingRead = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      });
  },
});

export const { clearChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
