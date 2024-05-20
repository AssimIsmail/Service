import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import useRequireAuth from "../auth/UseRequireAuth";
import { UserContext } from "../context";
import axios from "axios";
import "../App.css"; // Assurez-vous d'importer le fichier CSS personnalisé

const Navbaruser = () => {
  const { user, setUser } = useContext(UserContext);
  useRequireAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleServiceSubmit = async () => {
    setModalOpen(false);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/utilisateurs/${user.id}`,
        {
          role: "dev",
        }
      );
      console.log(response.data);
      setUser({ ...user, role: "dev" });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle :", error);
    }
  };

  return (
    <div className="bg-gray-100 p-1 font-sans">
      <nav className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        {user && (
          <h2 className="text-base font-serif mb-0"></h2>
        )}

        <div
          className={`flex space-x-4 ${
            user?.role === "dev" ? "justify-center" : ""
          }`}
        >
          <NavLink
            to="/Utilisateur/infoperso"
            exact
            className="nav-link text-gray-800 text-lg font-semibold"
            activeClassName="nav-link-active"
          >
            Informations Personnelles
          </NavLink>

          <NavLink
            to="/Utilisateur/suiviedemande"
            exact
            className="nav-link text-gray-800 text-lg font-semibold"
            activeClassName="nav-link-active"
          >
            Suivi de Mes Demandes
          </NavLink>

          {user?.role === "dev" && (
            <>
              <NavLink
                to="/Utilisateur/Listeservice"
                exact
                className="nav-link text-gray-800 text-lg font-semibold"
                activeClassName="nav-link-active"
              >
                Mes services
              </NavLink>

              <NavLink
                to="/Utilisateur/Listetaches"
                exact
                className="nav-link text-gray-800 text-lg font-semibold"
                activeClassName="nav-link-active"
              >
                Taches
              </NavLink>
            </>
          )}
        </div>
        <span className=""></span>
        {user?.role === "user" && (
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Proposer un service
          </button>
        )}
        
      </nav>

      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Proposer un service
            </h3>
            <p className="text-gray-700 mb-4">
              Vous êtes sur le point de proposer vos services pour la
              réalisation de projets passionnants ? Assurez-vous de posséder les
              compétences nécessaires pour mener à bien ces projets.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleServiceSubmit}
                className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md mr-2 transition duration-300 ease-in-out"
              >
                Proposer
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbaruser;
