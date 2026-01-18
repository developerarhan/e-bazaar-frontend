import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("orders/my-orders/")
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if(orders.length === 0){
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center      px-4">
              <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
              Looks like you haven’t placed any orders.
              </p>
              <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
              Start Shopping
              </Link>
          </div>
          );
  }

  {loading && <p>Loading...</p>}

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded-lg">
          <p className="font-semibold">Order ID: {order.id}</p>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>
          <p>Total: ₹{order.grand_total}</p>
          <Link to={`/tracking/${order.id}`} className="hover:underline">Track Order</Link>
        </div>
      ))}
    </div>
  )
}
