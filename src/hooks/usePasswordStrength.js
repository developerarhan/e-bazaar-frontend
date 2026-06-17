import { useMemo } from "react";

// Rules must match backend validators exactly
const RULES = [
    {
        id: "length",
        label: "At least 8 characters",
        test: (pwd) => pwd.length >= 8,
    },
    {
        id: "uppercase",
        label: "One uppercase letter (A-Z)",
        test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
        id: "lowercase",
        label: "One lowercase letter (a-z)",
        test: (pwd) => /[a-z]/.test(pwd),
    },
    {
        id: "number",
        label: "One number (0-9)",
        test: (pwd) => /\d/.test(pwd),
    },
    {
        id: "special",
        label: "One special character (!@#$%...)",
        test: (pwd) => /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;'`~/]/.test(pwd),
    },
    {
        id: "noSpaces",
        label: "No spaces",
        test: (pwd) => !/\s/.test(pwd),
    },
];

export function usePasswordStrength(password) {
    return useMemo(() => {
        if (!password) {
            return {
                rules: RULES.map((r) => ({ ...r, passed: false })),
                strength: 0,
                label: "",
                color: "",
                isStrong: false,
            };
        }

        const rulesWithStatus = RULES.map((rule) => ({
            ...rule,
            passed: rule.test(password),
        }));

        const passedCount = rulesWithStatus.filter((r) => r.passed).length;
        const strength = Math.round((passedCount / RULES.length) * 100);

        // Strength levels
        let label = "";
        let color = "";

        if (strength <= 33) {
            label = "Weak";
            color = "bg-red-500";
        } else if (strength <= 66) {
            label = "Fair";
            color = "bg-yellow-500";
        } else if (strength < 100) {
            label = "Good";
            color = "bg-blue-500";
        } else {
            label = "Strong";
            color = "bg-green-500";
        }

        // Password is only considered strong when ALL rules pass
        const isStrong = rulesWithStatus.every((r) => r.passed);

        return {
            rules: rulesWithStatus,
            strength,
            label,
            color,
            isStrong,
        };
    }, [password]);
}
