import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../navigation/AdminNav';

const Update_categorie = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
        const { name, description, image_url } = response.data;
        setName(name);
        setDescription(description);
        setCurrentImage(image_url);
      } catch (error) {
        alert('Erreur lors du chargement de la catégorie');
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({}); // Reset error messages

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    // Ajoutez ceci pour vérifier les données
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response: ', response.data); // Log the response
      alert('Catégorie mise à jour avec succès!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        alert('Erreur lors de la mise à jour de la catégorie');
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mettre à jour la catégorie</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errorMessages.name && <p className="text-red-500 text-xs italic">{errorMessages.name[0]}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errorMessages.description && <p className="text-red-500 text-xs italic">{errorMessages.description[0]}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image actuelle
            </label>
            {currentImage && (
              <div
                className="h-16 w-16 bg-cover bg-center mb-2"
                style={{
                  backgroundImage: `url('${currentImage}')`,
                }}
              ></div>
            )}
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errorMessages.image && <p className="text-red-500 text-xs italic">{errorMessages.image[0]}</p>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update_categorie;
