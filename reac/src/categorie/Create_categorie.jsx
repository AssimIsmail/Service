import React, { useState } from 'react';
import AdminNav from '../navigation/AdminNav';
import axios from 'axios';

const Create_categorie = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Catégorie créée avec succès!');
      setImageUrl(response.data.image_url);  // Mettre à jour l'état de l'image URL
    } catch (error) {
      alert('Erreur lors de la création de la catégorie');
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Créer une nouvelle catégorie</h2>
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create_categorie;
