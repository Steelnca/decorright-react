
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { PATHS } from "@/routers/Paths";
import Spinner from "../ui/Spinner";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center h-hero">
      <Spinner className="w-8 h-8" />
    </div>
  ) ;

  if (!user) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

   return children;
}
