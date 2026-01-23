export type EstadoTurno = "RESERVADO" | "CANCELADO" | "COMPLETADO";

export interface InterfaceTurno {
  idTurno: string;
  fecha: string;
  hora: string;
  estado: EstadoTurno;
  creado: string;
  profesional?: {
    idProfesional: string;
    nombre: string;
    apellido: string;
  };
}
