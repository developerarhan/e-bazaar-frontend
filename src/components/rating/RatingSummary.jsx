import { StarDisplay } from "../StarRating";
import RatingBar from "./RatingBar";

export default function RatingSummary({ reviewMeta, ratingBreakdown }) {
    const hasReviews = reviewMeta.review_count > 0;

    return (
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs backdrop-blur-md">
            {/* Aggregated Score Hero Display */}
            <div className="text-center pb-5 mb-5 border-b border-zinc-100 dark:border-zinc-800">
                <p className="text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                    {hasReviews ? reviewMeta.average_rating.toFixed(1) : "—"}
                </p>
                
                <div className="flex justify-center mt-2.5">
                    <StarDisplay
                        rating={reviewMeta.average_rating}
                        size="md"
                        showNumer={false}
                    />
                </div>
                
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-2 uppercase tracking-wider">
                    Based on {reviewMeta.review_count > 0
                        ? `${reviewMeta.review_count} ${reviewMeta.review_count === 1 ? "rating" : "ratings"}`
                        : "no ratings yet"
                    }
                </p>
            </div>

            {/* Breakdown Histograms */}
            {hasReviews ? (
                <div className="space-y-2.5">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <RatingBar 
                            key={star}
                            star={star}
                            count={ratingBreakdown[star] || 0}
                            total={reviewMeta.review_count}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 italic py-2">
                    Distributions populate on submission
                </p>
            )}
        </div>
    );
}