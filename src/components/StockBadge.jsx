export default function StockBadge({ stockStatus, availableStock }) {
    if (stockStatus === "out_of_stock") {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 rounded-full transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400 inline-block shrink-0 animate-pulse" />
                Out of Stock
            </span>
        );
    }

    if (stockStatus === "low_stock") {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 rounded-full transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 inline-block shrink-0" />
                Only {availableStock} left
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-full transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block shrink-0" />
            In Stock
        </span>
    );
}