import { useEffect, useState } from "react";
import { Link } from "react-router";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "../hooks/useAuthContext";
import defaultImage from "../assets/images/default_product.png";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dciz8qr49/";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    authApiClient
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Delete this category and all its products?")) return;
    try {
      await authApiClient.delete(`/categories/${categoryId}/`);
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
      alert("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card bg-base-200 p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold mb-2">{category.name}</h2>
            <p className="mb-4 text-sm text-base-content/70">
              {category.food_count} items
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {category.foods?.map((food) => {
                const imageUrl = food.images?.[0]?.image
                  ? food.images[0].image.startsWith("http")
                    ? food.images[0].image
                    : `${CLOUDINARY_BASE_URL}${food.images[0].image}`
                  : defaultImage;
                return (
                  <Link key={food.id} to={`/menu/${food.id}`}>
                    <img
                      src={imageUrl}
                      alt={food.name}
                      className="w-full h-24 object-cover rounded"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex gap-2">
              {user?.is_staff ? (
                <>
                  <Link
                    to={`/dashboard/categories/${category.id}/edit`}
                    className="btn btn-sm text-white btn-outline btn-primary"
                  >
                    Edit Category
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <Link
                  to={`/menu/${category.foods?.[0]?.id || ""}`}
                  className="btn btn-primary w-full"
                >
                  Explore
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;