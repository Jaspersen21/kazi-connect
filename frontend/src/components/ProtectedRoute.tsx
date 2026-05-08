import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children

}
export default ProtectedRoute;