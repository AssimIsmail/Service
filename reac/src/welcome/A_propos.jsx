import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const A_propos = () => {
  return (
    <div>
      <Navbar />
    <div className="flex flex-col justify-center items-center h-screen">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">À Propos de Nous</h1>
          <p className="text-lg text-gray-700">
            Bienvenue sur notre site web ! Nous sommes une équipe passionnée de professionnels de l'informatique
            dédiée à fournir les meilleurs services et solutions à nos clients.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Notre objectif est de répondre aux besoins de nos clients en matière de développement de logiciels, de
            maintenance informatique, de sécurité des données et bien plus encore.
          </p>
          <p className="mt-4 text-lg text-gray-700 pb-10">
            Avec notre expertise et notre engagement envers l'excellence, nous sommes prêts à relever tous les défis
            informatiques et à vous aider à atteindre vos objectifs.
          </p>
          <Link to="/categories" className="mt-8 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
            Commencer
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default A_propos;
