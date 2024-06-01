import React, { useContext, useState } from 'react';
import Navbar from '../navigation/Navbar';
import axios from 'axios';
import useRequireAuth from '../hooks/useRequireAuth';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Support_page = () => {
  useRequireAuth()
  const { user } = useContext(UserContext);
  const [raison, setRaison] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || !user.id) {
      console.error('User ID is not available');
      return;
    }
    const formData = {
      utilisateur_id: user.id,
      raison,
      description,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/supports', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Page de Support</h1>
          

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Raison de la plainte:
              <select className="mt-1 block w-full p-2 border border-gray-300"
                      value={raison} onChange={e => setRaison(e.target.value)}>
                <option value="">Sélectionnez une raison</option>
                <option value="delay">Livraison retardée</option>
                <option value="website">Problèmes de site web</option>
                <option value="banned">Compte banni</option>
                <option value="other">Autre</option>
              </select>
            </label>
            <label className="block">
              Description:
              <textarea className="mt-1 block w-full p-2 border border-gray-300"
                        value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <button type="submit" className="px-4 py-2 bg-black text-white font-bold w-full">Soumettre la plainte</button>
          </form>
          <Link to={`/Suivie_support`} className="mt-4 inline-block px-4 py-2 rounded text-gray transition-colors duration-300">
            Suivre les supports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support_page;
