import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks.Redux";
import { forgotPasswordUser } from "../Store/auth/auth.Thunks";
import "../styles/authRecovery.css";

const GENERIC_SUCCESS_MESSAGE =
  "Si el email existe, enviaremos instrucciones para restablecer la contrasena.";

export function ForgotPassword() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      await dispatch(forgotPasswordUser({ email: email.trim() })).unwrap();
    } catch {
      // Mensaje generico por seguridad.
    } finally {
      setMessage(GENERIC_SUCCESS_MESSAGE);
      setEmail("");
    }
  };

  return (
    <section className="RecoveryPage">
      <div className="RecoveryCard">
        <h1>Recuperar contrasena</h1>
        <p>Ingresa tu email y te enviaremos un enlace para restablecer tu clave.</p>

        <form onSubmit={handleSubmit} className="RecoveryForm">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="usuario@mail.com"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {message && <p className="RecoveryInfo">{message}</p>}
      </div>
    </section>
  );
}
