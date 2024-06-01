import React from 'react';
import { Link } from 'react-router-dom';

const Notfounde = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
      <p className="text-gray-600 mb-8">La page que vous recherchez n'existe pas.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Retour à la page d'accueil
      </Link>
    </div>
  );
};

export default Notfounde;
