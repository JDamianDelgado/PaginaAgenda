import { useNavigate } from "react-router-dom";
import { CardComponente } from "../components/cardTurnos";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { mockTurnos } from "../Mock/Turnos.Mock";
import { useEffect, useState } from "react";
import { miUsuario } from "../Store/Usuarios/usuarios.Thunks";
import "../styles/MisTurnos.css";
export function MisTurnos() {
  const { idUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [turnos, setTurnos] = useState(mockTurnos);

  useEffect(() => {
    if (idUser) {
      dispatch(miUsuario({ id: idUser }));
    }
  }, [dispatch, idUser]);

  const { loading, error } = useAppSelector((state) => state.usuarios);

  const cancelarTurno = (idTurno: string) => {
    setTurnos((prev) =>
      prev.map((turno) =>
        turno.idTurno === idTurno ? { ...turno, estado: "CANCELADO" } : turno,
      ),
    );
  };

  return (
    <div className="MisTurnos">
      <h1>Mis turnos</h1>

      {loading && <p>Cargando turnos...</p>}
      {error && <p className="error">{error}</p>}

      {turnos.length === 0 && <div className="empty">No tenés turnos.</div>}

      <div className="MisTurnosLista">
        {turnos.map((turno) => (
          <CardComponente
            key={turno.idTurno}
            turno={turno}
            onCancelar={cancelarTurno}
          />
        ))}
      </div>

      <button className="BtnNuevoTurno" onClick={() => navigate("/nuevoTurno")}>
        Sacar turno
      </button>
    </div>
  );
}
