import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import authApiClient from "../services/auth-api-client";
import StatCard from "../components/Dashboard/StatCard";
import useAuthContext from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      // Fetch shared analytics
      const analyticsRes = await authApiClient.get("/analytics/dashboard");
      setStats(analyticsRes.data);

      // Fetch user's orders
      const ordersRes = await authApiClient.get("/orders/");
      setOrders(ordersRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  // Personalized total orders for user, overall total for admin
  const totalOrders = user.is_staff ? stats.total_orders || 0 : orders.length;

  // Total spent for user
  const totalSpent = orders.reduce((sum, o) => sum + (o.total_price ?? 0), 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-50 mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard icon={FiPackage} title="Total Orders" value={totalOrders} />
        <StatCard
          icon={FiShoppingCart}
          title="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
        />
        <StatCard
          icon={FiStar}
          title="Mostly Liked Foods"
          value={stats.mostly_liked_foods?.length || 0}
        />
        <StatCard
          icon={FiUsers}
          title="Trending Foods"
          value={stats.trending_foods?.length || 0}
        />
      </div>

      {/* Trending Foods Section */}
      <h2 className="text-2xl font-bold text-gray-50 mb-4">Trending Foods</h2>
      {stats.trending_foods && stats.trending_foods.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.trending_foods.map((food) => (
            <div
              key={food.food_id}
              className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold text-gray-50">
                {food.food__name}
              </h3>
              <p className="text-gray-400">
                Total Orders: {food.total_quantity}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-8">No trending foods found.</p>
      )}

      {/* Mostly Liked Foods Section */}
      <h2 className="text-2xl font-bold text-gray-50 mb-4">
        Mostly Liked Foods
      </h2>
      {stats.mostly_liked_foods && stats.mostly_liked_foods.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.mostly_liked_foods.map((food) => (
            <div
              key={food.food_id}
              className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold text-gray-50">
                {food.food__name}
              </h3>
              <p className="text-gray-400">
                Average Rating: {food.avg_rating?.toFixed(1) ?? "N/A"}
              </p>
              <p className="text-gray-400">
                Total Reviews: {food.total_reviews ?? 0}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No mostly liked foods found.</p>
      )}
    </div>
  );
};

export default Dashboard;
