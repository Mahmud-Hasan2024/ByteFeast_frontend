import { FaRegTrashAlt } from "react-icons/fa";
import defaultImage from "../../assets/images/default_product.png";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveItem }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Items</h2>{" "}
      {items.map((item) => {
        const price = item.food?.price || 0;
        const total_price = item.total_price ?? price * item.quantity;
        const imageSrc = item.food?.images?.[0]?.image || defaultImage;

        return (
          <div
            key={item.id}
            className="card card-side bg-base-100 shadow-sm rounded-box p-4 items-center"
          >
            <figure className="w-24 h-24 flex-shrink-0">
              <img
                src={imageSrc}
                alt={item.food?.name || "Product image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </figure>

            <div className="card-body p-0 pl-4 md:flex-row md:items-center justify-between">
              <div className="flex-1 space-y-1">
                <h3 className="card-title text-lg font-semibold">
                  {item.food?.name || "Unnamed Item"}{" "}
                </h3>

                <p className="text-sm text-gray-500">
                  Unit Price: ৳{price.toFixed(2)}{" "}
                </p>
              </div>

              <div className="flex items-center join my-2 md:my-0">
                <button
                  onClick={() =>
                    handleUpdateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  className="btn btn-sm btn-outline join-item"
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
                  className="input input-sm input-bordered join-item w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  className="btn btn-sm btn-outline join-item"
                >
                  +
                </button>
              </div>

              <div className="text-right font-medium mt-2 md:mt-0 md:ml-4">
                <span className="text-sm text-gray-500 block md:hidden">
                  Total:
                </span>
                <span className="text-lg">৳{total_price.toFixed(2)}</span>{" "}
              </div>

              <div className="flex-shrink-0 ml-4">
                <button
                  className="btn btn-ghost btn-circle"
                  aria-label={`Remove ${item.food?.name || "item"} from cart`}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaRegTrashAlt className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default CartItemList;
