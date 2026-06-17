import { useState } from "react";
import { StarInput } from "../StarRating";

export default function ReviewForm({ onSubmit, onCancel, submitting, error }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [localError, setLocalError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError("");

        if (rating === 0) {
            setLocalError("Please choose a score rating using the star metric row.");
            return;
        }
        if (comment.trim().length < 10) {
            setLocalError("Your text summary statement must contain at least 10 valid characters.");
            return;
        }

        onSubmit({ rating, comment: comment.trim() });
    };

    const displayError = localError || error;

    return (
        <div className="bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs max-w-3xl">
            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mb-5 tracking-tight">
                Create Assessment Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Interactive Star Array Selector wrapper */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-4 rounded-xl shadow-xs">
                    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                        Product Score Metric
                    </p>
                    <div className="flex items-center gap-3">
                        <StarInput value={rating} onChange={setRating} />
                        {rating > 0 && (
                            <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md animation-fade-in">
                                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                            </span>
                        )}
                    </div>
                </div>

                {/* Text comment payload block */}
                <div>
                    <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 block">
                        Review Statement Text
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        placeholder="What details stood out to you? Share aspects detailing context, configuration setup, deployment, or fit."
                        maxLength={1000}
                        className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent text-sm resize-none transition-all shadow-xs"
                    />
                    
                    {/* Status character length analytics summary tracking row */}
                    <div className="flex justify-between mt-1.5 px-0.5">
                        <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                            Minimum context: 10 chars
                        </span>
                        <span className={`text-[11px] font-mono font-medium ${
                            comment.length > 900
                                ? "text-amber-500"
                                : "text-zinc-400 dark:text-zinc-500"
                        }`}>
                            {comment.length} / 1000
                        </span>
                    </div>
                </div>

                {/* Conditional Dynamic Alerts */}
                {displayError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full flex-shrink-0 animate-pulse" />
                        <p className="text-red-600 dark:text-red-400 text-xs font-medium">
                            {displayError}
                        </p>
                    </div>
                )}

                {/* Submission Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-xl text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 shadow-sm active:scale-[0.98] transition-all"
                    >
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            "Submit Review"
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}