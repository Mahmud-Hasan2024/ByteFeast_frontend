import { Link } from "react-router";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import useCartContext from "../hooks/useCartContext";
import { FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const { cart, loading, updateCartItemQuantity, deleteCartItems } =
    useCartContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const totalPrice = cart?.total_price || 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItemList
              items={cartItems}
              handleUpdateQuantity={updateCartItemQuantity}
              handleRemoveItem={deleteCartItems}
            />
          </div>

          <div>
            <CartSummary totalPrice={totalPrice} itemCount={cartItems.length} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
