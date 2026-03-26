import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Available Dates", path: "/available-dates" },
    { name: "Cost Estimator", path: "/cost-estimator" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FM</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Fine Media
            </span>
          </Link>


          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">

            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 px-2 py-1 text-sm font-medium transition"
              >
                {link.name}
              </Link>
            ))}


            {/* ADMIN BUTTON */}
            {!user ? (

              // Not logged in → Login
              <Link
                to="/admin/login"
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <FiUser />
                Admin
              </Link>

            ) : (

              // Logged in → Dashboard + Logout
              <div className="flex items-center gap-3">

                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  Logout
                </button>

              </div>

            )}

          </div>


          {/* MOBILE BUTTON */}
          <div className="md:hidden">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

          </div>

        </div>


        {/* MOBILE MENU */}
        {isOpen && (

          <div className="md:hidden pb-4">

            {publicLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded"
              >
                {link.name}
              </Link>
            ))}


            {!user ? (

              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 bg-blue-600 text-white rounded mt-2 text-center"
              >
                Admin Login
              </Link>

            ) : (

              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 hover:bg-blue-50"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
