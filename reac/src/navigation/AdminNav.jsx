import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AdminNav = () => {
  const {logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <nav className="bg-white text-black p-4 w-full border border-gray-300">
      <ul className="flex justify-between items-center">
        
        <div className="flex-grow flex justify-center space-x-4">
          <li><Link to="/utilisateur" className="hover:text-gray-800">Espace utilisateur</Link></li>
          <li><Link to="/Support" className="hover:text-gray-800">Espace support</Link></li>
          <li><Link to="/Gestion_services" className="hover:text-gray-800">Gestion des services</Link></li>
        </div>
        <li>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;