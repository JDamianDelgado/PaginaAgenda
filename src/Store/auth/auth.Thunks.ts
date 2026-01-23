import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginCredentials {
  email: string;
  password: string;
}

interface registerCredentials {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role?: string;
}
interface LoginError {
  message: string;
  error?: string;
  statusCode?: number;
}

interface LoginResponse {
  sub: string;
  token: string;
}
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: LoginError }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
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

export const registerUser = createAsyncThunk<
  LoginResponse,
  registerCredentials,
  { rejectValue: LoginError }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
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
