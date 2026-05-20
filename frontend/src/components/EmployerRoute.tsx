import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useAuth } from "../context/useAuth";

type EmployerRouteProps = {
  children: React.ReactNode;
};

export default function EmployerRoute({
  children,
}: EmployerRouteProps) {
  const { isLoggedIn } = useAuth();
  const { data: currentUser, isLoading } = useCurrentUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <p className="p-8 text-slate-600">
        Checking permissions...
      </p>
    );
  }

  if (currentUser?.role !== "employer") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}