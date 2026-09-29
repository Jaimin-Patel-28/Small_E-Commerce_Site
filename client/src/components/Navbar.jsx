import { Link, useNavigate } from "react-router";
import { Package, Plus, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <Package size={22} className="text-gray-900" />
          <span className="text-lg font-semibold text-gray-900">
            E-Commerce
          </span>
          <span className="text-sm text-gray-500">Site</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Package size={18} />
            Products
          </Link>

          {user ? (
            <>
              <Link
                to="/products/new"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Plus size={18} />
                Add Product
              </Link>

              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User size={18} />
                {user.name}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
