// src/Mock/pacientesProfesional.mock.ts
export const pacientesProfesionalMock = [
  {
    id: "1",
    nombre: "María",
    apellido: "Gómez",
    rol: "PACIENTE",
    alDiaConPago: true,
    sesionesRealizadas: 8,
    imagenUrl:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    notas: [
      {
        fecha: "2024-10-02",
        texto: "Avanza bien con las técnicas de respiración.",
      },
      {
        fecha: "2024-10-15",
        texto: "Se nota mayor seguridad al expresarse.",
      },
    ],
  },
  {
    id: "2",
    nombre: "Juan",
    apellido: "Pérez",
    rol: "PACIENTE",
    alDiaConPago: false,
    sesionesRealizadas: 3,
    imagenUrl:
      "https://media.istockphoto.com/id/1386479313/es/foto/feliz-mujer-de-negocios-afroamericana-millennial-posando-aislada-en-blanco.jpg?s=612x612&w=0&k=20&c=JP0NBxlxG2-bdpTRPlTXBbX13zkNj0mR5g1KoOdbtO4=",
    notas: [
      {
        fecha: "2024-10-10",
        texto: "Necesita reforzar hábitos de descanso.",
      },
    ],
  },
];
