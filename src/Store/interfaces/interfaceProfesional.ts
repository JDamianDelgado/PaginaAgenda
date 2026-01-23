import type { InterfaceTurno } from "./interfaceTurnos";
import type { InterfaceUsuario } from "./interfaceUsers";

export interface InterfaceProfesional {
  idProfesional: string;
  UserProfesional: InterfaceUsuario;
  especialidad: string;
  descripcion: string;
  activo: boolean;
  imagenUrl: string;
  Turnos?: InterfaceTurno[] | [];
  Horario: interfaceHorarios[] | [];
}
export interface createPerfilProfesional {
  imagenUrl: string;
  especialidad: string;
  descripcion: string;
  activo: boolean;
}

export interface updatePerfilProfesional {
  imagenUrl?: string;
  especialidad?: string;
  descripcion?: string;
  activo?: boolean;
}

export interface InterfaceProfesionalState {
  profesionales: InterfaceProfesional[] | [];
  profesional: InterfaceProfesional | null;
  usuario: InterfaceUsuario | null;
  loading: boolean;
  error: string | null;
}

export const initialStateProfesional: InterfaceProfesionalState = {
  profesionales: [],
  profesional: null,
  usuario: null,
  loading: false,
  error: null,
};

export interface interfaceHorarios {
  idHorario: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
  profesional: InterfaceProfesional;
}
