import { useState } from "react";
import { Loader, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import api from "../../services/api";
import SummaryText from "./SummaryText";

export function AISummary({ productId, reviewCount }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(true);

    if (reviewCount < 3) return null;

    const fetchSummary = async () => {
        if (summary) {
            setExpanded(prev => !prev);
            return ;
        }

        setLoading(true);
        setError("");

        try {
            const res = await api.get(`store/${productId}/reviews/summary/`)
            setSummary(res.data.summary);
            setExpanded(true);
        } catch (err) {
            const msg = err.response?.data?.error;
            setError(msg || "Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6">
            {/* Trigger button */}
            <button
                onClick={fetchSummary}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-all shadow-sm"
            >
                {loading ? (
                    <>
                        <Loader size={15} className="animate-spin" />
                        Analyzing reviews...
                    </>
                ) : (
                    <>
                        <Sparkles size={15} />
                        AI Summary
                        {summary && (
                            expanded
                                ? <ChevronUp size={14} />
                                : <ChevronDown size={14} />
                        )}
                    </>
                )}
            </button>

            {/* Error */}
            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}

            {/* Summary card */}
            {summary && expanded && (
                <div className="mt-3 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-800 rounded-xl p-5">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles size={12} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                            AI Review Summary
                        </span>
                    </div>

                    {/* Summary text — render markdown-like formatting */}
                    <SummaryText text={summary} />
                </div>
            )}
        </div>
    );
}