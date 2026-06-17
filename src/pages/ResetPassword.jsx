import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, CheckCircle, XCircle, Loader } from "lucide-react";
import { PasswordInput } from "../components/PasswordInput";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import api from "../services/api";

export default function ResetPassword() {
    // This grabs the :uid and :token from the URL bar!
    const { uidb64, token } = useParams(); 
    const navigate = useNavigate();

    // Three states for the page:
    // "validating" → checking if link is valid
    // "valid"      → show the new password form
    // "invalid"    → link expired or tampered
    
    const [pageState, setPageState] = useState("validating");
    const [userEmail, setUserEmail] = useState("");
    const [validationError, setValidationError] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { isStrong } = usePasswordStrength(newPassword);

    // Step 1: Validate token when page loads
    useEffect(() => {
        if (!uidb64 || !token) {
            setPageState("invalid");
            setValidationError("Invalid reset link.");
            return;
        }

        api.get(`accounts/password-reset-validate/${uidb64}/${token}/`)
            .then(res => {
                setUserEmail(res.data.email);
                setPageState("valid");
            })
            .catch(err => {
                const data = err.response?.data;
                setPageState("invalid");
                setValidationError(
                    data?.error || "This reset link is invalid or has expired."
                );
            });
    }, [uidb64, token]);

    // Step 2: Submit new password
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isStrong) {
            setError("Please meet all password requirements.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await api.post("accounts/password-reset-confirm/", {
                uidb64,
                token,
                new_password: newPassword
            });
            setSuccess(true);

            // Redirect to login after 3 seconds
            setTimeout(() => navigate("/login", {
                state: {
                    message: "Password reset successful. Please log in with your new password."
                }
            }), 3000);
        } catch (err) {
             const data = err.response?.data;

            if (data?.code === "token_invalid") {
                // Token expired between validate and confirm
                // (can happen if user has two tabs open)
                setPageState("invalid");
                setValidationError(
                    "This link expired while you were using it. Please request a new one."
                );
            } else if (Array.isArray(data?.error)) {
                setError(data.error.join(" "));
            } else {
                setError(
                    data?.error ||
                    "Failed to reset password. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // Validating state
    if (pageState === "validating") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
                <div className="text-center space-y-3">
                    <Loader
                        size={36}
                        className="animate-spin text-neutral-950 dark:text-neutral-50 mx-auto"
                    />
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-wide">
                        Validating your secure sequence reset link...
                    </p>
                </div>
            </div>
        );
    }

    // Invalid link state
    if (pageState === "invalid") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
                    <div className="w-14 h-14 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-red-500/5">
                        <XCircle size={26} className="text-red-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Link Expired
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed px-2">
                            {validationError}
                        </p>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                        <Link
                            to="/forgot-password"
                            className="w-full block py-2.5 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm tracking-wide shadow-sm"
                        >
                            Request New Reset Link
                        </Link>
                        <Link
                            to="/login"
                            className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 uppercase tracking-widest transition-colors pt-1"
                        >
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
                        <CheckCircle size={26} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Password Reset!
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed px-4">
                            Your parameters have been updated successfully. Redirecting to initialization access...
                        </p>
                    </div>
                    
                    {/* Linear progress track matching E-Bazaar specs */}
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-1 overflow-hidden">
                        <div className="bg-neutral-950 dark:bg-neutral-50 h-full rounded-full animate-[grow_3s_ease-in-out_forwards]" />
                    </div>
                    
                    <Link
                        to="/login"
                        className="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 underline underline-offset-4 transition-colors"
                    >
                        Go to login now →
                    </Link>
                </div>
            </div>
        );
    }

    // New password form
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">

                <div className="w-12 h-12 bg-neutral-950 dark:bg-neutral-50 rounded-xl flex items-center justify-center shadow-sm">
                    <Lock size={18} className="text-neutral-50 dark:text-neutral-950" />
                </div>

                <div className="space-y-1.5">
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        Set new password
                    </h2>

                    {/* Styled targeted account metadata */}
                    {userEmail && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Target Identity:{" "}
                            <span className="inline-block px-2 py-0.5 bg-neutral-50 dark:bg-neutral-950 font-mono text-neutral-800 dark:text-neutral-200 rounded border border-neutral-200 dark:border-neutral-800">
                                {userEmail}
                            </span>
                        </p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 rounded-xl px-4 py-3 text-xs font-medium text-red-700 dark:text-red-400 animate-fade-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* New password with strength meter */}
                    <PasswordInput
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError("");
                        }}
                        label="New Password"
                        placeholder="Create complex password"
                        showStrength={true}
                    />

                    {/* Confirm password container */}
                    <div className="space-y-2">
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Confirm New Password
                        </label>
                        <div className="relative group">
                            <Lock
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-950 dark:group-focus-within:text-neutral-50 transition-colors"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Repeat choice sequence"
                                className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 focus:outline-none transition-all duration-200 focus:ring-1 ${
                                    confirmPassword && newPassword !== confirmPassword
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                                        : confirmPassword && newPassword === confirmPassword
                                        ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/50"
                                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-950 dark:focus:border-neutral-50 focus:ring-neutral-950 dark:focus:ring-neutral-50"
                                }`}
                            />
                        </div>

                        {/* Inline match micro-indicator */}
                        {confirmPassword && (
                            <p className={`text-[11px] font-medium pl-1 tracking-wide animate-fade-in ${
                                newPassword === confirmPassword
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-red-500 dark:text-red-400"
                            }`}>
                                {newPassword === confirmPassword
                                    ? "✓ Match sequence verified"
                                    : "✗ Match mismatch encountered"
                                }
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isStrong || newPassword !== confirmPassword}
                        className="w-full py-2.5 mt-2 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed shadow-sm transition-all text-sm tracking-wide"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Customizing parameters...
                            </span>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}