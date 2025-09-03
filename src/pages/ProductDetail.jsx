import { Link, useParams, useNavigate } from "react-router";
import AddToCartButton from "../components/ProductDetails/AddToCartButton";
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import useAuthContext from "../hooks/useAuthContext";
import defaultImage from "../assets/images/default_product.png";
import ReviewSection from "../components/Reviews/ReviewSection";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dciz8qr49/";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [similarFoods, setSimilarFoods] = useState([]);
  const { productId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/foods/${productId}/`).then((res) => {
      setProduct(res.data);
      setLoading(false);

      // Fetch similar foods from same category
      if (res.data.category) {
        apiClient
          .get(`/foods/?category=${res.data.category}`)
          .then((similarRes) => {
            // Exclude the current product from "similar"
            const filtered = similarRes.data.results.filter(
              (item) => item.id !== res.data.id
            );
            setSimilarFoods(filtered);
          });
      }
    });
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }
  if (!product) return <div>Product Not Found...</div>;

  return (
    <div className="w-3/4 mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link
          to="/menu"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        {/* Admin-only Edit Button */}
        {user?.is_staff && (
          <button
            onClick={() => navigate(`/dashboard/menu/${product.id}/edit`)}
            className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
      {/* Product main details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg"></div>
          }
        >
          <ProductImageGallery
            images={product?.images}
            productName={product.name}
          />
        </Suspense>
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="badge badge-outline mb-2">
              Category {product.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="mt-2 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                $
                {product.discount_price
                  ? product.discount_price
                  : product.price}
              </span>
              {product.discount_price && (
                <span className="line-through text-sm text-red-500">
                  ${product.price}
                </span>
              )}
            </div>
          </div>

          <div className="prose prose-sm mb-6">
            <p>{product.description}</p>
          </div>
          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Similar Foods Section */}
      {similarFoods.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🍽 Similar Foods</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {similarFoods.map((item) => {
              const imageUrl = item.images?.[0]?.image
                ? item.images[0].image.startsWith("http")
                  ? item.images[0].image
                  : `${CLOUDINARY_BASE_URL}${item.images[0].image}`
                : defaultImage;

              return (
                <Link
                  key={item.id}
                  to={`/menu/${item.id}`}
                  className="card bg-base-100 shadow hover:shadow-lg transition"
                >
                  <figure className="aspect-square">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        e.currentTarget.src = defaultImage;
                      }}
                    />
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="text-sm font-bold">{item.name}</h3>
                    <p className="text-xs text-base-content/70">
                      ${item.effective_price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <ReviewSection />
    </div>
  );
};

export default ProductDetail;
