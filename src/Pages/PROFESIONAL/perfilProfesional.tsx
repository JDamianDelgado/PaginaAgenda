import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import { miPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";
import { FormPerfilProfesional } from "../../components/formularios/perfilProfesional.create";
import { UpdateFormPerfilProfesional } from "../../components/formularios/updatePerfilProfesional";
import "../../styles/panelProfesional.css";
import { mensajesProfesionalMock } from "../../Mock/mensajeProfesional.mock";
import { pacientesProfesionalMock } from "../../Mock/misPacientes.mock";
import { MessageCard } from "../../components/messageComponent";
import { PacienteCard } from "../../components/pacientesCard";
import { misHorariosProfesional } from "../../Store/HorariosProfesional/HorarioProfesional.Thunks";
import { Link } from "react-router-dom";
import { MisHorariosProfesional } from "./misHorariosProfesional";
export function PerfilProfesional() {
  const dispatch = useAppDispatch();
  const { usuario, loading, error } = useAppSelector(
    (state) => state.profesionales,
  );
  const { misHorarios } = useAppSelector((state) => state.horarios);
  const { token } = useAppSelector((state) => state.auth);
  const [viewHours, setViewHours] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [viewFormUpdate, setViewFormUpdate] = useState(false);

  const tienePerfil = !!usuario?.profesional;

  useEffect(() => {
    if (token) {
      dispatch(miPerfilProfesional());
      dispatch(misHorariosProfesional());
    }
  }, [token, dispatch]);

  return (
    <div className="PerfilProfesional">
      <h1>Mi perfil profesional</h1>

      {loading && <p className="PerfilProfesionalLoading">Cargando...</p>}
      {error && <p className="PerfilProfesionalError">Error: {error}</p>}

      {!tienePerfil ? (
        <>
          <p>No tenés perfil profesional aún</p>
          <button onClick={() => setViewForm(true)}>
            Crear Perfil Profesional
          </button>
        </>
      ) : (
        <div className="PerfilProfesionalCard">
          <img
            className="PerfilProfesionalImg"
            src={
              usuario.profesional?.imagenUrl ||
              "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto.jpg"
            }
            alt={usuario.email}
          />

          <div className="PerfilProfesionalInfo">
            <h2>
              {usuario.nombre} {usuario.apellido}
            </h2>

            <h3>{usuario.profesional?.especialidad}</h3>

            <p>{usuario.profesional?.descripcion}</p>

            <Link to="/MiAgenda" className="PerfilProfesionalBadge">
              Turnos: {usuario.profesional?.TurnosProfesional.length || 0}
            </Link>

            <div className="PerfilProfesionalActions">
              <button onClick={() => setViewFormUpdate(!viewFormUpdate)}>
                Editar perfil
              </button>
            </div>
          </div>
        </div>
      )}
      {viewForm && <FormPerfilProfesional setViewForm={setViewForm} />}
      {viewFormUpdate && (
        <UpdateFormPerfilProfesional setViewForm={setViewFormUpdate} />
      )}

      <div>
        <button
          className="PerfilProfesionalActions"
          onClick={() => setViewHours(!viewHours)}
        >
          {viewHours ? "Ocultar" : "Ver Mis Horarios"}
        </button>
        {viewHours && (
          <MisHorariosProfesional
            misHorarios={misHorarios}
          ></MisHorariosProfesional>
        )}
      </div>
      <div>
        <h1>Mensajes</h1>
        {mensajesProfesionalMock.map((msg) => (
          <MessageCard key={msg.id} mensaje={msg} />
        ))}
      </div>

      <div>
        <h1>Mis Pacientes:</h1>
        {pacientesProfesionalMock.map((pac) => (
          <PacienteCard key={pac.id} paciente={pac} />
        ))}
      </div>
    </div>
  );
}
