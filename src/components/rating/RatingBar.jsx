export default function RatingBar({ star, count, total }) {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

    return (
        <div className="flex items-center gap-3 text-xs sm:text-sm group">
            {/* Left Star Key label */}
            <span className="text-zinc-600 dark:text-zinc-400 w-7 text-right font-medium flex-shrink-0 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
                {star}★
            </span>
            
            {/* Clean Progress Meter Track */}
            <div className="flex-1 bg-zinc-200/70 dark:bg-zinc-800 rounded-full h-2 overflow-hidden relative">
                <div
                    className="bg-amber-400 dark:bg-amber-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(251,191,36,0.2)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            
            {/* Right Value Percentage Label */}
            <span className="text-zinc-400 dark:text-zinc-500 w-10 flex-shrink-0 text-right font-mono tabular-nums text-xs">
                {percentage}%
            </span>
        </div>
    );
}
