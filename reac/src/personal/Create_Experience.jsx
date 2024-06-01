import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../navigation/Navbar';
import Navbarlinks from '../navigation/Navlinks';
import { UserContext } from '../context/UserContext';
import useRequireAuth from '../hooks/useRequireAuth';
import { Link } from 'react-router-dom';

const Create_Experience = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { user } = useContext(UserContext);
  useRequireAuth();
  const [experiences, setExperiences] = useState([
    { poste: '', entreprise: '', duree: '', mission: '' }
  ]);
  const [error, setError] = useState(null); // Define error state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...experiences];
    list[index][name] = value;
    setExperiences(list);
  };

  const handleAddExperience = () => {
    const newExperience = { poste: '', entreprise: '', duree: '', mission: '' };
    setExperiences([...experiences, newExperience]);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Sending multiple experiences data:", experiences.map(experience => ({ ...experience, utilisateur_id: user.id })));

        const responses = await Promise.all(
            experiences.map(async (experience) => {
                const dataToSend = { ...experience, utilisateur_id: user.id };
                const response = await axios.post('http://127.0.0.1:8000/api/experiences', dataToSend);
                return response.data;
            })
        );
        navigate('/Certification_Experience'); // Use navigate to redirect
        console.log('Multiple experiences added:', responses);
        setError(null);
    } catch (error) {
        console.error('Failed to add multiple experiences:', error);
        setError(error.message || 'Failed to add multiple experiences'); // Set error state
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
             Retourner a Certification Experience
          </Link>
        <h1 className="text-xl font-bold text-center mb-8">Créer des nouvelles expériences</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={index} className="flex flex-col md:flex-row md:justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="mb-4">
                  <label htmlFor={`poste-${index}`} className="block text-sm font-medium">Poste</label>
                  <input
                    type="text"
                    name="poste"
                    id={`poste-${index}`}
                    value={experience.poste}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Poste"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`entreprise-${index}`} className="block text-sm font-medium">Entreprise</label>
                  <input
                    type="text"
                    name="entreprise"
                    id={`entreprise-${index}`}
                    value={experience.entreprise}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Entreprise"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`duree-${index}`} className="block text-sm font-medium">Durée</label>
                  <input
                    type="text"
                    name="duree"
                    id={`duree-${index}`}
                    value={experience.duree}
                    onChange={(e) => handleChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Durée"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor={`mission-${index}`} className="block text-sm font-medium">Mission</label>
                <textarea
                  name="mission"
                  id={`mission-${index}`}
                  value={experience.mission}
                  onChange={(e) => handleChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 h-36 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Décrivez la mission"
                  required
                  rows="4"
                ></textarea>
              </div>
              {experiences.length > 1 && (
                <button type="button" onClick={() => handleRemoveExperience(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                  X
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button type="button" onClick={handleAddExperience} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Ajouter une autre expérience
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Soumettre les expériences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create_Experience;
