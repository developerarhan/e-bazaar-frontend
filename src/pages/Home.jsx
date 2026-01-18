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
        <>
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-4 py-10 md:flex md:items-center md:gap-12">

                {/* Image */}
                <div className="md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                        alt="Hero"
                        className="h-80 w-full rounded-2xl object-cover md:h-[420px]"
                    />
                </div>

                {/* Text */}
                <div className="mt-6 md:mt-0 md:w-1/2">
                    <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                        Premium Products for Everyday Life  
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Discover high-quality items designed to elevate your lifestyle.
                    </p>

                    <Link to="/products">
                        <button className="mt-6 rounded-xl bg-black px-6 py-3 text-white hover:opacity-90 cursor-pointer">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="mb-6 text-2xl font-bold">
                    Featured Products
                </h2>

                <ProductGrid products={products.slice(0, 4)} loading={loading} />
            </section>
            {/* End of Featured Product */}

            {/* New Arrivals */}
            <section className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="mb-6 text-2xl font-bold">
                    New Arrivals
                </h2>
                
                <ProductGrid products={products.slice(-4)} loading={loading} />
            </section>
        </>
    )
}