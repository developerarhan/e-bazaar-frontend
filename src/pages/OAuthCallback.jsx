import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setOAuthUser, logout } = useAuth(); 
    const [error, setError] = useState("");

    const hasRun = useRef(false);

     useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");

        // User denied access on Google's page
        if (errorParam) {
            navigate("/login", {
                state: { message: "Google login was cancelled." }
            });
            return;
        }

        if (!code) {
            navigate("/login", {
                state: { message: "No authorization code received." }
            });
            return;
        }

        const handleCallback = async () => {
            try {
                const res = await api.post(
                    "accounts/oauth/google/callback/",
                    { code }
                );

                // Update auth context with user data
                // Cookies are set by backend automatically
                setOAuthUser(res.data.user);

                // New user → go to products with welcome message
                // Existing user → go to where they were
                if (res.data.is_new_user) {
                    navigate("/products", {
                        replace: true,
                        state: { message: "Welcome to E-Bazaar!" }
                    });
                } else {
                    navigate("/", { replace: true });
                }

            } catch (err) {
                const message = err.response?.data?.error
                    || "Google login failed. Please try again.";

                setError(message);

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        };

        handleCallback();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md max-w-md w-full">
                    <div className="text-red-500 text-5xl mb-4">✗</div>
                    <h2 className="text-xl font-bold mb-2 dark:text-white">
                        Login Failed
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {error}
                    </p>
                    <p className="text-sm text-gray-400">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <Loader
                    size={48}
                    className="animate-spin text-black dark:text-white mx-auto mb-4"
                />
                <p className="text-lg font-medium dark:text-white">
                    Completing Google login...
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Please wait a moment.
                </p>
            </div>
        </div>
    );
}