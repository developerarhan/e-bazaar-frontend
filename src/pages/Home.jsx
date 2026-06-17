import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../services/api";
import ProductGrid from "../components/ProductGrid"

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("store/")
        .then(res => setProducts(res.data.results))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:py-28 border-b border-neutral-100 dark:border-neutral-900/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Text block */}
                    <div className="lg:col-span-6 flex flex-col items-start text-left order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-150/50 dark:bg-neutral-900/60 border border-neutral-200/30 dark:border-neutral-800/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-pulse"></span>
                            <span className="text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                                e-bazaar // curation 2026
                            </span>
                        </div>
                        
                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
                            Premium <span className="font-serif italic font-normal text-neutral-800 dark:text-neutral-200">objects</span> <br className="hidden sm:inline" />
                            for everyday life
                        </h1>

                        <p className="mt-6 text-base md:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-md">
                            Discover high-quality items designed to elevate your lifestyle. A curated selection of simplicity, utility, and refined aesthetics.
                        </p>

                        <Link to="/products" className="group inline-flex items-center gap-3 mt-8 px-6 py-3.5 bg-neutral-950 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 rounded-full font-medium text-sm transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-lg active:scale-98 cursor-pointer">
                            <span>Shop the Collection</span>
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Image block */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="relative group overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                alt="Hero Collection"
                                className="h-80 w-full object-cover md:h-[480px] transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                            />
                            <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded border border-neutral-200/20 dark:border-neutral-800/30 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                                ref. 523275335684
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Values Section */}
            <section className="mx-auto max-w-7xl px-6 py-16 border-b border-neutral-100 dark:border-neutral-900/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                    <div>
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase dark:text-neutral-500">01 / DESIGN</span>
                        <h3 className="mt-3 text-lg font-medium">Timeless Aesthetic</h3>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                            We design with permanence in mind. Our products transcend short-lived trends, offering lasting visual appeal and structural durability.
                        </p>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase dark:text-neutral-500">02 / ORIGIN</span>
                        <h3 className="mt-3 text-lg font-medium">Artisanal Integrity</h3>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                            Every piece is sourced from selected workshops that respect their craftsmen, materials, and local environmental standards.
                        </p>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase dark:text-neutral-500">03 / PURPOSE</span>
                        <h3 className="mt-3 text-lg font-medium">Conscious Luxury</h3>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                            By investing in high-quality materials and classic design, we promote a mindful lifestyle that values quality over sheer quantity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="mx-auto max-w-7xl px-6 py-20 border-b border-neutral-100 dark:border-neutral-900/40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline mb-12">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                            <span>01</span>
                            <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                            <span>Curated Selection</span>
                        </div>
                        <h2 className="mt-3 text-3xl font-light tracking-tight">
                            Featured <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">Products</span>
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:pl-8 border-l-0 md:border-l border-neutral-200/40 dark:border-neutral-800/40">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-lg">
                            A selected edit of our finest offerings. Each piece is chosen for its exceptional design, structural integrity, and timeless aesthetic.
                        </p>
                    </div>
                </div>
                
                <div className="mt-8">
                    <ProductGrid products={products.slice(0, 4)} loading={loading} />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline mb-12">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                            <span>02</span>
                            <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800"></span>
                            <span>The Latest</span>
                        </div>
                        <h2 className="mt-3 text-3xl font-light tracking-tight">
                            New <span className="font-serif italic font-normal text-neutral-700 dark:text-neutral-300">Arrivals</span>
                        </h2>
                    </div>
                    <div className="md:col-span-7 md:pl-8 border-l-0 md:border-l border-neutral-200/40 dark:border-neutral-800/40">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-lg">
                            Our newest arrivals, embodying the latest developments in materials, design, and artisan-level production methods.
                        </p>
                    </div>
                </div>
                
                <div className="mt-8">
                    <ProductGrid products={products.slice(-4)} loading={loading} />
                </div>
            </section>
        </div>
    )
}