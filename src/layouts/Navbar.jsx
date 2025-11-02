import { useState } from "react";
import { Link, NavLink } from "react-router";
import { GiChefToque } from "react-icons/gi";
import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <GiChefToque size={30} className="text-amber-400" />
          <h1 className="text-xl font-bold tracking-wide">ByteFeast</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          <ul className="flex gap-5 font-medium">
            {user?.is_staff && (
              <li>
                <Link to="/dashboard" className="hover:text-amber-500">
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/" className="hover:text-amber-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-amber-500">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-amber-500">
                Categories
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {/* Cart */}
              <Link
                to="/dashboard/cart"
                className="btn btn-ghost btn-circle relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm absolute top-0 right-0">
                  {cart?.items?.length || 0}
                </span>
              </Link>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src="https://www.gravatar.com/avatar/?d=mp&f=y"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to="/dashboard/profile">
                      Profile <span className="badge">New</span>
                    </NavLink>
                  </li>
                  <li>
                    <a onClick={logoutUser}>
                      <LogOut size={16} className="mr-1" /> Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn btn-primary">
                <LogIn size={18} className="mr-1" /> Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                <UserPlus size={18} className="mr-1" /> Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-base-200 shadow-inner">
          <ul className="flex flex-col gap-1 py-3">
            {user?.is_staff && (
              <li>
                <Link
                  to="/dashboard"
                  className="block px-6 py-2 hover:bg-base-300"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                className="block px-6 py-2 hover:bg-base-300"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="block px-6 py-2 hover:bg-base-300"
                onClick={() => setOpen(false)}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="block px-6 py-2 hover:bg-base-300"
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
            </li>

            <div className="border-t border-base-300 my-2"></div>

            {user ? (
              <>
                <div className="flex items-center gap-3 px-6 py-2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span>{user?.name || "User"}</span>
                </div>
                <Link
                  to="/dashboard/cart"
                  onClick={() => setOpen(false)}
                  className="block px-6 py-2 hover:bg-base-300"
                >
                  Cart ({cart?.items?.length || 0})
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setOpen(false);
                  }}
                  className="w-full text-left px-6 py-2 hover:bg-base-300 flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-6 py-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <LogIn size={18} /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} /> Register
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
