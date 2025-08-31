import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveItem }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shopping Cart</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-right">Price</th>
              <th>Quantity</th>
              <th className="text-right">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = item.food?.price || 0;
              const total_price = item.total_price ?? price * item.quantity;

              return (
                <tr key={item.id}>
                  <td className="font-medium">{item.food?.name || "Unnamed"}</td>
                  <td className="text-right">${price.toFixed(2)}</td>
                  <td>
                    <div className="flex items-center join">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="btn btn-xs btn-outline join-item"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="input input-xs input-bordered join-item w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="btn btn-xs btn-outline join-item"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-right font-medium">
                    ${total_price.toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs btn-circle"
                      aria-label={`Remove ${item.food?.name || "item"} from cart`}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaRegTrashAlt className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItemList;
