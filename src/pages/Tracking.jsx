import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Receipt, Truck } from "lucide-react";
import api from "../services/api";
import TrackingTimeline from "../components/TrackingTimeline";

const STATUS_STYLES = {
    PENDING_PAYMENT: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30",
    CONFIRMED: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/30",
    SHIPPED: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/30",
    DELIVERED: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30",
    CANCELLED: "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/30",
};

export default function Tracking() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`orders/${orderId}/`)
            .then(res => setOrder(res.data))
            .finally(() => setLoading(false));
    }, [orderId]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-36 mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-64 bg-gray-100 dark:bg-gray-800/40 rounded-2xl" />
                    <div className="h-64 bg-gray-100 dark:bg-gray-800/40 rounded-2xl" />
                </div>
            </div>
        );
    }
    
    if (!order) {
        return (
            <div className="max-w-md mx-auto px-4 py-24 text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium">Order detail records could not be fetched.</p>
                <Link
                    to="/orders"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black dark:text-white hover:underline"
                >
                    <ArrowLeft size={16} /> Back to my orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            {/* Nav Header */}
            <div className="mb-8">
                <Link
                    to="/orders"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={15} />
                    <span>Back to Orders</span>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Order #{order.id}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Placed on {new Date(order.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border uppercase ${
                            STATUS_STYLES[order.status] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent"
                        }`}>
                            {order.status.replace("_", " ")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Core Display Splitter Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Block: Invoice & Order Summary Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800/80">
                            <ShoppingBag size={18} className="text-gray-400" />
                            <h2 className="font-bold text-gray-900 dark:text-white text-base">
                                Order Summary
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
                            {order.items && order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-3.5 first:pt-1 last:pb-1">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                            {item.product_title || `Product #${item.product}`}
                                        </span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                            Qty: {item.quantity}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ₹{Number(item.price).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Breakdown Financial Matrix */}
                        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800/80 space-y-2.5 text-sm">
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-medium">₹{Number(order.total).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Delivery Fee</span>
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    {Number(order.delivery_charges) === 0 ? "FREE" : `₹${Number(order.delivery_charges).toLocaleString("en-IN")}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Estimated Tax</span>
                                <span className="font-medium">₹{Number(order.tax).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-3 border-t border-gray-100 dark:border-gray-800">
                                <span className="flex items-center gap-1.5"><Receipt size={16} className="text-gray-400" /> Grand Total</span>
                                <span>₹{Number(order.grand_total).toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Block: Live Tracking Timeline Track */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                    <div className="flex items-center gap-2 pb-5 mb-5 border-b border-gray-100 dark:border-gray-800/80">
                        <Truck size={18} className="text-gray-400" />
                        <h2 className="font-bold text-gray-900 dark:text-white text-base">
                            Tracking Updates
                        </h2>
                    </div>
                    <TrackingTimeline tracking={order.tracking_updates} />
                </div>
            </div>
        </div>
    );
}