import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductGrid({ products, loading }) {
    if(loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8}).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if(products.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-gray-500">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}