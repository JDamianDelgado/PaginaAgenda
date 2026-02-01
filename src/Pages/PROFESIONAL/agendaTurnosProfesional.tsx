import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import { miPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";
import { CardTurnoProfesional } from "../../components/cardMiAgendaProfesional";

export function AgendaTurnos() {
  const dispatch = useAppDispatch();

  const { turnosProfesional, usuario, loading, error } = useAppSelector(
    (state) => state.profesionales,
  );

  useEffect(() => {
    dispatch(miPerfilProfesional());
  }, [dispatch]);

  if (loading) return <p>Cargando agenda...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!usuario) return <p>No hay datos del profesional</p>;
  return (
    <div>
      <h1>Agenda de turnos</h1>
      {!turnosProfesional || turnosProfesional.length === 0 ? (
        <p>No tenés turnos asignados</p>
      ) : (
        turnosProfesional.map((turno) => (
          <CardTurnoProfesional key={turno.idTurno} turno={turno} />
        ))
      )}
    </div>
  );
}
