import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../services/auth-api-client";
import { useState } from "react";

const OrderCard = ({ order, onCancel, onStatusUpdate }) => {
  const { user } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setIsUpdating(true);
    await onStatusUpdate(order.id, newStatus);
    setIsUpdating(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-500 text-white";
      case "Shipped":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400";
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
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} disabled:opacity-50 transition-colors`}
              disabled={isUpdating}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
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
            <span>${order.total_price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t border-gray-600 pt-2 text-gray-50 text-lg">
            <span>Total:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
        </div>
        {!user.is_staff && order.status === "Pending" && (
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
