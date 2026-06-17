export default function ProductSkeleton() {
  return (
    // REFINE Skeleton: calm neutrals, slow pulse, match ProductCard layout
    <div className="animate-pulse flex flex-col bg-transparent">
      {/* REFINE Image Container: Editorial aspect ratio matching Card */}
      <div className="aspect-[3/4] w-full bg-neutral-200/70 dark:bg-neutral-900/40 rounded-lg" />
      
      {/* Product Details Mock - Adjusting spacing and line weights */}
      <div className="pt-5 pb-2 space-y-3.5">
        {/* Category Mock (Monospace length) */}
        <div className="bg-neutral-200/50 dark:bg-neutral-900/30 h-2.5 w-1/4 rounded mt-0" />
        
        {/* Title Mock (font-light length) */}
        <div className="bg-neutral-200/70 dark:bg-neutral-900/40 h-4.5 w-3/4 rounded mt-1.5" />
        
        {/* Rating Mock */}
        <div className="flex gap-1.5 mt-2">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-neutral-200/50 dark:bg-neutral-900/30 h-3 w-3 rounded-full"/>
            ))}
        </div>
        
        {/* Price Mock (Mono length) */}
        <div className="bg-neutral-200/70 dark:bg-neutral-900/40 h-5 w-1/5 rounded mt-3" />
        
        {/* Stock Status Badge Mock */}
        <div className="bg-neutral-200/50 dark:bg-neutral-900/30 h-3 w-1/3 rounded mt-1.5" />
      </div>
    </div>
  );
}