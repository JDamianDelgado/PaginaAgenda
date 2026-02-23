import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.Slice";
import { usuariosSlice } from "./Usuarios/usuarios.Slice";
import { profesionalSlice } from "./Profesionales/profesional.Slice";
import { turnosSlice } from "./Turnos/Turnos.Slice";
import { horarioProfesionalSlice } from "./HorariosProfesional/HorarioProfesional.Slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    usuarios: usuariosSlice.reducer,
    profesionales: profesionalSlice.reducer,
    turnos: turnosSlice.reducer,
    horarios: horarioProfesionalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
