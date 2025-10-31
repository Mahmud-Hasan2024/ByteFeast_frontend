import { Link } from "react-router";
import defaultImage from "../../../assets/images/default_product.png";
import useAuthContext from "../../../hooks/useAuthContext";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dciz8qr49/";

const ProductItem = ({ product }) => {
  const { user } = useAuthContext();

  const imageUrl = product.images?.[0]?.image
    ? product.images[0].image.startsWith("http")
      ? product.images[0].image
      : `${CLOUDINARY_BASE_URL}${product.images[0].image}`
    : defaultImage;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={imageUrl}
          alt={product.name}
          className="rounded-xl w-48 h-48 object-cover"
          onError={(e) => (e.currentTarget.src = defaultImage)}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.name}</h2>
        <h3 className="font-bold text-xl text-amber-300">
          ৳{product.effective_price ?? product.price}
        </h3>
        <p className="text-sm text-base-content/70">{product.description}</p>
        <div className="card-actions mt-1">
          {user?.is_staff ? (
            <>
              {/* Admin sees these buttons */}
              <Link to={`/menu/${product.id}`} className="btn btn-primary">
                View Food
              </Link>
              <Link
                to={`/dashboard/menu/${product.id}/edit`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
            </>
          ) : (
            /* Normal user sees Order Now */
            <Link to={`/menu/${product.id}`} className="btn btn-primary">
              Order Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
