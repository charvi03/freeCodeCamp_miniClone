import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaFire, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogout(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center bg-gray-700 text-gray-400 rounded p-2 w-1/4">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search 8000+ tutorials"
            className="bg-gray-700 outline-none w-full text-white"
          />
        </div>
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold">freeCodeCamp</h1>
          <FaFire className="text-white h-8 ml-2" />
        </div>
        <div className="flex space-x-4">
          <button className="border border-white text-white py-2 px-4 rounded">
            Menu
          </button>
          {isLoggedIn ? (
            <div className="relative inline-block text-left">
              <FaUser
                className="text-white h-8"
                onClick={() => setShowLogout(!showLogout)}
              />
              {showLogout && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="mr-1" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin">
              <button className="bg-yellow-500 text-black py-2 px-4 rounded">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
