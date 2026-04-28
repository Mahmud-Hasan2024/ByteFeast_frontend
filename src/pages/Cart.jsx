import { Link } from "react-router";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import useCartContext from "../hooks/useCartContext";
import { FaArrowLeft } from "react-icons/fa";

const Cart = () => {
  const { cart, cartId, loading, updateCartItemQuantity, deleteCartItems } =
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
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="mb-6">
        <Link
          to="/menu"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to products{" "}
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Food Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CartItemList
              items={cartItems}
              handleUpdateQuantity={updateCartItemQuantity}
              handleRemoveItem={deleteCartItems}
            />
          </div>

          <div className="space-y-6">
            <CartSummary
              totalPrice={totalPrice}
              itemCount={cartItems.length}
              cartId={cartId}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-12 rounded-2xl shadow-2xl border border-gray-700 text-center">
          {/* Added a subtle icon for better UX */}
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-gray-700/50 rounded-full">
              <FiShoppingCart className="h-12 w-12 text-gray-500" />
            </div>
          </div>
          <p className="text-gray-400 text-xl font-medium">Your cart is empty.</p>
          <p className="text-gray-500 mb-6 text-sm">Looks like you haven't added any delicious items yet!</p>

          <Link to="/menu" className="btn btn-primary px-8 hover:scale-105 transition-transform">
            Continue Ordering
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
