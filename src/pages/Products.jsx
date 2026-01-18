import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import api from "../services/api";

export default function Products() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const search = query.get("search") || "";
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.get(`store/?page=${page}`)
            .then((res) => {
                setProducts(res.data.results);
                setNextPage(res.data.next);
                setPrevPage(res.data.previous);
            })
            .finally(() => setLoading(false));
    }, [page]);

    // Filtered products based on search
    const filteredProducts = products.filter((p) => 
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {search ? `Results for "${search}"` : "Shop"}
                </h1>
                <p className="text-gray-500 mt-1">
                    Discover our curated collection
                </p>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-10">
                <button
                    disabled={!prevPage}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded ${
                        prevPage
                            ? "bg-gray-800 text-white hover:bg-gray-900"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    Previous
                </button>

                <span className="px-4 py-2 text-gray-700 font-semibold">
                    Page {page}
                </span>
                
                <button
                    disabled={!nextPage}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded ${
                        nextPage
                            ? "bg-gray-800 text-white hover:bg-gray-900"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}