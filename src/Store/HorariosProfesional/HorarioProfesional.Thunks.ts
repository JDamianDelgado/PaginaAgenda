import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  interfaceHorariosProfesional,
  createHorarioProfesional,
  interfaceMisHorariosProfesional,
} from "../interfaces/interfaceHorarios";

const API_URL = import.meta.env.VITE_API_URL;

export const createHorario = createAsyncThunk<
  interfaceHorariosProfesional,
  createHorarioProfesional,
  { rejectValue: { message: string } }
>("horarios/createHorario", async (dataHorario, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const respone = await fetch(`${API_URL}/horarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataHorario),
    });
    if (!respone.ok) {
      const errorData = await respone.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo crear el horario",
      });
    }
    const data = await respone.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo crear el horario";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const misHorariosProfesional = createAsyncThunk<
  interfaceMisHorariosProfesional[],
  void,
  { rejectValue: { message: string } }
>("horarios/misHorarios", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/horarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo obtener los horarios",
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error
        ? error.message
        : "No se pudo obtener los horarios";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const editarHorario = createAsyncThunk<
  interfaceMisHorariosProfesional,
  { dataHorario: interfaceMisHorariosProfesional },
  { rejectValue: { message: string } }
>("horarios/editarHorario", async ({ dataHorario }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_URL}/horarios/${dataHorario.idHorario}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dia: dataHorario.dia,
          horaInicio: dataHorario.horaInicio,
          horaFin: dataHorario.horaFin,
          duracionTurno: dataHorario.duracionTurno,
          activo: dataHorario.activo,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo editar el horario",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo editar el horario";
    return rejectWithValue({ message: errorMensaje });
  }
});

export const eliminarHorario = createAsyncThunk<
  string,
  { idHorario: string },
  { rejectValue: { message: string } }
>("horarios/eliminarHorario", async ({ idHorario }, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/horarios/${idHorario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        message: errorData.message || "No se pudo eliminar el horario",
      });
    }
    return idHorario;
  } catch (error) {
    const errorMensaje =
      error instanceof Error ? error.message : "No se pudo eliminar el horario";
    return rejectWithValue({ message: errorMensaje });
  }
});
