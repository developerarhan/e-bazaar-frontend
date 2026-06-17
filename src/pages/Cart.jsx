import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRICING } from "../config/pricing";

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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="text-7xl mb-6 inline-block animate-bounce duration-1000">🛒</div>
        <h1 className="text-3xl font-bold mb-3 text-black dark:text-white tracking-tight">
          Your Cart is empty.
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 text-sm sm:text-base">
          Looks like you haven't added anything to your cart yet. Explore our curated items!
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transform active:scale-95 transition-all shadow-sm font-medium text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white tracking-tight">
          Shopping Cart
        </h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-10 items-start">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700/80 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-700/60 px-6">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            {/* Subtotal row */}
            <div className="bg-gray-50/50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-700/80 px-6 py-5 text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}):{" "}
                <span className="text-xl font-bold text-black dark:text-white ml-1">
                  ₹{total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Right Side: Order Summary Card (Sticky) */}
          <div className="mt-8 lg:mt-0 lg:sticky lg:top-24">
            <OrderSummary
              total={total}
              deliveryCharges={deliveryCharges}
              tax={tax}
              grandTotal={grandTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const itemTotal = Number(item.price) * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row py-6 gap-4 sm:items-center justify-between group transition-all">
      <div className="flex gap-4 items-start sm:items-center flex-1 min-w-0">
        {/* Product image container with smooth wrapper */}
        <div className="w-20 h-24 sm:w-24 sm:h-28 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-gray-600/60 p-2 group-hover:shadow-sm transition-all duration-300">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details stack */}
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-sm sm:text-base leading-snug text-black dark:text-white line-clamp-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            {item.title}
          </h2>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              In Stock
            </p>
          </div>

          {/* Unit price tag */}
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">
            ₹{Number(item.price).toFixed(2)} each
          </p>

          {/* Actions & counter line */}
          <div className="flex items-center gap-4 mt-3.5">
            <div className="flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={onDecrease}
                disabled={item.quantity <= 1}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-gray-200/60 dark:hover:bg-gray-800 disabled:opacity-30 text-black dark:text-white transition-colors active:scale-95 font-semibold text-xs sm:text-sm"
              >
                −
              </button>
              <span className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-black dark:text-white min-w-[34px] text-center select-none bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-700">
                {item.quantity}
              </span>
              <button
                onClick={onIncrease}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 hover:bg-gray-200/60 dark:hover:bg-gray-800 text-black dark:text-white transition-colors active:scale-95 font-semibold text-xs sm:text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={onRemove}
              className="text-xs font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors bg-red-50 dark:bg-red-950/20 px-2.5 py-1.5 rounded-lg active:scale-95"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Item summary alignment logic */}
      <div className="text-left sm:text-right sm:min-w-[100px] border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-700 flex sm:flex-col justify-between items-center sm:items-end">
        <span className="text-xs text-gray-400 sm:hidden">Total price:</span>
        <p className="font-bold text-base sm:text-lg text-black dark:text-white tracking-tight">
          ₹{itemTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function OrderSummary({ total, deliveryCharges, tax, grandTotal }) {
  const deliveryThresholdProgress = Math.min((total / PRICING.DELIVERY_THRESHOLD) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700/80 p-6">
      <h2 className="font-bold text-lg mb-5 dark:text-white tracking-tight">
        Order Summary
      </h2>

      {/* Modern Dynamic Free Delivery Progress Module */}
      {deliveryCharges > 0 ? (
        <div className="mb-5 p-3.5 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-100/70 dark:border-amber-900/30">
          <p className="text-xs font-medium text-amber-800 dark:text-amber-300 flex items-center gap-1.5 leading-snug">
            🚀 Add <span className="font-bold">₹{(PRICING.DELIVERY_THRESHOLD - total).toFixed(2)}</span> more for free delivery
          </p>
          <div className="w-full bg-amber-200/50 dark:bg-amber-900/40 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${deliveryThresholdProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mb-5 p-3 bg-green-50/60 dark:bg-green-950/20 rounded-xl border border-green-100/70 dark:border-green-900/30 text-center">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400">
            🎉 Your order qualifies for FREE delivery!
          </p>
        </div>
      )}

      <div className="space-y-3.5 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">₹{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-500 dark:text-gray-400 items-center">
          <span>Delivery</span>
          <span>
            {deliveryCharges === 0 ? (
              <span className="text-xs tracking-wide bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md font-bold">
                FREE
              </span>
            ) : (
              <span className="font-medium text-gray-900 dark:text-gray-200">₹{deliveryCharges.toFixed(2)}</span>
            )}
          </span>
        </div>

        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>Tax (5%)</span>
          <span className="font-medium text-gray-900 dark:text-gray-200">₹{tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2 flex justify-between font-bold text-black dark:text-white text-lg tracking-tight">
          <span>Total Amount</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="mt-6 w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 font-semibold block text-center shadow-sm hover:shadow transform active:scale-[0.98] transition-all text-sm tracking-wide"
      >
        Proceed to Checkout
      </Link>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
        🔒 Encrypted securely via Razorpay payment servers
      </p>
    </div>
  );
}