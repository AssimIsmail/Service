import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import Navbarlinks from '../navigation/Navlinks';
import { UserContext } from '../context/UserContext';
import useRequireAuth from '../hooks/useRequireAuth';

const Modify_Certification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useRequireAuth();
  const [certification, setCertification] = useState({
    nom: '',
    institution: '',
    annee: ''
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/certificats/${id}`)
      .then(response => {
        setCertification(response.data);
      })
      .catch(error => {
        console.error("Error fetching certification:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/certificats/${id}`, {
        ...certification,
        utilisateur_id: user.id
      });
      alert("Certification updated successfully!");
      navigate('/Certification_Experience');
    } catch (error) {
      console.error('Failed to update certification:', error);
      alert("Failed to update certification.");
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
        <h1 className="text-xl font-bold text-center mb-8">Modifier la certification</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={certification.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="institution" className="block text-sm font-medium">Institution</label>
                <input
                  type="text"
                  name="institution"
                  id="institution"
                  value={certification.institution}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="annee" className="block text-sm font-medium">Année</label>
                <input
                  type="text"
                  name="annee"
                  id="annee"
                  value={certification.annee}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modify_Certification