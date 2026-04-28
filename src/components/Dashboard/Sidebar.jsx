import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
  FiBookOpen,
  FiHome,
} from "react-icons/fi";
import { GiChefToque } from "react-icons/gi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/menu", icon: FiBookOpen, label: "Menu" },
    { to: "/dashboard/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard/orders", icon: FiPackage, label: "Orders" },
    // { to: "/reviews", icon: FiStar, label: "Reviews" },
  ];

  const adminMenues = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/menu", icon: FiBookOpen, label: "Menu" },
    { to: "/dashboard/menu/add", icon: FiPlusCircle, label: "Add Foods" },
    { to: "/dashboard/categories", icon: FiTag, label: "Categories" },
    { to: "/dashboard/categories/add", icon: FiPlusCircle, label: "Add Category" },
    { to: "/dashboard/users", icon: FiUsers, label: "Manage Users" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard/orders", icon: FiPackage, label: "Orders" },
    // { to: "/reviews", icon: FiStar, label: "Reviews" },
    // { to: "/users", icon: FiUsers, label: "Users" },
  ];

  const menuItems = user.is_staff ? adminMenues : customerMenus;

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      
      <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content flex flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 mb-6 px-2">
          <Link
            to="/"
            className="flex items-center gap-2 btn btn-ghost text-xl p-0 hover:bg-transparent"
          >
            <GiChefToque size={30} className="text-amber-400" />
            <span className="font-bold">ByteFeast</span>
          </Link>
        </div>

        {/* Main Dashboard Navigation Links */}
        <ul className="menu menu-md gap-2 flex-grow p-0">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* NEW: Return to Home Action */}
        <div className="mt-auto border-t border-base-300 pt-4">
          <ul className="p-0">
            <li>
              <Link 
                to="/" 
                className="flex items-center justify-center gap-3 text-primary hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                <FiHome className="h-5 w-5" />
                <span className="font-bold">Return to Home</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 text-[10px] uppercase tracking-widest text-base-content/50 text-center">
          © 2026 ByteFeast Restaurant
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;