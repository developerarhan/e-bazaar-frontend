import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full animate-fadeIn">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={60} className="text-green-600" />
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with <span className="font-semibold">e-Bazaar</span>.
          Your order will be delivered soon.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

            <Link
                to="/orders"
                className="border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
                >
                View My Orders
            </Link>
        </div>
      </div>
    </div>
  );
}