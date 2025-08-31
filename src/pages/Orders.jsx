import { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard";
import authApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await authApiClient.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Send the status update to the API
      await authApiClient.patch(`/orders/${orderId}/update_status/`, {
        status: newStatus,
      });

      // Manually update only the status in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      if (response.status === 200) {
        // Manually update only the status to "Canceled"
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
        console.log(`Order ${orderId} has been canceled.`);
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-transparent">
      <h1 className="text-2xl font-bold mb-6 text-gray-200">Order Details</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
