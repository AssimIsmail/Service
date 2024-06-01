import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";

const Service_list = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [services, setServices] = useState(null);

  const fetchServices = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/services?utilisateur_id=${user.id}`
    );
    setServices(response.data);
  };

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user]);

  const shortenDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 5) {
      return `${words.slice(0, 5).join(" ")} ...`;
    }
    return description;
  };

  const deleteservice = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}`);
      fetchServices(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-white shadow-md">
        <Navbar/>
      <Navbarlinks />

      <div className="flex-1 flex justify-center items-center m-2">
        <div className="w-full h-full p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Liste des services
            <Link
              to={"/Create_service"}
              className="flex items-center bg-green-500 text-white px-2 py-1 w-36 rounded hover:bg-green-600 text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M13.293 4.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM7 7a1 1 0 100 2h6a1 1 0 100-2H7zm4 5a1 1 0 100 2H7a1 1 0 100-2h4z"
                  clipRule="evenodd"
                />
              </svg>
              Ajouter un service
            </Link>
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix Moyen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {services &&
                  services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.categorie}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shortenDescription(service.description)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {service.prixmoyen} $
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          
                          <Link
                            to={`/Update_service/${service.id}`}
                            className="flex items-center bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.293 4.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM7 7a1 1 0 100 2h6a1 1 0 100-2H7zm4 5a1 1 0 100 2H7a1 1 0 100-2h4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Modifier
                          </Link>
                          <button
                            onClick={() => deleteservice(service.id)}
                            to={""}
                            className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 6a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm1-4a1 1 0 011-1h6a1 1 0 011 1v1H6V2zm7 2v2h2V4h-2zM4 8h12v10H4V8z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Supprimer
                          </button>
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

export default Service_list;
