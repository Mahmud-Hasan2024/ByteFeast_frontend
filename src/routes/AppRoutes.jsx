import { Route, Routes } from "react-router";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import AddFoodItem from "../pages/AddFoodItem";
import EditFoodItem from "../pages/EditFoodItem";
import CategoriesPage from "../pages/CategoriesPage";
import EditCategory from "../pages/EditCategory";
import AddCategory from "../pages/AddCategory";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes  */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Shop />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="menu/:productId" element={<ProductDetail />} />
      </Route>
      {/* Private Routes  */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="payment/success/" element={<PaymentSuccess />} />
        <Route path="menu/add" element={<AddFoodItem />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="menu/:foodId/edit" element={<EditFoodItem />} />
        <Route path="categories/:categoryId/edit" element={<EditCategory />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
