import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.Slice";
import { usuariosSlice } from "./Usuarios/usuarios.Slice";
import { profesionalSlice } from "./Profesionales/profesional.Slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    usuarios: usuariosSlice.reducer,
    profesionales: profesionalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
