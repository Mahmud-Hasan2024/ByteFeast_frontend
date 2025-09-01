import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../services/auth-api-client";
import { useState } from "react";

const OrderCard = ({ order, onCancel, onStatusUpdate }) => {
  const { user } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setIsUpdating(true);
    await onStatusUpdate(order.id, newStatus);
    setIsUpdating(false);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items?.length,
      });

      if (response.data.payment_url) {
        setLoading(false);
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Paid":
        return "bg-yellow-500 text-black";
      case "Pending":
        return "bg-gray-500 text-white";
      case "Ready to Ship":
        return "bg-purple-500 text-white";
      case "Shipped":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl mb-8 overflow-hidden transform transition-transform duration-300 hover:scale-[1.01] border border-gray-700">
      {/* Card Header */}
      <div className="bg-gray-900 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-50">Order #{order.id}</h2>
          <p className="text-gray-400 text-sm">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {user.is_staff ? (
            <select
              value={order.status}
              onChange={handleStatusChange}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )} disabled:opacity-50 transition-colors`}
              disabled={isUpdating}
            >
              <option value="Not Paid">Not Paid</option>
              <option value="Pending">Pending</option>
              <option value="Ready to Ship">Ready to Ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          )}
          {order.status !== "Delivered" &&
            order.status !== "Canceled" &&
            !user.is_staff && (
              <button
                onClick={() => onCancel(order.id)}
                className="text-red-400 hover:text-red-500 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            )}
        </div>
      </div>
      {/* Order Items Table */}
      <div className="p-6">
        <h3 className="font-medium text-lg mb-4 text-gray-200">Order Items</h3>
        <OrderTable items={order.items} />
      </div>
      {/* Order Summary */}
      <div className="border-t border-gray-700 p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-xs text-gray-300">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${(order.total_price ?? 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-600 pt-2 text-gray-50 text-lg">
            <span>Total:</span>
            <span>${(order.total_price ?? 0).toFixed(2)}</span>
          </div>
        </div>
        {!user.is_staff && order.status === "Not Paid" && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
