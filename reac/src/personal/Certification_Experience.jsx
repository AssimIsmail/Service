import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import Navbarlinks from "../navigation/Navlinks";
import useRequireAuth from "../hooks/useRequireAuth";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Certification_Experience = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [certification, setCertification] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/certificats?utilisateur_id=${user.id}`)
      .then((response) => {
        setCertification(response.data);
      })
      .catch((error) => {
        console.error("Error fetching certifications:", error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/experiences?utilisateur_id=${user.id}`)
      .then((response) => {
        setExperience(response.data);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      });
  }, []);

  const handleDeleteCertification = (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      axios.delete(`http://127.0.0.1:8000/api/certificats/${id}`)
        .then(() => {
          setCertification(prevCertifications => prevCertifications.filter(cert => cert.id !== id));
          alert("Certification deleted successfully!");
        })
        .catch(error => {
          console.error("Failed to delete certification:", error);
          alert("Failed to delete certification.");
        });
    }
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      axios.delete(`http://127.0.0.1:8000/api/experiences/${id}`)
        .then(() => {
          setExperience(prevExperiences => prevExperiences.filter(exp => exp.id !== id));
          alert("Experience deleted successfully!");
        })
        .catch(error => {
          console.error("Failed to delete experience:", error);
          alert("Failed to delete experience.");
        });
    }
  };

  return (
    <div>
      <Navbar />
      <Navbarlinks />
      <h1 className="text-center font-bold my-4">
        Certifications et Expériences
      </h1>
      <div className="flex flex-row justify-around">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-center">Certifications</h2>
          <Link
            to={"/Create_Certification"}
            className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded "
          >
            Ajouter Certification
          </Link>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Institution
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Année
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certification.map((cert) => (
                  <tr key={cert.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cert.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cert.institution}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cert.annee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      <Link
                        to={`/Modify_certification/${cert.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDeleteCertification(cert.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-center">Expériences</h2>
          <Link
            to={"/Create_Experience"}
            className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
          >
            Ajouter Expérience
          </Link>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Poste
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Entreprise
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mission
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Durée
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {experience.map((exp) => (
                  <tr key={exp.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exp.poste}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exp.entreprise}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exp.mission}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exp.duree}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      <Link
                        to={`/Modify_experience/${exp.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-2"
                      >
                        Supprimer
                      </button>
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

export default Certification_Experience;
