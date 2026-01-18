import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="mt-4 text-gray-600">
        Your payment could not be processed. Please try again.
      </p>

      <div className="mt-6 flex gap-4">
        <Link to="/checkout">
          <button className="px-6 py-2 bg-black text-white rounded">
            Retry Payment
          </button>
        </Link>

        <Link to="/cart">
          <button className="px-6 py-2 border rounded">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}