
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { PATHS } from "@/routers/Paths";
import Spinner from "../ui/Spinner";
import type { Role } from "@/types/auth";

export default function RequireAuth({
  children,
  role
}: {
  children: JSX.Element;
  role?: Role;
}) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center h-hero">
      <Spinner className="w-8 h-8" />
    </div>
  );

  if (!user) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  if (role && user.role !== role) {
    // If user doesn't have the required role, redirect to home or a forbidden page
    return <Navigate to={PATHS.ROOT} replace />;
  }

  return children;
}
