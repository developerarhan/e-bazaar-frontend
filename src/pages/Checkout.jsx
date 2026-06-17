import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function FormField({ label, name, value, onChange, error, placeholder, textarea = false }) {
  const inputClass = `w-full border px-4 py-3 rounded-xl
    bg-white dark:bg-gray-700/50
    text-black dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/80 focus:border-transparent
    transition-all duration-200 shadow-sm text-sm
    ${error ? "border-red-500 dark:border-red-400 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold tracking-wide uppercase text-gray-500 dark:text-gray-400">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs font-medium flex items-center gap-1 mt-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

export default function Checkout() {
  const { cart, total, deliveryCharges, tax, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [shipping, setShipping] = useState({
    name: typeof user !== "undefined" ? user?.name || "" : "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!shipping.name.trim()) newErrors.name = "Name is required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!/^\d{10}$/.test(shipping.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!/^\d{6}$/.test(shipping.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("orders/payment/create/", {
        items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        shipping: shipping,
      });

      const { razorpay_order_id, amount, key } = res.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "E-Bazaar",
        description: "Order Payment",
        order_id: razorpay_order_id,
        handler: async function (response) {
          try {
            await api.post("orders/payment/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            navigate("/success");
          } catch (err) {
            console.log(err);
            navigate("/payment-failed");
          }
        },
        modal: {
          ondismiss: function () {
            navigate("/payment-failed");
          },
        },
        prefill: {
          name: shipping.name,
          contact: shipping.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.log("Payment Failed:", response);
        navigate("/payment-failed");
      });

      rzp.open();
    } catch (err) {
      const serverError = err.response?.data?.error;
      alert(serverError || "Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white tracking-tight">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Shipping Form Panel */}
          <div className="order-2 md:order-1">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/80">
              <h2 className="text-xl font-bold mb-6 text-black dark:text-white tracking-tight">
                Shipping Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label="Full Name"
                  name="name"
                  value={shipping.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  value={shipping.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="9876543210"
                />

                <FormField
                  label="Street Address"
                  name="address"
                  value={shipping.address}
                  onChange={handleChange}
                  error={errors.address}
                  placeholder="Flat No, Apartment, Street, Landmark"
                  textarea
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="City"
                    name="city"
                    value={shipping.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="Mumbai"
                  />
                  <FormField
                    label="State"
                    name="state"
                    value={shipping.state}
                    onChange={handleChange}
                    error={errors.state}
                    placeholder="Maharashtra"
                  />
                </div>

                <FormField
                  label="Pincode"
                  name="pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                  placeholder="400001"
                />

                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full mt-4 py-3.5 rounded-xl text-white dark:text-black font-semibold tracking-wide text-sm transition-all shadow-sm
                    bg-black dark:bg-white
                    hover:bg-gray-800 dark:hover:bg-gray-100
                    disabled:bg-gray-300 dark:disabled:bg-gray-700
                    disabled:text-gray-500 dark:disabled:text-gray-500
                    disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      Securing Session...
                    </span>
                  ) : (
                    `Pay ₹${grandTotal.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sticky Order Breakdown Matrix */}
          <div className="order-1 md:order-2 md:sticky md:top-24">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/80">
              <h2 className="text-xl font-bold mb-5 text-black dark:text-white tracking-tight">
                Order Review
              </h2>

              {/* Enhanced Scrollable Miniature Item List */}
              <div className="space-y-3 mb-5 max-h-56 overflow-y-auto pr-1 divide-y divide-gray-50 dark:divide-gray-700/40">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm pt-3 first:pt-0 items-center gap-4">
                    <span className="line-clamp-1 flex-1 text-gray-600 dark:text-gray-400 font-medium">
                      {item.title} <span className="text-xs text-gray-400 font-normal ml-1">× {item.quantity}</span>
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t dark:border-gray-700 pt-4 space-y-3.5 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-gray-200">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 items-center">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharges === 0 ? (
                      <span className="text-xs font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-md">
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

                <div className="flex justify-between font-bold text-black dark:text-white text-lg tracking-tight border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                  <span>Total Due</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badge footer */}
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-5 pt-3 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-center gap-1">
                🔒 Safe & Verified Escrow Checkout by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}