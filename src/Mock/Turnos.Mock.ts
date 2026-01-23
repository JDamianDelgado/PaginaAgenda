import type { InterfaceTurno } from "../Store/interfaces/interfaceTurnos";
export const mockTurnos: InterfaceTurno[] = [
  {
    idTurno: "turno-001",
    fecha: "2026-02-03",
    hora: "09:00",
    estado: "RESERVADO",
    creado: "2026-01-20T10:30:00Z",
    profesional: {
      idProfesional: "prof-001",
      nombre: "Laura",
      apellido: "Gómez",
    },
  },
  {
    idTurno: "turno-002",
    fecha: "2026-02-05",
    hora: "11:00",
    estado: "COMPLETADO",
    creado: "2026-01-15T14:00:00Z",
    profesional: {
      idProfesional: "prof-001",
      nombre: "Laura",
      apellido: "Gómez",
    },
  },
  {
    idTurno: "turno-003",
    fecha: "2026-02-07",
    hora: "16:00",
    estado: "CANCELADO",
    creado: "2026-01-18T09:15:00Z",
    profesional: {
      idProfesional: "prof-002",
      nombre: "Marcos",
      apellido: "Pérez",
    },
  },
];
