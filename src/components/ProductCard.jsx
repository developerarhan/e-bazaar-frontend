import { Link } from "react-router-dom";
import { StarDisplay } from "./StarRating";
import StockBadge from "./StockBadge";

export default function ProductCard({ product }) {
  const isOutOfStock = product.stock_status === "out_of_stock";

  return (
    // REFINE Container: Premium neutral colors, fine-line borders, subtle group-based hover
    <div className={`group bg-transparent text-neutral-900 dark:text-neutral-100 transition-all duration-300 ${
      isOutOfStock ? "opacity-60" : "hover:-translate-y-0.5"
    }`}>
      
      {/* REFINE Image Container: Strict editorial aspect ratio (canvas), premium framing, slow cinematic zoom */}
      <div className="relative group overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/40 shadow-sm transition-all duration-500 group-hover:border-neutral-300/60 dark:group-hover:border-neutral-700/50">
        <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            // Add zoom animation classes
            className="h-full w-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          {/* Subtle Vignette on hover */}
          <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/[0.01] transition-colors duration-500" />
        </Link>
        
        {/* RE-STYLE Out of Stock: Sophisticated overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/50 dark:bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <span className="text-[10px] font-mono tracking-widest text-white dark:text-neutral-100 uppercase bg-red-600 dark:bg-red-700 px-3 py-1.5 rounded-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details - Redesigning layout and typography */}
      <div className="pt-5 pb-2">
        {/* REFINE Category: monospace uppercase, refined colors */}
        {product.category_name && (
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono tracking-widest uppercase">
            {product.category_name}
          </span>
        )}

        {/* REFINE Title: font-light for luxury feel, link only on title now (more premium) */}
        <h3 className="text-sm sm:text-base font-light line-clamp-1 text-neutral-950 dark:text-neutral-50 mt-1.5 hover:underline underline-offset-4">
          <Link to={`/products/${product.id}`} className="cursor-pointer">
            {product.title}
          </Link>
        </h3>

        {/* REFINE Rating: Preserve prop logic exactly, refine surrounding text */}
        <div className="mt-2 flex items-center gap-1.5">
          <StarDisplay
            rating={product.average_rating || 0}
            size="sm"
            // Color can be set inside StarDisplay or globally, leaving default for now
            showNumer={product.review_count > 0}
          />
          {product.review_count > 0 && (
            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              ({product.review_count})
            </span>
          )}
        </div>

        {/* REFINE Price: font-mono for numbers, distinct weight, keep ₹ symbol */}
        <p className="mt-3 text-lg font-mono font-medium tracking-tight text-neutral-950 dark:text-neutral-50">₹{product.price}</p>

        {/* Stock Status - Preserve prop logic and location */}
        <div className="mt-1.5">
          <StockBadge 
            stockStatus={product.stock_status}
            availableStock={product.available_stock}
          />
        </div>

        {/* Removed basic 'View Product' link. The whole card or specific links like title are linked for maximum premium feel */}
      </div>
    </div>
  );
}