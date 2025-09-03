import { useEffect, useState } from "react";
import apiClient from "../../../services/api-client";
import CategoryItems from "./CategoryItems";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-base-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Category Heading  */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Browse Categories</h2>
          {/* <a href="#" className="btn btn-primary rounded-full">
            View All
          </a> */}
        </div>

        {/* Category Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryItems
              key={category.id}
              index={index}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
