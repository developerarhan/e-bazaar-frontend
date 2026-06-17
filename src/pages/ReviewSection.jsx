import { useState } from "react";
import { Link } from "react-router-dom";
import { StarDisplay } from "../components/StarRating";
import ReviewForm from "../components/rating/ReviewForm";
import RatingSummary from "../components/rating/RatingSummary";
import ReviewCard from "../components/rating/ReviewCard";
import api from "../services/api";

export default function ReviewSection({
    productId,
    reviews,
    reviewMeta,
    onReviewChange,
    user,
}) {
    const [showForm, setShownForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [sortBy, setSortBy] = useState("recent"); // recent | helpful | verified | highest | lowest

    // Calculate rating breakdown from reviews array
    const ratingBreakdown = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {});

    // Sort reviews (Preserved logic + added missing conditional mapping for the 'lowest' UI pill)
    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === "verified") {
            if (b.verified_purchase !== a.verified_purchase) {
                return b.verified_purchase ? 1 : -1;
            }
        }
        if (sortBy === "highest") {
            return b.rating - a.rating;
        }
        if (sortBy === "lowest") {
            return a.rating - b.rating;
        }
        // Default: recent
        return new Date(b.created_at) - new Date(a.created_at);
    });

    const handleSubmitReview = async ({ rating, comment }) => {
        setSubmitting(true);
        setSubmitError("");

        try {
            await api.post(`store/${productId}/reviews/`, { rating, comment });
            setShownForm(false);
            onReviewChange();
        } catch (err) {
            const msg = err.response?.data;
            if (typeof msg === "object") {
                setSubmitError(Object.values(msg).flat().join(" "));
            } else {
                setSubmitError("Failed to submit review. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (reviewId) => {
        setDeleteId(reviewId);
        try {
            await api.delete(`store/reviews/${reviewId}/`);
            onReviewChange();
        } catch {
            alert("Failed to delete review.");
        } finally {
            setDeleteId(null);
        }
    };

    const verifiedCount = reviews.filter(r => r.verified_purchase).length;

    return (
        <div className="mt-20 border-t border-zinc-100 dark:border-zinc-800 pt-14 max-w-7xl mx-auto antialiased">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Customer Reviews
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Share your thoughts and feedback with other community members.
                    </p>
                </div>

                {/* Status Actions */}
                <div className="flex items-center self-start sm:self-center">
                    {user && !reviewMeta.user_has_reviewed && !showForm && (
                        <button
                            onClick={() => setShownForm(true)}
                            className="px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Write a Review
                        </button>
                    )}

                    {user && reviewMeta.user_has_reviewed && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 text-xs font-medium">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            You have reviewed this product
                        </div>
                    )}

                    {!user && (
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 group transition-colors"
                        >
                            Login to write a review 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Review Form Component */}
            {showForm && (
                <div className="mb-8 transition-all duration-300 ease-in-out">
                    <ReviewForm
                        onSubmit={handleSubmitReview}
                        onCancel={() => {
                            setShownForm(false);
                            setSubmitError("");
                        }}
                        submitting={submitting}
                        error={submitError}
                    />
                </div>
            )}

            {/* Primary Grid Content */}
            {reviews.length > 0 ? (
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    {/* Sticky Column: Summary Data */}
                    <div className="lg:col-span-1 lg:sticky lg:top-6 space-y-4">
                        <RatingSummary
                            reviewMeta={reviewMeta}
                            ratingBreakdown={ratingBreakdown}
                        />

                        {verifiedCount > 0 && (
                            <div className="flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100/70 dark:border-emerald-900/30 rounded-xl px-4 py-3 shadow-xs">
                                <svg className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">
                                    Includes {verifiedCount} verified {verifiedCount === 1 ? "purchase" : "purchases"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Feed Column: Reviews List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Sort Controller bar */}
                        <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2 flex-shrink-0">
                                Filter feed:
                            </span>
                            {[
                                { value: "recent", label: "Most Recent" },
                                { value: "verified", label: "Verified First" },
                                { value: "highest", label: "Highest Rated" },
                                { value: "lowest", label: "Lowest Rated" },
                            ].map((opt) => {
                                const isActive = sortBy === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSortBy(opt.value)}
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex-shrink-0 ${
                                            isActive
                                                ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-50 shadow-xs"
                                                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Paginated / Sorted review cards */}
                        <div className="space-y-4">
                            {sortedReviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    user={user}
                                    onDelete={handleDelete}
                                    deleteId={deleteId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                /* Beautiful Empty State */
                <div className="text-center py-16 px-4 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 mb-4 text-xl">
                        ✦
                    </div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                        No reviews posted yet
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
                        {user
                            ? "Be the first to share your product experience with the community!"
                            : "Login to leave a review and let others know what you think."}
                    </p>
                    {user && !showForm && (
                        <button
                            onClick={() => setShownForm(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium shadow-xs transition-colors"
                        >
                            Write the First Review
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}