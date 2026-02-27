export interface createHorarioProfesional {
  dia: string;
  horaInicio: string;
  horaFin: string;
  duracionTurno: number;
  activo: boolean;
}

export interface interfaceHorariosProfesional {
  dia: string;
  horaInicio: string;
  horaFin: string;
  duracionTurno: number;
  activo: boolean;
  profesional: {
    idProfesional: string;
    imagenUrl: string;
    especialidad: string;
    descripcion: string;
    activo: boolean;
  };
  idHorario: string;
}

export interface interfaceMisHorariosProfesional {
  idHorario: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  duracionTurno: number;
  activo: boolean;
}

export interface HorariosProfesionalState {
  horarios: interfaceHorariosProfesional[] | [];
  misHorarios: interfaceMisHorariosProfesional[] | [];
  loading: boolean;
  error: string | null;
}

export const initialStateHorarios: HorariosProfesionalState = {
  horarios: [],
  loading: false,
  error: null,
  misHorarios: [],
};
