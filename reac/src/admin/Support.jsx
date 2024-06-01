import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminNav from "../navigation/AdminNav";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal"; // Assurez-vous d'avoir un composant Modal
import { Link } from "react-router-dom";
import useRequireAuthAdmin from "../hooks/useRequireAuthAdmin";
const Support = () => {
  useRequireAuthAdmin();
  const { user } = useContext(UserContext);
  const [supports, setSupports] = useState([]);
  const [filter, setFilter] = useState(""); // État pour stocker le filtre de raison
  const [showModal, setShowModal] = useState(false);
  const [currentSupport, setCurrentSupport] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/supports")
      .then((response) => {
        setSupports(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Filtrer les supports en fonction de la raison sélectionnée
  const filteredSupports = filter
    ? supports.filter((support) => support.raison === filter)
    : supports;

  const handleReplyClick = (support) => {
    setCurrentSupport(support);
    setShowModal(true);
  };

  const handleSubmitResponse = (responseText) => {
    const postData = {
      support_id: currentSupport.id.toString(), // Assurez-vous que ceci est également une chaîne si nécessaire
      utilisateur_id: user.id.toString(), // Convertir en chaîne
      description: responseText,
    };

    console.log("Envoi des données:", postData); // Log pour déboguer les données envoyées

    axios
      .post("http://127.0.0.1:8000/api/reponses", postData)
      .then((response) => {
        console.log("Réponse envoyée:", response.data);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la réponse:", error);
        if (error.response) {
          // Afficher des détails supplémentaires disponibles dans la réponse du serveur
          console.error("Détails de l'erreur:", error.response.data);
        }
      });
  };

  return (
    <div>
      <AdminNav />
      <h1 className="text-2xl font-bold text-center my-4">Support</h1>
      <div className="flex items-center space-x-4 mb-4">
        <label
          htmlFor="reason-filter"
          className="text-sm font-medium text-gray-700"
        >
          Filtrer par raison:
        </label>
        <select
          id="reason-filter"
          className="block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Toutes les raisons</option>
          <option value="delay">Livraison retardée</option>
          <option value="website">Problèmes de site web</option>
          <option value="banned">Compte banni</option>
          <option value="other">Autre</option>
        </select>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitResponse}
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                ID
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Utilisateur ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Raison
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSupports.map((support) => (
              <tr key={support.id}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {support.id}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {support.utilisateur_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {support.raison}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {support.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleReplyClick(support)}
                  >
                    Répondre
                  </button>
                  <Link
                    to={`/Suivie_plaine/${support.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Suivre
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Support;
