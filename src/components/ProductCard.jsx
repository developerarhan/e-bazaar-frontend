import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2">
          {product.title}
        </h3>

        <p className="mt-1 font-semibold">₹ {product.price}</p>

        <Link
          to={`/products/${product.id}`}
          className="inline-block mt-3 text-sm text-indigo-600 hover:underline"
        >
          View Product →
        </Link>
      </div>
    </div>
  );
}
