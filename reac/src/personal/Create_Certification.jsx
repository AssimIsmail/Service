import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import Navbarlinks from '../navigation/Navlinks';
import { UserContext } from '../context/UserContext';
import useRequireAuth from '../hooks/useRequireAuth';
import { Link, useNavigate } from 'react-router-dom';

const Create_Certification = () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([
    { nom: '', institution: '', annee: '' }
  ]);
  const [error, setError] = useState(null); // Define error state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...certifications];
    list[index][name] = value;
    setCertifications(list);
  };

  const handleAddCertification = () => {
    const newCertification = { nom: '', institution: '', annee: '' };
    setCertifications([...certifications, newCertification]);
  };

  const handleRemoveCertification = (index) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Sending multiple certifications data:", certifications.map(certification => ({ ...certification, utilisateur_id: user.id })));

        const responses = await Promise.all(
            certifications.map(async (certification) => {
                const dataToSend = { ...certification, utilisateur_id: user.id };
                const response = await axios.post('http://127.0.0.1:8000/api/certificats', dataToSend);
                return response.data;
            })
        );
        navigate('/Certification_Experience');
        setError(null);
        console.log('Multiple certifications added:', responses);
    } catch (error) {
        console.error('Failed to add multiple certifications:', error);
        setError(error.message || 'Failed to add multiple certifications'); // Set error state
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <Navbarlinks />
      <div className="container mx-auto px-4 py-8">
        <Link
            to={"/Certification_Experience"}
            className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
          >
             Retourner à Certification Experience
          </Link>
        <h1 className="text-xl font-bold text-center mb-8">Créer des nouvelles certifications</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {certifications.map((certification, index) => (
            <div key={index} className="flex flex-col md:flex-row md:justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="mb-4">
                  <label htmlFor={`nom-${index}`} className="block text-sm font-medium">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    id={`nom-${index}`}
                    value={certification.nom}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nom de la certification"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`institution-${index}`} className="block text-sm font-medium">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    id={`institution-${index}`}
                    value={certification.institution}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Institution"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`annee-${index}`} className="block text-sm font-medium">Année</label>
                  <input
                    type="text"
                    name="annee"
                    id={`annee-${index}`}
                    value={certification.annee}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Année"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCertification}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Ajouter une certification
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
          >
            Enregistrer les certifications
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create_Certification

