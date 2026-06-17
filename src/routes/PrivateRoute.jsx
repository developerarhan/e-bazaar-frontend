import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const {user} = useAuth();
    const location = useLocation();

    
    if (!user || !user.email) {
        return <Navigate 
            to="/login"
            replace
            state={{
                from: location.pathname,
                message: "Please sign in to continue.",
            }}
        />;
    }

    return children;
}
