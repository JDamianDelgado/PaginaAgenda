import { createSlice } from "@reduxjs/toolkit";
import { interfaceStateTurnos } from "../interfaces/interfaceTurnos";
import {
  cancelarTurno,
  crearTurno,
  eliminarTurno,
  misTurnosPaciente,
  TurnosProfesionalDisponible,
} from "./Turnos.thunks";

export const turnosSlice = createSlice({
  name: "turnos",
  initialState: interfaceStateTurnos,
  reducers: {
    clearTurnosDisponibles: (state) => {
      state.turnosDisponibles = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TurnosProfesionalDisponible.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TurnosProfesionalDisponible.fulfilled, (state, action) => {
        state.loading = false;
        state.turnosDisponibles = action.payload;
      })
      .addCase(TurnosProfesionalDisponible.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(crearTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearTurno.fulfilled, (state, action) => {
        state.loading = false;
        state.turnoCreado = action.payload;
      })
      .addCase(crearTurno.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(cancelarTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelarTurno.fulfilled, (state, action) => {
        state.loading = false;

        const turno = state.misTurnos.find(
          (t) => t.idTurno === action.payload.idTurno,
        );

        if (turno) {
          turno.estado = "CANCELADO";
        }

        state.turnoCancelado = action.payload;
      })
      .addCase(cancelarTurno.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(misTurnosPaciente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(misTurnosPaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.misTurnos = action.payload;
      })
      .addCase(misTurnosPaciente.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(eliminarTurno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarTurno.fulfilled, (state, action) => {
        state.loading = false;
        state.misTurnos = state.misTurnos.filter(
          (turno) => turno.idTurno !== action.payload.idTurno,
        );
      })
      .addCase(eliminarTurno.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      });
  },
});

export const { clearTurnosDisponibles } = turnosSlice.actions;
export default turnosSlice.reducer;
