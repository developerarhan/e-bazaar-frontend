import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    api.get("orders/my-orders/")
        .then(res => setOrders(res.data))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div 
                        key={order.id} 
                        className="border p-4 rounded-xl flex justify-between items-center"
                    >
                        <div>
                            <p className="font-medium">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                            <p className="text-sm">₹{order.grand_total}</p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-semibold">{order.status}</p>
                            <Link to={`/tracking/${order.id}`}>
                                <button className="mt-2 px-4 py-2 text-sm bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800">
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