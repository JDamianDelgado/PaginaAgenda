import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.Thunks";
import { decodeTokenRole } from "../../utils/decodeToken";
import { isTokenExpired } from "../../utils/tokenExpired";

interface interfaceAuthState {
  idUser: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  role: string | null;
}

const tokenActual = localStorage.getItem("token");
const validToken =
  tokenActual && isTokenExpired(tokenActual) ? tokenActual : null;
if (!validToken) {
  localStorage.removeItem("token");
  localStorage.removeItem("idUser");
}
const initialStateAuth: interfaceAuthState = {
  idUser: validToken ? localStorage.getItem("idUser") : null,
  token: validToken ? tokenActual : null,
  loading: false,
  error: null,
  role: validToken ? decodeTokenRole(validToken) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    logout: (state) => {
      state.idUser = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("idUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.idUser = action.payload?.sub ?? null;
        state.token = action.payload.token ?? null;

        if (action.payload.token) {
          const role = decodeTokenRole(action.payload.token);
          state.role = role;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("idUser", action.payload.sub);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })

      //registrto
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.idUser = action.payload.sub;
        state.token = action.payload.token;

        if (action.payload.token) {
          const role = decodeTokenRole(action.payload.token);
          state.role = role;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("idUser", action.payload.sub);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
