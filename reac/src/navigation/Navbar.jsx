import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      setShowOptions(false);
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link
          to="/home"
          style={{
            backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjlhP9luzChgWvWsUX9KAzg9YuwFVt-p6w9A&s)`,
            width: "50px",
            height: "50px",
            backgroundSize: "cover",
          }}
        ></Link>
        <div className="flex-grow text-center">
          <Link
            to="/home"
            className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium mr-4"
          >
            Accueil
          </Link>
          <Link
            to="/categories"
            className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            Services
          </Link>
          {/* Utilisez un onClick handler pour déplacer la page vers la section "A propos" */}
          <Link
            to="/A_propos"
            onClick={scrollToAbout}
            className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            A Propos
          </Link> <Link
            to="/Suivie_support"
            onClick={scrollToAbout}
            className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            Support
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <div className="flex items-center" onClick={toggleOptions}>
                <div
                  className="h-8 w-8 rounded-full mr-2 cursor-pointer"
                  style={{
                    backgroundImage: `url('${user.image}')`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <span className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  {user.username}
                </span>
              </div>
              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Logout
                  </button>
                  <Link
                    to="/Personal_info"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    My Account
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                to="/register"
                className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white bg-black hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
    </nav>
  );
};

export default Navbar;
