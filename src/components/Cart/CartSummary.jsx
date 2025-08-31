const CartSummary = ({ totalPrice, itemCount }) => {
  const shipping = itemCount === 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
  const tax = parseFloat(totalPrice) * 0.1;
  const orderTotal = parseFloat(totalPrice) + shipping + tax;

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
          <button className="btn btn-primary btn-lg w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default CartSummary;
