import authApiClient from "../../services/auth-api-client";
import { useNavigate } from "react-router";
import useCartContext from "../../hooks/useCartContext";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const shipping = itemCount === 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
  const tax = parseFloat(totalPrice) * 0.1;
  const orderTotal = parseFloat(totalPrice) + shipping + tax;

  const { getOrCreateCart } = useCartContext();
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      // The cartId prop is now available for the API call
      const order = await authApiClient.post("/orders/", { cart_id: cartId });
      if (order.status === 201) {
        localStorage.removeItem("cartId");
        // Update the cart state to reflect the empty cart
        await getOrCreateCart();
        // Redirect the user to the orders page
        navigate("/dashboard/orders");
      }
    } catch (error) {
      console.error(error);
      // Use a more user-friendly message for errors
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <div className="card-body p-0">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>{" "}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>{" "}
          </div>

          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600">Shipping</span>{" "}
            <span className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600">Estimated Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>{" "}
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between font-bold text-xl text-primary">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-6">
          <button
            disabled={itemCount === 0}
            onClick={createOrder}
            className="btn btn-primary w-full"
          >
            Place an Order
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default CartSummary;
