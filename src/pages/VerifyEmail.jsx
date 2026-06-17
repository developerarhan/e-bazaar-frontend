import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { updateUser } = useAuth();

    const token = searchParams.get('token');

    // Three states: verifying | success | error
    const [state, setState] = useState("verifying");
    const [errorMessage, setErrorMessage] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!token) {
            setState("error");
            setErrorMessage("No verification token found in this link.");
            return;
        }

        const verify = async () => {
            try {
                const res = await api.post("accounts/verify-email/", { token });

                // Backend logged us in — update auth context
                updateUser(res.data.user);

                setState("success");

                // Redirect to products after 2 seconds
                setTimeout(() => navigate("/products"), 2000);
            } catch (err) {
                setState("error");

                const code = err.response?.data?.code;
                const message = err.response?.data?.error;

                if (code === "token_expired") {
                    setIsExpired(true);
                    setErrorMessage("This verification link has expired.");
                } else {
                    setErrorMessage(message || "This link is invalid or has already been used.");
                }
            }
        };

        verify();
    }, [token]);

    // Verifying state view
    if (state === "verifying") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
                <div className="text-center space-y-3">
                    <Loader size={36} className="animate-spin text-neutral-950 dark:text-neutral-50 mx-auto" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold tracking-wide text-neutral-950 dark:text-neutral-50">Verifying your secure token sequence...</p>
                        <p className="text-neutral-400 dark:text-neutral-500 text-xs">
                            This transaction initialization takes only a moment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Success state view
    if (state === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">

                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
                        <CheckCircle size={26} className="text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Identity Confirmed
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed px-4">
                            Your profile index is now fully active. Redirecting sequence straight to the showroom marketplace...
                        </p>
                    </div>

                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1 overflow-hidden">
                        <div className="bg-neutral-950 dark:bg-neutral-50 h-full rounded-full animate-[grow_2s_ease-in-out_forwards]" />
                    </div>

                    <Link
                        to="/products"
                        className="inline-block px-6 py-2.5 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 text-sm tracking-wide shadow-sm transition-colors duration-150"
                    >
                        Enter Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    // Error state view
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">

                <div className="w-14 h-14 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-red-500/5">
                    <XCircle size={26} className="text-red-500" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        {isExpired ? "Token Cycle Expired" : "Invalid Token Link"}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed px-4">
                        {errorMessage}
                    </p>
                </div>

                {isExpired ? (
                    <ResendSection />
                ) : (
                    <div className="flex flex-col gap-3 pt-2">
                        <Link
                            to="/register"
                            className="w-full py-2.5 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 text-sm tracking-wide shadow-sm transition-all"
                        >
                            Create Alternate Credentials
                        </Link>
                        <Link
                            to="/login"
                            className="w-full py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-950 text-sm tracking-wide transition-all"
                        >
                            Return to Login Gateway
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Resend section subcomponent styled inside the premium layout rule
function ResendSection() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("idle");

    const handleResend = async (e) => {
        e.preventDefault();
        setState("loading");

        try {
            await api.post("accounts/resend-verification/", { email });
            setState("sent");
        } catch {
            setState("error");
        }
    };

    if (state === "sent") {
        return (
            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 rounded-xl p-4 text-emerald-700 dark:text-emerald-400 text-xs font-medium animate-fade-in">
                Transmission complete. Review your inbox destination tabs for your fresh path link.
            </div>
        );
    }

    return (
        <form onSubmit={handleResend} className="space-y-4 text-left pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Target deployment email
                </label>
                <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-50 focus:ring-1 focus:ring-neutral-950 dark:focus:ring-neutral-50 transition-all duration-200"
                />
            </div>
            
            <button
                type="submit"
                disabled={state === "loading"}
                className="w-full py-2.5 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed shadow-sm transition-all text-sm tracking-wide"
            >
                {state === "loading" ? "Deploying link sequence..." : "Resend Verification Sequence"}
            </button>
        </form>
    );
}