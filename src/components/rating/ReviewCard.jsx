import { StarDisplay } from "../StarRating";

export default function ReviewCard({ review, user, onDelete, deleteId }) {
    const isOwn = user && user.id === review.user;

    return (
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-zinc-300/60 dark:hover:border-zinc-700/60 transition-all duration-300">
            {/* Header Layout Grid */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Profile Initial Token Accent */}
                    <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-inner">
                        {review.user_name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Metadata Context stack */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                                {review.user_name}
                            </p>

                            {/* Refined Verified Badge */}
                            {review.verified_purchase && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 px-2 py-0.5 rounded-md flex-shrink-0">
                                    <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                </span>
                            )}
                        </div>

                        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-0.5 font-mono">
                            {new Date(review.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                {/* Inline Action Triggers */}
                {isOwn && (
                    <button
                        onClick={() => onDelete(review.id)}
                        disabled={deleteId === review.id}
                        className="text-xs font-semibold text-red-500 dark:text-red-400/90 hover:text-red-700 dark:hover:text-red-300 hover:underline transition-all disabled:opacity-40 flex-shrink-0"
                    >
                        {deleteId === review.id ? "Deleting..." : "Delete"}
                    </button>
                )}
            </div>

            {/* Core Star Metric */}
            <div className="mt-3.5 flex items-center">
                <StarDisplay rating={review.rating} size="sm" showNumer={false} />
            </div>

            {/* Markdown/Comment block area */}
            <p className="mt-2.5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed break-words font-normal">
                {review.comment}
            </p>

            {/* Soft Fallback Unverified notification */}
            {!review.verified_purchase && (
                <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500 italic tracking-wide">
                    • Product purchase unverified via checkout ledger
                </p>
            )}
        </div>
    );
}