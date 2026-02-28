import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks.Redux";
import { miPerfilProfesional } from "../../Store/Profesionales/profesional.Thunks";
import { FormPerfilProfesional } from "../../components/formularios/perfilProfesional.create";
import { UpdateFormPerfilProfesional } from "../../components/formularios/updatePerfilProfesional";
import "../../styles/panelProfesional.css";
import { Link } from "react-router-dom";
import { MisHorariosProfesional } from "./misHorariosProfesional";
import { ChatTurnoPanel } from "../../components/chat/ChatTurnoPanel";

export function PerfilProfesional() {
  const dispatch = useAppDispatch();
  const { usuario, loading, error } = useAppSelector(
    (state) => state.profesionales,
  );
  const { token } = useAppSelector((state) => state.auth);
  const [viewHours, setViewHours] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [viewFormUpdate, setViewFormUpdate] = useState(false);
  const profesional = usuario?.profesional;
  const horariosPerfil = profesional?.Horario ?? [];

  const tienePerfil = Boolean(profesional?.idProfesional);
  const turnosChat =
    profesional?.TurnosProfesional.filter(
      (turno) => turno.estado !== "CANCELADO",
    ).map((turno) => ({
      idTurno: turno.idTurno,
      label: `${turno.user.nombre} ${turno.user.apellido}`,
      subtitle: `${turno.fecha} - ${turno.hora}`,
    })) ?? [];

  useEffect(() => {
    if (token) {
      dispatch(miPerfilProfesional());
    }
  }, [token, dispatch]);

  return (
    <div className="PerfilProfesional">
      <h1>Mi perfil profesional</h1>

      {loading && <p className="PerfilProfesionalLoading">Cargando...</p>}
      {error && <p className="PerfilProfesionalError">Error: {error}</p>}

      {!tienePerfil ? (
        <section className="PerfilProfesionalEmpty">
          <h2>Aun no creaste tu perfil profesional</h2>
          <p>
            Completa tu perfil para aparecer en la agenda de pacientes y recibir
            reservas.
          </p>
          <button onClick={() => setViewForm(true)}>Crear perfil profesional</button>
        </section>
      ) : (
        <div className="PerfilProfesionalCard">
          <img
            className="PerfilProfesionalImg"
            src={
              profesional?.imagenUrl ||
              "https://clipart-library.com/data_images/100672.png"
            }
            alt={usuario?.email ?? "Perfil profesional"}
          />

          <div className="PerfilProfesionalInfo">
            <h2>
              {usuario?.nombre ?? ""} {usuario?.apellido ?? ""}
            </h2>

            <h3>{profesional?.especialidad}</h3>

            <p>{profesional?.descripcion}</p>

            <Link to="/MiAgenda" className="PerfilProfesionalBadge">
              Turnos: {profesional?.TurnosProfesional.length || 0}
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

      {tienePerfil && (
        <div>
          <button
            className="PerfilProfesionalActions"
            onClick={() => setViewHours(!viewHours)}
          >
            {viewHours ? "Ocultar" : "Ver Mis Horarios"}
          </button>
          {viewHours && (
            <MisHorariosProfesional
              misHorarios={horariosPerfil}
            ></MisHorariosProfesional>
          )}
        </div>
      )}

      <ChatTurnoPanel
        title="Mensajes con pacientes"
        turnos={turnosChat}
        emptyLabel="No hay conversaciones todavia."
      />
    </div>
  );
}
