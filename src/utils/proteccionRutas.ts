import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../Store/hooks.Redux";
import type { JSX } from "react";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) {
  const { token, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!token) navigate("/login");
  if (!allowedRoles.includes(role!)) navigate("/");

  return children;
}
// PROTECCION DE RUTAS
