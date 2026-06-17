import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Inbox } from "lucide-react";
import api from '../services/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [oauthProvider, setOauthProvider] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOauthProvider(null);
        
        try {
            await api.post("accounts/password-reset/", { email });
            setSent(true);
        } catch (err) {
            const data = err.response?.data;
            if (data?.auth_provider) {
                setOauthProvider(data.auth_provider);
                setError(data.error);
            } else {
                setError(data?.error || "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Editorial Success State View
    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
                        <Inbox size={24} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Check your inbox
                        </h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 px-4 leading-relaxed">
                            A secure, single-use authentication sequence link has been dispatched to:
                        </p>
                        <p className="inline-block px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 text-sm font-mono text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            {email}
                        </p>
                    </div>

                    <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed px-2">
                        Can't find the transmission? Inspect your secondary sorting tabs or spam directories before triggering a new initialization loop.
                    </p>

                    <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-3 text-xs text-amber-800 dark:text-amber-400 font-medium">
                        ⏰ Key parameter expires automatically within 1 hour.
                    </div>

                    <button
                        onClick={() => {
                            setSent(false);
                            setEmail("");
                        }}
                        className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 underline underline-offset-4 transition-colors"
                    >
                        Try alternative account email
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors duration-200">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-850 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6">
                
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={13} strokeWidth={2.5} />
                    Back to login
                </Link>

                <div className="space-y-1.5">
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                        Reset configuration
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Input your verified destination email address below and our routing engine will deploy a password initialization link.
                    </p>
                </div>

                {/* Managed OAuth Layout Wrapper */}
                {oauthProvider && (
                    <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 rounded-xl p-4 space-y-3 animate-fade-in">
                        <p className="text-xs text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                            {error}
                        </p>
                        <Link
                            to="/login"
                            className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline tracking-wide"
                        >
                            Proceed via External SSO Gateway →
                        </Link>
                    </div>
                )}

                {/* Styled Inline Errors */}
                {error && !oauthProvider && (
                    <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 rounded-xl px-4 py-3 text-xs font-medium text-red-700 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Email address
                        </label>
                        <div className="relative group">
                            <Mail
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-950 dark:group-focus-within:text-neutral-50 transition-colors"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                    setOauthProvider(null);
                                }}
                                placeholder="name@domain.com"
                                required
                                autoFocus
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-neutral-950 dark:focus:border-neutral-50 focus:ring-1 focus:ring-neutral-950 dark:focus:ring-neutral-50 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 mt-2 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-xl font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed shadow-sm transition-all duration-150 text-sm tracking-wide"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Deploying link...
                            </span>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}