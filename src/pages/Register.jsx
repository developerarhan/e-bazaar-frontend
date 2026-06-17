import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, User, CheckCircle, ArrowRight } from "lucide-react";
import { PasswordInput } from "../components/PasswordInput";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import api from "../services/api";

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" className="shrink-0">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    );
}

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [googleLoading, setGoogleLoading] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState(null);

    const { isStrong } = usePasswordStrength(form.password);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!isStrong) newErrors.password = "Please meet all password requirements";
        if (form.password !== form.confirm_password) newErrors.confirm_password = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const data = await register(form);
            setRegisteredEmail(data.email);
        } catch (err) {
            const serverErrors = err.response?.data;

            if (serverErrors) {
                const mappedErrors = {};
                if (serverErrors.email) {
                    mappedErrors.email = Array.isArray(serverErrors.email) ? serverErrors.email[0] : serverErrors.email;
                }
                if (serverErrors.password) {
                    mappedErrors.password = Array.isArray(serverErrors.password) ? serverErrors.password.join(" ") : serverErrors.password;
                }
                if (serverErrors.confirm_password) {
                    mappedErrors.confirm_password = Array.isArray(serverErrors.confirm_password) ? serverErrors.confirm_password[0] : serverErrors.confirm_password;
                }
                if (serverErrors.non_field_errors) {
                    mappedErrors.general = serverErrors.non_field_errors[0];
                }
                setErrors(mappedErrors);
            } else {
                setErrors({ general: "Registration failed. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            const res = await api.get("accounts/oauth/google/");
            window.location.href = res.data.auth_url;
        } catch {
            setErrors({ general: "Failed to connect to Google. Please try again." });
            setGoogleLoading(false);
        }
    };

    if (registeredEmail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-2xl shadow-xl shadow-zinc-200/40 dark:shadow-none w-full max-w-md text-center animate-fade-in">
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                        <Mail size={26} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                        Verify your email
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">
                        We sent a secure verification link to
                    </p>
                    <p className="font-semibold text-zinc-900 dark:text-white mb-6 bg-zinc-50 dark:bg-zinc-800/50 py-1.5 px-3 rounded-xl inline-block text-sm max-w-full truncate">
                        {registeredEmail}
                    </p>
                    <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-5 mt-2">
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1.5">
                            <CheckCircle size={12} />
                            Link expires in 24 hours.
                        </p>
                        <div className="mt-4 text-sm text-zinc-500">
                            Didn't get it? <ResendButton email={registeredEmail} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-2xl shadow-xl shadow-zinc-200/40 dark:shadow-none w-full max-w-md">
                
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Already have one?{" "}
                        <Link to="/login" className="text-zinc-900 dark:text-white font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {errors.general && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-800 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400 rounded-xl px-4 py-3 text-sm mb-5">
                        {errors.general}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading || loading}
                    className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-zinc-200 dark:border-zinc-700/80 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-medium text-zinc-700 dark:text-zinc-300 text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
                >
                    {googleLoading ? (
                        <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <GoogleIcon />
                    )}
                    {googleLoading ? "Connecting to Google..." : "Continue with Google"}
                </button>

                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 border-t border-zinc-100 dark:border-zinc-800" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">or register with email</span>
                    <div className="flex-1 border-t border-zinc-100 dark:border-zinc-800" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Full name
                        </label>
                        <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-4 focus:ring-zinc-500/5 focus:border-zinc-950 dark:focus:border-zinc-400 transition-all duration-150
                                    ${errors.name ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10" : "border-zinc-200 dark:border-zinc-700"}`}
                            />
                        </div>
                        {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-4 focus:ring-zinc-500/5 focus:border-zinc-950 dark:focus:border-zinc-400 transition-all duration-150
                                    ${errors.email ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10" : "border-zinc-200 dark:border-zinc-700"}`}
                            />
                        </div>
                        {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <PasswordInput
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        error={errors.password}
                        showStrength={true}
                        label="Password"
                    />

                    <PasswordInput
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        error={errors.confirm_password}
                        showStrength={false}
                        label="Confirm password"
                    />

                    <button
                        type="submit"
                        disabled={loading || !isStrong}
                        className="w-full mt-2 py-2.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-xl font-semibold text-sm hover:bg-zinc-900 dark:hover:bg-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 disabled:cursor-not-allowed shadow-md shadow-zinc-950/10 dark:shadow-none transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>

                    {!isStrong && form.password.length > 0 && (
                        <p className="text-[11px] text-center text-zinc-400 dark:text-zinc-500 font-medium">
                            Meet all password requirements to proceed.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

function ResendButton({ email }) {
    const [state, setState] = useState("idle");

    const handleResend = async () => {
        setState("loading");
        try {
            await api.post("accounts/resend-verification/", { email });
            setState("sent");
        } catch {
            setState("idle");
        }
    };

    if (state === "sent") {
        return <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm ml-1">Sent! Check your inbox.</span>;
    }

    return (
        <button
            onClick={handleResend}
            disabled={state === "loading"}
            className="text-zinc-900 dark:text-white font-semibold underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-50 text-sm ml-1"
        >
            {state === "loading" ? "Sending..." : "Resend email"}
        </button>
    );
}