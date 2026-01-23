export interface MensajeProfesional {
  id: string;
  paciente: {
    nombre: string;
    apellido: string;
    imagenUrl: string;
  };
  mensaje: string;
  fecha: string;
}

export const mensajesProfesionalMock: MensajeProfesional[] = [
  {
    id: "msg-1",
    paciente: {
      nombre: "María",
      apellido: "González",
      imagenUrl:
        "https://www.seoptimer.com/storage/images/2016/05/foto-de-perfil-adecuada.jpg",
    },
    mensaje:
      "Hola, quería consultar si hay disponibilidad para adelantar la sesión de esta semana.",
    fecha: "2026-01-18",
  },
  {
    id: "msg-2",
    paciente: {
      nombre: "Juan",
      apellido: "Pérez",
      imagenUrl:
        "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyZmlsfGVufDB8fDB8fHww",
    },
    mensaje: "Me sentí mucho mejor después de la última sesión, gracias.",
    fecha: "2026-01-20",
  },
  {
    id: "msg-3",
    paciente: {
      nombre: "Lucía",
      apellido: "Martínez",
      imagenUrl:
        "https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/09/Poses-Perfil-Profesional-Mujeres-ago.-10-2023-1-819x1024.jpg?lossy=1&strip=1&webp=1",
    },
    mensaje: "¿La próxima sesión puede ser virtual?",
    fecha: "2026-01-21",
  },
];
