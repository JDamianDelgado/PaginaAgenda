import type { InterfaceTurno } from "./interfaceTurnos";
import type { InterfaceUsuario } from "./interfaceUsers";

export interface InterfaceProfesional {
  idProfesional: string;
  UserProfesional: InterfaceUsuario;
  especialidad: string;
  descripcion: string;
  activo: boolean;
  imagenUrl: string;
  TurnosProfesional: InterfaceTurno[] | [];
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

export interface interfaceTurnosProfesional {
  idTurno: string;
  fecha: string;
  hora: string;
  estado: string;
  creado: string;
  user: {
    idUser: string;
    nombre: string;
    apellido: string;
    email: string;
  };
}

export interface MiPerfilProfesionalResponse {
  idUser: string;
  nombre: string;
  apellido: string;
  email: string;
  role: "PROFESIONAL";

  profesional: {
    idProfesional: string;
    imagenUrl: string;
    descripcion: string;
    especialidad: string;
    TurnosProfesional: {
      idTurno: string;

      user: {
        idUser: string;
        nombre: string;
        apellido: string;
        email: string;
      };

      fecha: string;
      hora: string;
      estado: "RESERVADO" | "CANCELADO" | "COMPLETADO";
      creado: string;
    }[];
  };
}

export interface InterfaceProfesionalState {
  profesionales: InterfaceProfesional[] | [];
  profesional: InterfaceProfesional | null;
  usuario: MiPerfilProfesionalResponse | null;
  turnosProfesional: interfaceTurnosProfesional[] | null;
  loading: boolean;
  error: string | null;
}

export const initialStateProfesional: InterfaceProfesionalState = {
  profesionales: [],
  profesional: null,
  usuario: null,
  turnosProfesional: [],
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
