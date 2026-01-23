import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  createPerfilProfesional,
  InterfaceProfesional,
  updatePerfilProfesional,
} from "../interfaces/interfaceProfesional";
import type { InterfaceUsuario } from "../interfaces/interfaceUsers";

export const allProfesionales = createAsyncThunk<
  InterfaceProfesional[],
  void,
  { rejectValue: { message: string } }
>("profesional/allProfesionales", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/profesional", {
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
    return data;
  } catch {
    return rejectWithValue({ message: "Error al obtener los profesionales " });
  }
});

export const miPerfilProfesional = createAsyncThunk<
  InterfaceUsuario,
  void,
  { rejectValue: { message: string } }
>("profesional/miPerfilProfesional", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/profesional/miPerfil", {
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
    return data;
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
    const response = await fetch("http://localhost:3000/profesional", {
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
    const response = await fetch("http://localhost:3000/profesional", {
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
    const response = await fetch("http://localhost:3000/profesional", {
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

// faltala creacion de los slices y thunks de profesional @@@@@@@@@@@@@@@@@@@@@@

// el probale es que en tun base de datos registraste los profesionees el userrepository y no en profesional respositroy, por eso no te trae datos
//
