import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CancelarTurnoPayload,
  CancelarTurnoResponse,
  interfaceCrearTurno,
  InterfaceMisTurnos,
  InterfaceTurno,
  TurnosDisponiblesResponse,
} from "../interfaces/interfaceTurnos";

const API_URL = import.meta.env.VITE_URL_DB_BACKEND;
//fecha formato aaaa/mm/dd
export const TurnosProfesionalDisponible = createAsyncThunk<
  TurnosDisponiblesResponse,
  { profesionalId: string; fecha: string },
  { rejectValue: { message: string } }
>("turnos/misTurnos", async ({ profesionalId, fecha }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/turnos/slots/${profesionalId}/${fecha}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo ver los turnos",
      });
    }
    const data = await response.json();
    return data;
  } catch {
    return rejectWithValue({ message: "Error de conexion" });
  }
});

export const crearTurno = createAsyncThunk<
  InterfaceTurno,
  interfaceCrearTurno,
  { rejectValue: { message: string } }
>("turnos/crearTurno", async (credentials, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/turnos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData?.message || "No se pudo crear el turno",
      });
    }
    const data = await response.json();
    return {
      idTurno: data.idTurno,
      user: data.user,
      fecha: data.fecha,
      hora: data.hora,
      estado: data.estado,
      creado: data.createdAt,
    };
  } catch {
    return rejectWithValue({ message: "Error en la conexion" });
  }
});

export const cancelarTurno = createAsyncThunk<
  CancelarTurnoResponse,
  CancelarTurnoPayload,
  { rejectValue: { message: string } }
>("turnos/cancelar", async ({ idTurno }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/turnos/cancelar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idTurno }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: data?.message || "No se pudo cancelar el turno",
      });
    }

    return {
      idTurno,
      estado: "CANCELADO",
    };
  } catch {
    return rejectWithValue({
      message: "Error de conexión",
    });
  }
});

export const misTurnosPaciente = createAsyncThunk<
  InterfaceMisTurnos[],
  void,
  { rejectValue: { message: string } }
>("turnos/misTurnosPaciente", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/turnos/misturnos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo ver los turnos",
      });
    }
    const data: InterfaceMisTurnos[] = await response.json();
    return data;
  } catch {
    return rejectWithValue({ message: "Error de conexion" });
  }
});

export const eliminarTurno = createAsyncThunk<
  { message: string; idTurno: string },
  { idTurno: string },
  { rejectValue: { message: string } }
>("turnos/eliminar", async ({ idTurno }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/turnos/eliminar/${idTurno}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: data?.message || "No se pudo eliminar el turno",
      });
    }

    return {
      message: data.message || "Turno eliminado correctamente",
      idTurno,
    };
  } catch {
    return rejectWithValue({
      message: "Error de conexión",
    });
  }
});
