import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductGrid({ products, loading }) {
    if(loading) {
        return (
            // REFINE Grid: Reduced base columns to cols-1/sm:cols-2 to give larger editorial presence for taller cards, adjusted gap
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {Array.from({ length: 8}).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if(products.length === 0) {
        return (
            <div className="text-center py-28 bg-neutral-100/40 dark:bg-neutral-900/10 rounded-lg border border-neutral-200/30 dark:border-neutral-800/20 px-6">
                <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-50 mb-2">No products found</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                    Try adjusting your filters or search terms. A curated selection will appear shortly.
                </p>
            </div>
        );
    }

    return (
        // REFINE Grid: Reduced base columns to cols-1/sm:cols-2, adjusted gap for taller editorial cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => (                
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}