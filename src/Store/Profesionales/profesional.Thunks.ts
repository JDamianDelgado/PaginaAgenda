import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  createPerfilProfesional,
  InterfaceProfesional,
  MiPerfilProfesionalResponse,
  updatePerfilProfesional,
} from "../interfaces/interfaceProfesional";

const API_URL = import.meta.env.VITE_API_URL;

const normalizeMiPerfilResponse = (payload: unknown): MiPerfilProfesionalResponse => {
  const data = payload as Record<string, unknown>;
  const profesional = (data.profesional ?? {}) as Record<string, unknown>;
  const turnosRaw = Array.isArray(profesional.TurnosProfesional)
    ? (profesional.TurnosProfesional as Record<string, unknown>[])
    : [];

  const turnos = turnosRaw.map((turno) => {
    const userData =
      (turno.user as Record<string, unknown>) ||
      (turno.paciente as Record<string, unknown>) ||
      (turno.UserPaciente as Record<string, unknown>) ||
      {};

    return {
      idTurno: String(turno.idTurno ?? ""),
      user: {
        idUser: String(userData.idUser ?? ""),
        nombre: String(userData.nombre ?? ""),
        apellido: String(userData.apellido ?? ""),
        email: String(userData.email ?? ""),
      },
      fecha: String(turno.fecha ?? ""),
      hora: String(turno.hora ?? ""),
      estado: String(turno.estado ?? "RESERVADO") as
        | "RESERVADO"
        | "CANCELADO"
        | "COMPLETADO",
      creado: String(turno.creado ?? turno.createdAt ?? ""),
    };
  });

  const horario = Array.isArray(profesional.Horario)
    ? profesional.Horario
    : [];

  return {
    idUser: String(data.idUser ?? ""),
    nombre: String(data.nombre ?? ""),
    apellido: String(data.apellido ?? ""),
    email: String(data.email ?? ""),
    role: "PROFESIONAL",
    profesional: {
      idProfesional: String(profesional.idProfesional ?? ""),
      imagenUrl: String(profesional.imagenUrl ?? ""),
      descripcion: String(profesional.descripcion ?? ""),
      especialidad: String(profesional.especialidad ?? ""),
      TurnosProfesional: turnos,
      Horario: horario,
    },
  };
};

export const allProfesionales = createAsyncThunk<
  InterfaceProfesional[],
  void,
  { rejectValue: { message: string } }
>("profesional/allProfesionales", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/profesional`, {
      method: "GET",
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ message: errorData.message || "No autorizado" });
    }
    const data = await response.json();
    return data;
  } catch {
    return rejectWithValue({ message: "Error al obtener los profesionales " });
  }
});

export const miPerfilProfesional = createAsyncThunk<
  MiPerfilProfesionalResponse,
  void,
  { rejectValue: { message: string } }
>("profesional/miPerfilProfesional", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/profesional/miPerfil`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ message: errorData.message || "No autorizado" });
    }
    const data = await response.json();
    return normalizeMiPerfilResponse(data);
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo ingresar al perfil";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const creatPerfilProfesional = createAsyncThunk<
  InterfaceProfesional,
  createPerfilProfesional,
  { rejectValue: { message: string } }
>("profesional/create", async (profesionalData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/profesional`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profesionalData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo crear perfil profesional",
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo crear perfil";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const editPerfilProfesional = createAsyncThunk<
  InterfaceProfesional,
  updatePerfilProfesional,
  { rejectValue: { message: string } }
>("profesional/update", async (profesionalData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/profesional`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profesionalData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo completar accion",
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error
        ? error.message
        : "Error el editar perfil profesional";
    return rejectWithValue({
      message: errorMensaje,
    });
  }
});

export const deletePerfilProfesional = createAsyncThunk<
  string,
  void,
  { rejectValue: { message: string } }
>("profesional/delete", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/profesional`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo completar accion ",
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo completar accion ";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const sendEmail = createAsyncThunk<
  string,
  { email: string; text: string },
  { rejectValue: { message: string } }
>("profesional/sendEmail", async (dataMensaje, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/profesional/sendMsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: dataMensaje.email,
        text: dataMensaje.text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo enviar el email",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo enviar el Email";
    return rejectWithValue({ message: errorMensaje });
  }
});
