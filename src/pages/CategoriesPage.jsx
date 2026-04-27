import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router"; 
import useFetchCategories from "../hooks/useFetchCategories";
import ProductItem from "../components/Home/Products/ProductItem";
import apiClient from "../services/api-client";
import useAuthContext from "../hooks/useAuthContext";

const CategoryPage = () => {
  const { user } = useAuthContext();
  const categories = useFetchCategories();
  const [categoriesWithFoods, setCategoriesWithFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchFoodsForCategories = async () => {
      try {
        setLoading(true);
        const data = await Promise.all(
          categories.map(async (cat) => {
            const res = await apiClient.get(`/foods/?category_id=${cat.id}`);
            return { ...cat, foods: res.data.results };
          })
        );
        setCategoriesWithFoods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchFoodsForCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loading, location.hash]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 h-screen bg-gray-900">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen overflow-x-hidden">
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <h1 className="text-4xl font-extrabold text-center mb-12 text-primary">
          🍽️ Food Categories
        </h1>

        {categoriesWithFoods.map((category) => (
          <div 
            key={category.id} 
            id={`category-${category.id}`} 
            className="mb-16 scroll-mt-24"
          >
            {/* Category Header with Admin Edit Button */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <h2 className="text-3xl font-bold text-primary">{category.name}</h2>
              
              {user?.is_staff && (
                <Link 
                  to={`/dashboard/categories/${category.id}/edit`} 
                  className="btn btn-primary px-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 font-bold"
                >
                  Edit Category
                </Link>
              )}
            </div>

            {/* Foods under this category */}
            {category.foods && category.foods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.foods.map((food) => (
                  <ProductItem key={food.id} product={food} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-medium">
                No products available in this category.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;