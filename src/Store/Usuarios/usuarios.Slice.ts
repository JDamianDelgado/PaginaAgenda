import { createSlice } from "@reduxjs/toolkit";
import { allUsers, deleteUser, editUser, miUsuario } from "./usuarios.Thunks";
import { initialStateUsuarios } from "../interfaces/interfaceUsers";

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: initialStateUsuarios,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // allusers
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })

      // deleteuser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios =
          state.usuarios?.filter(
            (usuario) => usuario.idUser !== action.payload
          ) || null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = state.usuarios.map((usuario) =>
          usuario.idUser === action.payload.idUser ? action.payload : usuario
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      })
      // mi usuario
      .addCase(miUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(miUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioActual = action.payload;
      })
      .addCase(miUsuario.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message ?? null;
        }
      });
  },
});

export default usuariosSlice.reducer;
