import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router";


const CategoryItems = ({ category }) => {
  return (
    <div
      className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 rounded-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 rounded-full bg-primary text-gray-50 flex items-center justify-center font-bold text-xl">
          {category.name.charAt(0)}
        </div>
        <span className="text-xs text-gray-50 bg-base-100/70 px-3 py-1 rounded-full font-semibold">
          {category.food_count} Items
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-50">{category.name}</h3>
      <Link to={`/menu/${category.foods?.[0]?.id || ""}`}>
      <button className="text-primary font-bold hover:text-amber-300 transition-colors flex items-center gap-1">
        Explore
        <FaAngleRight />
      </button>
      </Link>
    </div>
  );
};

export default CategoryItems;