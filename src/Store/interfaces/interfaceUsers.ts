import type { InterfaceProfesional } from "./interfaceProfesional";
import type { InterfaceTurno } from "./interfaceTurnos";

export interface LoginError {
  message: string;
}
export interface InterfaceUsuario {
  idUser: string;
  nombre: string;
  apellido: string;
  email: string;
  profesional?: InterfaceProfesional;
  role: string | null;
  turnos?: InterfaceTurno[];
  createdAt?: string;
}
export interface InterfaceUsuarioState {
  usuarios: InterfaceUsuario[] | [];
  usuarioActual: InterfaceUsuario | null;
  loading: boolean;
  error: string | null;
}

export const initialStateUsuarios: InterfaceUsuarioState = {
  usuarios: [],
  usuarioActual: null,
  loading: false,
  error: null,
};
