import { createSlice } from "@reduxjs/toolkit";
import { initialStateHorarios } from "../interfaces/interfaceHorarios";
import {
  createHorario,
  editarHorario,
  eliminarHorario,
  misHorariosProfesional,
} from "./HorarioProfesional.Thunks";

export const horarioProfesionalSlice = createSlice({
  name: "horariosProfesional",
  initialState: initialStateHorarios,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHorario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHorario.fulfilled, (state, action) => {
        state.loading = false;
        state.horarios = action.payload
          ? [...state.horarios, action.payload]
          : state.horarios;
      })
      .addCase(createHorario.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(misHorariosProfesional.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(misHorariosProfesional.fulfilled, (state, action) => {
        state.loading = false;
        state.misHorarios = action.payload ? action.payload : state.misHorarios;
      })
      .addCase(misHorariosProfesional.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(editarHorario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editarHorario.fulfilled, (state, action) => {
        state.loading = false;
        state.misHorarios = state.misHorarios.map((horario) =>
          horario.idHorario === action.payload.idHorario
            ? action.payload
            : horario,
        );
      })
      .addCase(editarHorario.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(eliminarHorario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarHorario.fulfilled, (state, action) => {
        state.loading = false;
        state.misHorarios = state.misHorarios.filter((horario) => {
          return horario.idHorario !== action.payload;
        });
      })
      .addCase(eliminarHorario.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      });
  },
});
