import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { resetPasswordUser } from "../Store/auth/auth.Thunks";
import "../styles/authRecovery.css";

export function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const hasToken = useMemo(() => token.trim().length > 0, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasToken) {
      setFormError("El enlace de recuperacion no es valido.");
      return;
    }

    if (newPassword.trim().length < 6) {
      setFormError("La nueva contrasena debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Las contrasenas no coinciden.");
      return;
    }

    setFormError(null);

    try {
      const response = await dispatch(
        resetPasswordUser({ token, newPassword }),
      ).unwrap();
      setSuccessMessage(response.message || "Contrasena restablecida correctamente");
      setTimeout(() => navigate("/login"), 1800);
    } catch {
      // El error llega desde el slice.
    }
  };

  return (
    <section className="RecoveryPage">
      <div className="RecoveryCard">
        <h1>Restablecer contrasena</h1>
        <p>Ingresa tu nueva contrasena para activar nuevamente tu cuenta.</p>

        {!hasToken && (
          <p className="RecoveryError">
            Token invalido. Solicita un nuevo enlace desde <Link to="/forgot-password">aqui</Link>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="RecoveryForm">
          <label htmlFor="newPassword">Nueva contrasena</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={!hasToken}
          />

          <label htmlFor="confirmPassword">Repetir contrasena</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={!hasToken}
          />

          <button type="submit" disabled={loading || !hasToken}>
            {loading ? "Actualizando..." : "Guardar nueva contrasena"}
          </button>
        </form>

        {formError && <p className="RecoveryError">{formError}</p>}
        {error && <p className="RecoveryError">{error}</p>}
        {successMessage && <p className="RecoveryInfo">{successMessage}</p>}
      </div>
    </section>
  );
}
