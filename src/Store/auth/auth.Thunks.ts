import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginResponse,
  registerCredentials,
  LoginCredentials,
  LoginError,
} from "../interfaces/interfaceAuth";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginError }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      return rejectWithValue({
        message: "Respuesta inválida del servidor",
      });
    }

    if (!response.ok) {
      return rejectWithValue(data ?? { message: "Credenciales inválidas" });
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

export const registerUser = createAsyncThunk<
  LoginResponse,
  registerCredentials,
  { rejectValue: LoginError }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue(data);
    }
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});
