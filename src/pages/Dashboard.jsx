import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import authApiClient from "../services/auth-api-client";
import StatCard from "../components/Dashboard/StatCard";
import useAuthContext from "../hooks/useAuthContext";
import ProductItem from "../components/Home/Products/ProductItem";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await authApiClient.get("/analytics/dashboard");
        setStats(res.data);
      } catch (err) {
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboard();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error) return <div className="alert alert-error max-w-lg mx-auto mt-10">{error}</div>;

  // Helper to map Django's "food__" fields to what ProductItem.jsx expects
  const mapFoodData = (food) => ({
    id: food.food_id,
    name: food.food__name,
    price: food.food__price,
    description: food.food__description,
    images: food.food__images__image ? [{ image: food.food__images__image }] : []
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {user.email}</p>
      </header>

      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatCard 
          icon={FiPackage} 
          title="Orders" 
          value={user.is_staff ? stats.total_orders_overall : stats.total_orders} 
        />
        <StatCard 
          icon={FiShoppingCart} 
          title="Total Spent" 
          value={`$${stats.total_spent.toFixed(2)}`} 
        />
        <StatCard icon={FiStar} title="Mostly Liked" value={stats.mostly_liked_foods?.length || 0} />
        <StatCard icon={FiUsers} title="Trending Items" value={stats.trending_foods?.length || 0} />
      </div>

      {/* Trending Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-50 mb-6 flex items-center gap-2">
          🔥 Trending Foods
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.trending_foods.map((food) => (
            <ProductItem key={`trend-${food.food_id}`} product={mapFoodData(food)} />
          ))}
        </div>
      </section>

      {/* Most Liked Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-50 mb-6 flex items-center gap-2">
          ⭐ Top Rated By Customers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.mostly_liked_foods.map((food) => (
            <ProductItem key={`like-${food.food_id}`} product={mapFoodData(food)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;