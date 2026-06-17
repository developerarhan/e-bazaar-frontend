import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { StarDisplay, StarInput } from "../components/StarRating";
import ReviewSection from "./ReviewSection"
import ProductGrid from "../components/ProductGrid";
import StockBadge from "../components/StockBadge";
import api from "../services/api";


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart} = useCart();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({
    average_rating: 0,
    review_count: 0,
    user_has_reviewed: false,
    user_review_id: null,
  });
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  // Fetch Product
  useEffect(() => {
    setLoading(true);
    api.get(`store/${id}/`)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch live stock — separate from cached product
  const fetchStock = useCallback(() => {
    api.get(`store/${id}/stock/`).then(res => setStock(res.data));
  }, [id]);

  useEffect(() => {
    fetchStock();
    // Poll stock every 30 seconds
    const interval = setInterval(fetchStock, 30000);
    return () => clearInterval(interval);
  }, [fetchStock]);

  // Fetch Reviews
  const fetchReviews = useCallback(() => {
    api.get(`store/${id}/reviews/`).then(res => {
      setReviews(res.data.reviews);
      setReviewMeta({
        average_rating: res.data.average_rating,
        review_count: res.data.review_count,
        user_has_reviewed: res.data.user_has_reviewed,
        user_review_id: res.data.user_review_id,
      });
    });
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Related products
  useEffect(() => {
    if (!product?.id) return;
    
    const fetchRelatedProducts = async () => {
        try {
            const response = await api.get(
                `store/${product.id}/related/`
            );

            setRelated(response.data);
        } catch( error) {
            console.error("Failed to fetch related products:", error)
        }
    };

    fetchRelatedProducts();
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!stock || stock.available_stock < quantity) return;

        setAdding(true);
        setTimeout(() => {
            addToCart(product, quantity);
            setAdding(false);
            setAdded(true);
            // Refresh stock after adding
            fetchStock();
            setTimeout(() => setAdded(false), 2000);
        }, 600);
  };

  const liveStock = stock || {
    available_stock: product?.available_stock || 0,
    stock_status: product?.stock_status || "in_stock",
  }

  const isOutOfStock = liveStock.stock_status === "out_of_stock";
  const maxQuantity = liveStock.available_stock;

  if (loading) {
    return (
        // REFINE Skeleton: updated mood, calm neutrals, match tall aspect ratio
        <div className="max-w-7xl mx-auto px-6 py-16 animate-pulse mt-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                <div className="bg-neutral-200/70 dark:bg-neutral-900/40 rounded-xl aspect-[3/4]" />
                <div className="space-y-6 pt-4">
                    <div className="bg-neutral-200/70 dark:bg-neutral-900/40 h-10 w-3/4 rounded" />
                    <div className="bg-neutral-200/50 dark:bg-neutral-900/30 h-6 w-1/4 rounded" />
                    <div className="bg-neutral-200/70 dark:bg-neutral-900/40 h-24 w-full rounded" />
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
      return (
          // REFINE Palette: premium neutrals
          <div className="max-w-7xl mx-auto px-6 py-28 text-center bg-neutral-100/30 dark:bg-neutral-900/10 rounded-lg mt-10 border border-neutral-100 dark:border-neutral-800/40">
              <p className="text-base text-neutral-500 dark:text-neutral-400 font-light">Product not found.</p>
              <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-950 dark:text-neutral-50 hover:underline underline-offset-4"
              >
                  ← Back to shop
              </Link>
          </div>
      );
  }

  return (
    // REFINE Container: spacier editorial padding, standard text colors
    <div className="max-w-7xl mx-auto px-6 py-16 text-neutral-900 dark:text-neutral-50 mt-10">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* REFINE Image Container: Premium framing, slow cinematic zoom */}
        <div className="relative group overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 shadow-sm transition-all duration-500 group-hover:border-neutral-300/60 dark:group-hover:border-neutral-700/50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-[3/4] object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-103"
          />
          {/* Vignette on hover */}
          <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/[0.01] transition-colors duration-500" />
        </div>

        {/* Product Info */}
        <div className="pt-4 flex flex-col items-start">
          
          {/* REFINE Category: monospace uppercase, refined colors */}
          {product.category_name && (
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono tracking-widest uppercase mb-1">
              {product.category_name}
            </span>
          )}

          {/* REFINE Title: font-light for luxury feel */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-neutral-950 dark:text-neutral-50">{product.title}</h1>

          {/* Rating Summary - Preserved prop logic */}
          <div className="flex items-center gap-2 mt-3 text-sm text-neutral-500 dark:text-neutral-400 font-light">
            <StarDisplay 
              rating={reviewMeta.average_rating}
              size="md"
              // Leave default star color logic
            />
            <span className="font-mono text-xs opacity-80 pt-0.5">
              {reviewMeta.review_count> 0
                ? `(${reviewMeta.review_count})`
                : "(No reviews yet)"
              }
            </span>
          </div>

          {/* REFINE Price: font-mono, distinct weight, ₹ symbol */}
          <p className="text-3xl font-mono tracking-tight font-medium mt-6 text-neutral-950 dark:text-neutral-50">
            ₹{product.price}
          </p>

          {/* Live Stock status - Preserve prop logic */}
          <div className="mt-2.5">
            <StockBadge
              stockStatus={liveStock.stock_status}
              availableStock={liveStock.available_stock}
            />
          </div>

          {/* Description - Standardized typo */}
          <p className="mt-8 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-light max-w-lg">
            {product.description}
          </p>

          {/* Quantity Selector - Refined UI */}
          {!isOutOfStock && (
            <div className="mt-8">
              <p className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase dark:text-neutral-500 mb-2">
                  Quantity
              </p>

              <div className="inline-flex items-center border border-neutral-200/50 dark:border-neutral-800/60 rounded-full overflow-hidden bg-white dark:bg-neutral-900 transition-colors">
                <button
                  className="pl-5 pr-4 py-2.5 text-xl font-light hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                {/* font-mono for number */}
                <span className="px-6 py-2.5 border-x border-neutral-100/80 dark:border-neutral-800/70 font-mono text-sm font-medium text-neutral-950 dark:text-neutral-50 min-w-[5ch] text-center">
                  {quantity}
                </span>

                <button
                  className="pl-4 pr-5 py-2.5 text-xl font-light hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button - Redesigned to custom pill shape */}
          <button
            onClick={handleAddToCart}
            disabled={adding || isOutOfStock}
            className={`mt-10 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              isOutOfStock 
                ? "bg-neutral-150/50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                : added
                ? "bg-emerald-600 text-white dark:bg-emerald-700"
                : adding
                ? "bg-neutral-400 text-neutral-200 dark:bg-neutral-600 dark:text-neutral-400 animate-pulse"
                : "bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-lg active:scale-98"
            }`}
          >
            {isOutOfStock
              ? "Out of Stock"
              : added
              ? "✓ Added to Cart"
              : adding
              ? "Adding..."
              : "Add to Cart"
            }
          </button>
        </div>
      </div>

      {/* Reviews Section - Preserve all props and logic */}
      <ReviewSection
        productId={id}
        reviews={reviews}
        reviewMeta={reviewMeta}
        onReviewChange={fetchReviews}
        user={user}
      />

      {/* Related Products - Standard typo */}
      {related.length > 0 && (
        <div className="mt-28 border-t border-neutral-100 dark:border-neutral-900/40 pt-16">
          <h2 className="text-3xl font-light tracking-tight mb-10 text-neutral-950 dark:text-neutral-50">
            Related Products
          </h2>

          {/* Preserve logic */}
          <ProductGrid products={related} loading={loading} />
        </div>
      )}
    </div>
  );
}