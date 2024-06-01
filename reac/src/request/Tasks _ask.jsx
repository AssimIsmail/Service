import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";

const Tasks_ask= () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  const [demandes, setDemandes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("en attente");

  const fetchDemandes = async () => {
    try {
      if (user) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/demandes?dev=${user.id}&status=${statusFilter}`
        );
        setDemandes(response.data);
      }
    } catch (error) {
      console.error("Error fetching demandes:", error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, [user, statusFilter]);

  const shortenDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 1) {
      return `${words.slice(0, 1).join(" ")} ...`;
    }
    return description;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "en attente":
        return "bg-yellow-100";
      case "en cours":
        return "bg-blue-100";
      case "terminée":
        return "bg-green-100";
      default:
        return "";
    }
  };

  const updateDemandeStatus = async (demandeId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/demandes/${demandeId}`, {
        status: newStatus,
      });
      fetchDemandes(); 
    } catch (error) {
      console.error("Error updating demande status:", error);
    }
  };

  return (
    <div className="h-screen bg-white shadow-md">
        <Navbar/>
      <Navbarlinks />
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full h-full m-2  pt-4 p-2 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Liste des taches</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Objectifs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Révisions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {demandes &&
                  demandes.map((demande) => (
                    <tr
                      key={demande.id}
                      className={getStatusClass(demande.status)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.demandeur}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shortenDescription(demande.description)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shortenDescription(demande.mes_besoin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.durer} jour
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.revisions} fois
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.prix} $
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {demande.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                        <Link to={`/Chat_request/${demande.id}`} className="ml-4 inline-block bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600">
        Contacter
    </Link>
                          {demande.status === "en attente" && (
                            <>
                              <button
                                className="flex items-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs mr-2"
                                onClick={() =>
                                  updateDemandeStatus(demande.id, "en cours")
                                }
                              >
                                Accepter
                              </button>
                              <button
                                className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                                onClick={() =>
                                  updateDemandeStatus(demande.id, "refuser")
                                }
                              >
                                Refuser
                              </button>
                         
                            </>
                          )}
                          {demande.status === "en cours" && (
                            <button
                              className="flex items-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs mr-2"
                              onClick={() =>
                                updateDemandeStatus(demande.id, "Terminer")
                              }
                            >
                              Terminer
                            </button>
                          )}
                          {demande.status === "Terminer" && (
                            <button
                              className="flex items-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs mr-2"
                              onClick={() =>
                                updateDemandeStatus(demande.id, "Terminer")
                              }
                            >
                              la tâche est terminée
                            </button>
                          )}
                          {demande.status === "refuser" && (
                            <button
                              className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs mr-2"
                              onClick={() =>
                                updateDemandeStatus(demande.id, "Terminer")
                              }
                            >
                              la tâche a été refusée
                            </button>
                          )}
                          <Link
                            to={`/Detail_tasks/${demande.id}`}
                            className="flex items-center bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs mr-2"
                          >
                            Détail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks_ask;
