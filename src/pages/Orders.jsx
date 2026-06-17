import { Download, Package, Calendar, CreditCard, MapPin, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const STATUS_STYLES = {
    PENDING_PAYMENT: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30",
    CONFIRMED: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/30",
    SHIPPED: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/30",
    DELIVERED: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/30",
    CANCELLED: "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/30",
};

const downloadInvoice = async (orderId) => {
    try {
        const response = await api.get(`orders/${orderId}/invoice/`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        if (err.response?.status === 400) {
            alert("Invoice not available until payment is confirmed.");
        } else {
            alert("Failed to download invoice.");
        }
    }
};

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("orders/my-orders/")
            .then(res => setOrders(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-48 mb-8 animate-pulse" />
                <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800/50 border border-gray-200/40 dark:border-gray-700/40 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Package className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">
                    No orders placed yet
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
                    Looks like your order history is clean! Explore our active store to place your first order.
                </p>
                <Link
                    to="/products"
                    className="w-full sm:w-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-all font-medium shadow-sm hover:shadow-md"
                >
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        My Orders
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage and track your recent dynamic purchases
                    </p>
                </div>
                <div className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full font-medium">
                    Total Orders: {orders.length}
                </div>
            </div>

            <div className="space-y-5">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
                    >
                        {/* Left Side Content Block */}
                        <div className="flex-1 space-y-3.5">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-bold text-gray-900 dark:text-white text-lg">
                                    Order #{order.id}
                                </span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                                    STATUS_STYLES[order.status] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent"
                                }`}>
                                    {order.status.replace("_", " ")}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={15} className="text-gray-400" />
                                    <span>
                                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                    <CreditCard size={15} className="text-gray-400" />
                                    <span>₹{Number(order.grand_total).toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            {/* Shipping Information Strip */}
                            {order.shipping_address_full && (
                                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/60 pt-3 mt-1">
                                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                    <div className="leading-relaxed">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                                            Deliver to:
                                        </span>{" "}
                                        {order.shipping_name} — {order.shipping_address_full}
                                        {order.shipping_phone && (
                                            <span className="text-gray-400 dark:text-gray-500"> • {order.shipping_phone}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Control Panel */}
                        <div className="flex sm:items-center justify-start md:justify-end gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800 shrink-0">
                            {order.status !== "PENDING_PAYMENT" && (
                                <button
                                    onClick={() => downloadInvoice(order.id)}
                                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/70 rounded-xl px-4 py-2.5 transition-all cursor-pointer"
                                >
                                    <Download size={15} />
                                    <span className="hidden sm:inline">Invoice</span>
                                </button>
                            )}

                            <Link to={`/tracking/${order.id}`} className="flex-1 sm:flex-initial">
                                <button className="w-full flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-950 dark:hover:bg-gray-50 shadow-sm transition-all cursor-pointer">
                                    <Truck size={15} />
                                    Track Order
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
