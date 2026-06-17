import { useState } from "react";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import { usePasswordStrength } from "../hooks/usePasswordStrength";

export function PasswordInput({
    name,
    value,
    onChange,
    placeholder = "Password",
    error,
    showStrength = false,
    label = "Password",
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { rules, strength, label: strengthLabel, color, isStrong } = usePasswordStrength(value);

    const showChecker = showStrength && value.length > 0;

    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {label}
            </label>

            {/* Input Field Wrapper */}
            <div className="relative group">
                <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-200"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-4 focus:ring-zinc-500/5 focus:border-zinc-950 dark:focus:border-zinc-400 transition-all duration-150 focus:outline-none ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    }`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {/* Server Error Alert */}
            {error && (
                <p className="text-red-500 text-xs font-medium pl-1 animate-fade-in">{error}</p>
            )}

            {/* Premium Strength Meter */}
            {showChecker && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800/60 rounded-xl space-y-3 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Password Security
                        </span>
                        <span className={`text-xs font-semibold ${
                            strengthLabel === "Weak" ? "text-red-500" :
                            strengthLabel === "Fair" ? "text-yellow-500" :
                            strengthLabel === "Good" ? "text-blue-500" :
                            "text-green-500"
                        }`}>
                            {strengthLabel}
                        </span>
                    </div>

                    {/* Multi-segment style track */}
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
                            style={{ width: `${strength}%` }}
                        />
                    </div>

                    {/* Compact Checklist Grid */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
                        {rules.map((rule) => (
                            <div key={rule.id} className="flex items-center gap-2">
                                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${
                                    rule.passed 
                                        ? "bg-green-50 dark:bg-green-950/30 text-green-500" 
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600"
                                }`}>
                                    {rule.passed ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                                </div>
                                <span className={`text-xs transition-colors duration-200 ${
                                    rule.passed
                                        ? "text-gray-700 dark:text-gray-300 font-medium"
                                        : "text-gray-400 dark:text-gray-500"
                                }`}>
                                    {rule.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}