import { Star } from "lucide-react";

export function StarDisplay({ rating, size = "sm", showNumer = true }) {
    const iconSizes = {
        sm: 14,
        md: 18,
        lg: 22,
    };

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= Math.round(rating);
                    return (
                        <Star
                            key={star}
                            size={iconSizes[size] || 14}
                            className={`${
                                isFilled
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-200 dark:text-gray-700"
                            } shrink-0`}
                        />
                    );
                })}
            </div>
            {showNumer && (
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 pl-0.5 mt-0.5">
                    {rating > 0 ? rating.toFixed(1) : "No ratings"}
                </span>
            )}
        </div>
    );
}

export function StarInput({ value, onChange }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= value;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className="p-0.5 transition-transform duration-100 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none group"
                    >
                        <Star
                            size={26}
                            className={`transition-colors duration-150 ${
                                isFilled
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-200 dark:text-gray-700 group-hover:text-amber-300"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}