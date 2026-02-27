import { createSlice } from "@reduxjs/toolkit";
import { initialStateProfesional } from "../interfaces/interfaceProfesional";
import {
  allProfesionales,
  creatPerfilProfesional,
  deletePerfilProfesional,
  editPerfilProfesional,
  miPerfilProfesional,
} from "./profesional.Thunks";
export const profesionalSlice = createSlice({
  name: "profesionales",
  initialState: initialStateProfesional,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProfesionales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allProfesionales.fulfilled, (state, action) => {
        state.loading = false;
        state.profesionales = action.payload;
      })
      .addCase(allProfesionales.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(creatPerfilProfesional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(creatPerfilProfesional.fulfilled, (state, action) => {
        state.loading = false;
        state.profesional = action.payload;
      })
      .addCase(creatPerfilProfesional.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(editPerfilProfesional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPerfilProfesional.fulfilled, (state, action) => {
        state.loading = false;
        state.profesional = action.payload;
      })
      .addCase(editPerfilProfesional.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(deletePerfilProfesional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePerfilProfesional.fulfilled, (state) => {
        state.loading = false;
        state.profesional = null;
      })
      .addCase(deletePerfilProfesional.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(miPerfilProfesional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(miPerfilProfesional.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
        state.turnosProfesional =
          action.payload.profesional?.TurnosProfesional ?? [];
      })
      .addCase(miPerfilProfesional.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const message = action.payload.message;
          const notFound = message.toLowerCase().includes("perfil profesional no encontrado");
          if (notFound) {
            state.error = null;
            state.usuario = null;
            state.turnosProfesional = [];
          } else {
            state.error = message;
          }
        } else {
          state.error = action.error.message ?? null;
        }
      });
  },
});
