import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const {user} = useAuth();

    if (!user || !user.email) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
