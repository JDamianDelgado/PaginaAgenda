import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ChatConversacionDetalle,
  ChatConversacionResumen,
  ChatMensaje,
} from "../interfaces/interfaceChat";

const API_URL = import.meta.env.VITE_API_URL;

interface ErrorResponse {
  message: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const parseApiResponse = async <T>(response: Response): Promise<T> => {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
};

export const createOrGetConversationByTurno = createAsyncThunk<
  ChatConversacionDetalle,
  string,
  { rejectValue: ErrorResponse }
>("chat/createOrGetConversationByTurno", async (idTurno, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/chat/${idTurno}`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    const data = await parseApiResponse<ChatConversacionDetalle | ErrorResponse>(
      response,
    );

    if (!response.ok) {
      return rejectWithValue({
        message:
          "message" in data
            ? data.message
            : "No se pudo crear o recuperar la conversacion",
      });
    }

    return data as ChatConversacionDetalle;
  } catch {
    return rejectWithValue({ message: "Error de conexion con el chat" });
  }
});

export const getMyConversations = createAsyncThunk<
  ChatConversacionResumen[],
  void,
  { rejectValue: ErrorResponse }
>("chat/getMyConversations", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/chat/mis-conversaciones`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await parseApiResponse<ChatConversacionResumen[] | ErrorResponse>(
      response,
    );

    if (!response.ok) {
      return rejectWithValue({
        message:
          "message" in data ? data.message : "No se pudieron cargar las conversaciones",
      });
    }

    return data as ChatConversacionResumen[];
  } catch {
    return rejectWithValue({ message: "Error de conexion con el chat" });
  }
});

export const getConversationMessages = createAsyncThunk<
  ChatConversacionDetalle,
  string,
  { rejectValue: ErrorResponse }
>("chat/getConversationMessages", async (idConversacion, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/chat/${idConversacion}/mensajes`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await parseApiResponse<ChatConversacionDetalle | ErrorResponse>(
      response,
    );

    if (!response.ok) {
      return rejectWithValue({
        message:
          "message" in data ? data.message : "No se pudieron cargar los mensajes",
      });
    }

    return data as ChatConversacionDetalle;
  } catch {
    return rejectWithValue({ message: "Error de conexion con el chat" });
  }
});

export const sendConversationMessage = createAsyncThunk<
  { idConversacion: string; mensaje: ChatMensaje },
  { idConversacion: string; contenido: string },
  { rejectValue: ErrorResponse }
>(
  "chat/sendConversationMessage",
  async ({ idConversacion, contenido }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/chat/${idConversacion}/mensajes`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ contenido }),
      });

      const data = await parseApiResponse<ChatMensaje | ErrorResponse>(response);

      if (!response.ok) {
        return rejectWithValue({
          message:
            "message" in data ? data.message : "No se pudo enviar el mensaje",
        });
      }

      return { idConversacion, mensaje: data as ChatMensaje };
    } catch {
      return rejectWithValue({ message: "Error de conexion con el chat" });
    }
  },
);

export const markConversationMessagesRead = createAsyncThunk<
  { idConversacion: string; message: string },
  string,
  { rejectValue: ErrorResponse }
>("chat/markConversationMessagesRead", async (idConversacion, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/chat/${idConversacion}/mensajes/leidos`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    const data = await parseApiResponse<{ message: string } | ErrorResponse>(response);

    if (!response.ok) {
      return rejectWithValue({
        message:
          "message" in data ? data.message : "No se pudieron marcar como leidos",
      });
    }

    return {
      idConversacion,
      message: "message" in data ? data.message : "Mensajes marcados como leidos",
    };
  } catch {
    return rejectWithValue({ message: "Error de conexion con el chat" });
  }
});
