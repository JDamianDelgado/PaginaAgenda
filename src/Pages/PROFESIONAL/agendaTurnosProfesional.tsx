import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import { miPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";
import { PacienteCard } from "../../components/pacientesCard";
import "../../styles/agendaProfesional.css";

const buildDateTime = (fecha: string, hora: string) => {
  const raw = `${fecha}T${hora}`;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

export function AgendaTurnos() {
  const dispatch = useAppDispatch();
  const { turnosProfesional, usuario, loading, error } = useAppSelector(
    (state) => state.profesionales,
  );

  useEffect(() => {
    dispatch(miPerfilProfesional());
  }, [dispatch]);

  const turnosOrdenados = useMemo(() => {
    if (!turnosProfesional) return [];

    return [...turnosProfesional].sort((a, b) => {
      const dateA = buildDateTime(a.fecha, a.hora);
      const dateB = buildDateTime(b.fecha, b.hora);

      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });
  }, [turnosProfesional]);

  if (loading) return <p>Cargando agenda...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!usuario) return <p>No hay datos del profesional</p>;

  return (
    <section className="AgendaProfesional">
      <header className="AgendaProfesionalHeader">
        <h1>Agenda de turnos</h1>
        <p>{turnosOrdenados.length} turnos registrados</p>
      </header>

      {!turnosOrdenados.length ? (
        <p className="AgendaProfesionalEmpty">No tenes turnos asignados.</p>
      ) : (
        <div className="AgendaProfesionalList">
          {turnosOrdenados.map((turno) => (
            <PacienteCard
              key={turno.idTurno}
              paciente={{
                nombre: turno.user.nombre,
                apellido: turno.user.apellido,
                email: turno.user.email,
              }}
              turno={{
                fecha: turno.fecha,
                hora: turno.hora,
                estado: turno.estado,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
