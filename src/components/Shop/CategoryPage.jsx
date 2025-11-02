import { useEffect, useState } from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import ProductItem from "../components/Products/ProductItem";
import apiClient from "../services/api-client";

const CategoryPage = () => {
  const categories = useFetchCategories(); // your existing hook
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsForCategories = async () => {
      try {
        setLoading(true);

        const data = await Promise.all(
          categories.map(async (cat) => {
            const res = await apiClient.get(`/products/?category_id=${cat.id}`);
            return { ...cat, products: res.data.results };
          })
        );

        setCategoriesWithProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchProductsForCategories();
    }
  }, [categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-primary">
        🍽️ Food Categories
      </h1>

      {categoriesWithProducts.map((category) => (
        <div key={category.id} className="mb-16">
          {/* Category Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">{category.name}</h2>
          </div>

          {/* Products under this category */}
          {category.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductItem key={product.id} product={product} />
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
  );
};

export default CategoryPage;
