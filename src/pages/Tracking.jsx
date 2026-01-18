import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import TrackingTimeline from "../components/TrackingTimeline";

export default function Tracking() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`orders/${orderId}/`)
            .then(res => setOrder(res.data))
            .finally(() => setLoading(false));
    }, [orderId]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!order) return <p className="text-center mt-10">Order not found</p>;
    console.log(order.tracking_updates);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-2">Tracking Order</h1>
            <p className="text-gray-500 mb-6">Order Id : {order.id}</p>

            <span className="inline-block mb-6 px-4 py-1 rounded-full bg-black text-white">
                {order.status}
            </span>

            <TrackingTimeline tracking={order.tracking_updates} />
        </div>
    );
}
