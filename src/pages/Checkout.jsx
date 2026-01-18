    import { useState } from "react";
    import { useCart } from "../context/CartContext";
    import { useNavigate } from "react-router-dom";
    import api from "../services/api";

    export default function Checkout() {
        const { cart, total, deliveryCharges, tax, grandTotal, clearCart } = useCart();
        const navigate = useNavigate();

        const [loading, setLoading] = useState(false);
        const [errors, setErrors] = useState({});

        const [form, setForm] = useState({
            name:"",
            phone:"",
            address:"",
            city:"",
            pincode:""
        });

        const handleChange = (e) => {
            setForm({ ... form, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            let newErrors = {};

            // Phone Validation (10 digits)
            if (!/^\d{10}$/.test(form.phone)) {
                newErrors.phone = "Phone number must be 10 digits";
            }

            // Pincode validation (6 digits)
            if (!/^\d{6}$/.test(form.pincode)) {
                newErrors.pincode = "Pincode must be 6 digits";
            }

            // Required fields
            Object.keys(form).forEach((field) => {
                if (!form[field].trim()) {
                newErrors[field] = "This field is required";
                }
            });

            // If errors exist, stop submission
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setErrors({});
            setLoading(true);

            try {
                // Step 1: Create Order + Razorpay order
                const res = await api.post("orders/payment/create/", {
                    items: cart.map(item => ({
                        product: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    shipping: form,
                    total,
                    delivery_charges: deliveryCharges,
                    tax,
                    grand_total: grandTotal
                });

                const {razorpay_order_id, amount, key} = res.data;

                // Step 2: Open Razorpay Checkout
                const options = {
                    key: key,
                    amount: amount,
                    currency: "INR",
                    name: "ARHAN KHAN",
                    description: "Order Payment",
                    order_id: razorpay_order_id,
                    handler: async function (response) {
                        try {
                            // Step 3: Verify payment
                            await api.post("orders/payment/verify/", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            });

                            clearCart();
                            navigate("/success");
                        } catch (err) {
                            console.log(err)
                            alert("Payment verification failed");
                        }
                    },
                    prefill: {
                        name: form.name,
                        contact: form.phone,
                    },
                    theme: {
                        color: "#000000",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } catch (err) {
                console.log(err);
                alert("Payment initialization failed");
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Shipping Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="order-2 md:order-1 bg-white p-6 rounded-lg shadow-sm space-y-4"
                    >
                        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className={`w-full border px-4 py-2 rounded 
                                ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className={`w-full border px-4 py-2 rounded 
                                ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                        <textarea
                            name="address"
                            placeholder="Street Address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className={`w-full border px-4 py-2 rounded 
                                ${errors.address ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className={`w-1/2 border px-4 py-2 rounded
                                    ${errors.city ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                required
                                className={`w-1/2 border px-4 py-2 rounded
                                    ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                            />
                            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
                        >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="order-1 md:order-2 bg-white p-6 rounded-lg shadow-sm h-fit">
                        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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
                                    <span>Tax:</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-green-700 text-lg">
                                    <span>Total:</span>
                                    <span>₹{grandTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }