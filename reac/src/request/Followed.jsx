import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";
import { Link } from "react-router-dom";

const Followed = () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  const [demandes, setDemandes] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        let url = `http://127.0.0.1:8000/api/demandes?utilisateur_id=${user.id}`;
        if (statusFilter) {
          url += `&status=${statusFilter}`;
        }
        console.log("API call URL:", url); // Debug logging
        const response = await axios.get(url);
        console.log("API response:", response.data); // Debug logging
        setDemandes(response.data);
      } catch (error) {
        console.error("Error fetching demandes:", error);
      }
    };
    fetchDemandes();
  }, [user, statusFilter]);

  const shortenDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 3) {
      return `${words.slice(0, 3).join(" ")} ...`;
    }
    return description;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "en attente":
        return "bg-yellow-100";
      case "en cours":
        return "bg-blue-300";
      case "Terminer":
        return "bg-green-400";
      default:
        return "";
    }
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    console.log("Selected status:", selectedStatus); // Debug logging
    setStatusFilter(selectedStatus);
  };

  return (
    <div className="h-screen bg-white shadow-md">
        <Navbar/>
      <Navbarlinks />
      <div className="flex-1 flex justify-center items-center m-2">
        <div className="w-full h-full p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Liste des demandes</h2>
          <div className="flex items-center mb-4">
            <label htmlFor="statusFilter" className="mr-2 font-semibold">
              Filtrer par status:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={handleStatusChange}
              className="border rounded p-1"
            >
              <option value="">Tous</option>
              <option value="en attente">en attente</option>
              <option value="en cours">en cours</option>
              <option value="Terminer">Terminer</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Développeur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mes Objectif
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
                </tr>
              </thead>
              <tbody>
                {demandes &&
                  demandes.map((demande) =>
                    statusFilter === "" || demande.status === statusFilter ? (
                      <tr
                        key={demande.id}
                        className={getStatusClass(demande.status)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {demande.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {demande.name_dev}
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
    <Link to={`/Chat_request/${demande.id}`} className="ml-4 inline-block bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600">
        Contacter
    </Link>
</td>

                      </tr>
                    ) : null
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followed;
