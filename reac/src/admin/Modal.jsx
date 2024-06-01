import React, { useState } from 'react';
import useRequireAuthAdmin from '../hooks/useRequireAuthAdmin';

const Modal = ({ onClose, onSubmit }) => {
  
  const [responseText, setResponseText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(responseText);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Répondre au Support</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300"
            rows="6"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Tapez votre réponse ici..."
          ></textarea>
          <div className="mt-4">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Envoyer
            </button>
            <button type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={onClose}>
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;