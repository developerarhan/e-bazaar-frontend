import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import api from "../services/api";

const SORT_OPTIONS = [
    { label: "Newest", value: "-created_at" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
    { label: "Name A-Z", value: "title" }
]

export default function Products() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const search = query.get("search") || "";
    const [selectedCategory, setSelectedCategory] = useState(
        query.get("category") || ""
    );
    const [sort, setSort] = useState("-created_at");
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [page, setPage] = useState(1);

    // Fetch categories once
    useEffect(() => {
        api.get("store/categories/").then(res => setCategories(res.data));
    }, []);

    // Fetch products when filters change
    useEffect(() => {
        setLoading(true);

        const params = new URLSearchParams({
            page,
            ...(search && {search}),
            ...(selectedCategory && { category: selectedCategory }),
            sort,
        });

        api.get(`store/?${params}`)
            .then((res) => {
                setProducts(res.data.results);
                setNextPage(res.data.next);
                setPrevPage(res.data.previous);
            })
            .finally(() =>setLoading(false));
    }, [page, search, selectedCategory, sort]);

    const handleCategoryChange = (slug) => {
        setSelectedCategory(slug);
        setPage(1);
    };

    const handleSortChange = (value) => {
        setSort(value);
        setPage(1);
    };

    return (
        // REFINE Container: updated padding, mt, standard colors
        <div className="max-w-7xl mx-auto px-6 py-16 text-neutral-900 dark:text-neutral-50 mt-10">
            {/* Page Title */}
            <div className="mb-12 border-b border-neutral-100 dark:border-neutral-900/40 pb-10">
                <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-950 dark:text-neutral-50">
                    {search ? `Results for "${search}"` : "Shop"}
                </h1>
                <p className="text-base text-neutral-500 dark:text-neutral-400 mt-2.5 font-light leading-relaxed max-w-md">
                    Discover our curated collection of refined essentials and timeless designs.
                </p>
            </div>

            {/* REFINE Filters row: spicier interaction, updated palette */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">

                {/* REFINE Category Filter: Custom pill filters, high contrast */}
                <div className="flex gap-2.5 flex-wrap flex-1 items-center">
                    <button
                        onClick={() => handleCategoryChange("")}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedCategory === ""
                                ? "bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 shadow-md"
                                : "bg-neutral-100/60 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 border border-neutral-100/50 dark:border-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-150/60 dark:hover:bg-neutral-800/50"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.slug)}
                            className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all duration-300 ${
                                selectedCategory === cat.slug
                                    ? "bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 shadow-md"
                                    : "bg-neutral-100/60 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 border border-neutral-100/50 dark:border-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-150/60 dark:hover:bg-neutral-800/50"
                            }`}
                        >
                            <span>{cat.name}</span>
                            {/* font-mono for count */}
                            <span className="font-mono text-xs opacity-60 pt-0.5">
                                ({cat.product_count})
                            </span>
                        </button>
                    ))}
                </div>

                {/* REFINE Sort dropdown: updated styling */}
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 border border-neutral-200/50 dark:border-neutral-800 rounded-full text-sm font-medium bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-colors shadow-sm"
                        aria-label="Sort products"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                Sort by: {opt.label}
                            </option>
                        ))}
                    </select>
                    {/* Custom Arrow SVG */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 dark:text-neutral-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>


            {/* Product Grid - Preserve logic and component */}
            <ProductGrid products={products} loading={loading} />

            {/* REFINE Pagination: Pill shape buttons, high contrast, smooth transitions */}
            <div className="flex justify-center items-center gap-6 mt-16 border-t border-neutral-100 dark:border-neutral-900/40 pt-12">
                <button
                    disabled={!prevPage}
                    onClick={() => setPage(page - 1)}
                    className={`group px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        prevPage
                            ? "bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow hover:shadow-lg active:scale-98"
                            : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                    }`}
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span>Previous</span>
                </button>

                {/* font-mono for numbers */}
                <span className="text-neutral-900 dark:text-neutral-100 font-mono text-sm font-medium">
                    Page {page}
                </span>
                
                <button
                    disabled={!nextPage}
                    onClick={() => setPage(page + 1)}
                    className={`group px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        nextPage
                            ? "bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow hover:shadow-lg active:scale-98"
                            : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                    }`}
                >
                  <span>Next</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
            </div>
        </div>
    );
}