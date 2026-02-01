export type EstadoTurno = "RESERVADO" | "CANCELADO" | "COMPLETADO";

export interface InterfaceTurno {
  idTurno: string;
  user: {
    idUser: string;
    nombre: string;
    apellido: string;
    email: string;
  };
  fecha: string;
  hora: string;
  estado: EstadoTurno;
  creado: string;
}

export interface InterfaceMisTurnos {
  idTurno: string;
  profesional: {
    idProfesional: string;
    imagenUrl: string;
    UserProfesional: {
      nombre: string;
      apellido: string;
    };
  };
  fecha: string;
  hora: string;
  estado: EstadoTurno;
  creado: string;
}

export type TurnosDisponiblesResponse = string[];

export interface interfaceCrearTurno {
  profesionalId: string;
  fecha: string;
  hora: string;
}

export type RolUsuario = "PACIENTE" | "PROFESIONAL";

export interface CancelarTurnoPayload {
  idTurno: string;
}

export interface CancelarTurnoResponse {
  idTurno: string;
  estado: "CANCELADO";
}

export interface InterfaceTurnoSlice {
  turnosDisponibles: TurnosDisponiblesResponse;
  misTurnos: InterfaceMisTurnos[];
  turnoCreado: InterfaceTurno | null;
  loading: boolean;
  error: string | null;
  turnoCancelado: CancelarTurnoResponse | null;
}
export const interfaceStateTurnos: InterfaceTurnoSlice = {
  misTurnos: [],
  turnosDisponibles: [],
  loading: false,
  error: null,
  turnoCreado: null,
  turnoCancelado: null,
};
