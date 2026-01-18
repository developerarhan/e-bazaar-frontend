import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";


export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addToCart} = useCart();

  useEffect(() => {
    api.get(`store/${id}/`)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!product) return;

    api.get("store/")
      .then(res => {
        const filtered = res.data.results.filter(p => p.id !== product.id).slice(0, 4);
        setRelated(filtered);
      });
  }, [product]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold mt-3">
            ₹{product.price}
          </p>

          {/* Quantity Selector */}
        <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
                Quantity
            </p>

            <div className="inline-flex items-center border rounded-lg overflow-hidden">
                <button
                className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                −
                </button>

                <span className="px-6 py-2 border-x font-medium">
                {quantity}
                </span>

                <button
                className="px-4 py-2 text-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
                >
                +
                </button>
            </div>
        </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            This is a high-quality product designed for modern lifestyles.
            Durable, stylish, and built for daily use.
          </p>

          {/* Add to Cart */}
            <button
            onClick={() => {
                setAdding(true);
                setTimeout(() => {
                addToCart(product, quantity);
                setAdding(false);
                }, 800);
            }}
            disabled={adding}
            className={`px-6 py-3 rounded text-white 
                ${adding ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}
            >
            {adding ? "Adding..." : "Add to Cart"}
            </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded"
                />
                <p className="mt-2 text-sm font-medium line-clamp-2">
                  {item.title}
                </p>
                <p className="font-semibold">₹ {item.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}