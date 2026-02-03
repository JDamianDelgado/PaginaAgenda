import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  InterfaceUsuario,
  LoginError,
} from "../interfaces/interfaceUsers";

const API_URL = import.meta.env.VITE_API_URL;
export const allUsers = createAsyncThunk<
  InterfaceUsuario[],
  void,
  { rejectValue: LoginError }
>("usuarios/allUsers", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/users`, {
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
    return rejectWithValue({ message: "Error al obtener los usuarios" });
  }
});

export const deleteUser = createAsyncThunk<
  string,
  { id: string },
  { rejectValue: { message: string } }
>("usuarios/deleteUser", async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ message: errorData.message || "No autorizado" });
    }
    return id;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al eliminar el usuario";
    return rejectWithValue({
      message: errorMessage,
    });
  }
});

export const editUser = createAsyncThunk<
  InterfaceUsuario,
  { id: string; userData: Partial<InterfaceUsuario> },
  { rejectValue: { message: string } }
>("usuarios/editUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({ message: errorData.message || "No autorizado" });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error al editar el usuario";
    return rejectWithValue({
      message: errorMessage,
    });
  }
});

export const miUsuario = createAsyncThunk<
  InterfaceUsuario,
  { id: string },
  { rejectValue: { message: string } }
>("usuarios/miUsuario", async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/${id}`, {
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
    const errorMessage =
      error instanceof Error ? error.message : "Error al obtener el usuario";
    return rejectWithValue({
      message: errorMessage,
    });
  }
});
