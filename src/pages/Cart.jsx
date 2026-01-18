import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total,
    grandTotal,
    deliveryCharges,
    tax,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Amazon Cart is empty.</h1>
        <p className="text-gray-600">
          Your shopping cart lives to serve. Give it purpose — fill it with
          groceries, clothing, household supplies, electronics, and more.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-2 bg-green-400 text-black rounded-lg shadow-md hover:bg-green-500"
          >
            Continue shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-lg">
            <h1 className="text-2xl font-bold mb-1">Shopping Cart</h1>
            <p className="text-right text-sm text-gray-500 mb-1">Price</p>
            <div className="border-t text-gray-300 text-lg"></div>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="flex pt-6 pb-2 gap-4 items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-36 h-44 object-contain rounded-md"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="font-semibold text-lg leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Color: Black | Size: M
                      </p>
                      <p className="text-xs text-green-700 font-semibold mt-1">
                        In Stock
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        {/* Quantity Dropdown Style */}
                        <div className="flex items-center border rounded-md overflow-hidden bg-gray-50 shadow-sm">
                          <button
                            className="px-3 py-1 hover:bg-gray-200"
                            onClick={() => decreaseQty(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-4 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 hover:bg-gray-200"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-gray-300">|</span>
                        {/* Remove Button */}
                        <button
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Price (Right) */}
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t text-gray-300 text-lg"></div>
            <div className="text-right mt-3">
                <p className="text-lg">Subtotal ({cart.length} items): <span className="font-bold">₹{total}</span></p>
            </div>
          </div>
          {/* Right Side: Order Summary */}
          <div className="space-y-6 mt-8 lg:mt-0">
            <div className="bg-white shadow-sm rounded-lg p-5">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>₹{tax}</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-bold text-green-700 text-lg">
                  <span>Order Total:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
              <Link 
                to="/checkout"
                className="mt-6 w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-800 font-semibold inline-block text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}