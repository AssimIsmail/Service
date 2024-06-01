import React from "react";

const CertificationsAndExperiences = ({ certificats, experiences, users }) => {
  return (
    <div className="border p-4">
      <section>
        <h2 className="text-lg font-bold mb-2">Certificats</h2>
        {certificats && certificats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificats.map((certificat, index) => {
              const user = users?.find((user) => user.id === certificat.utilisateur_id);
              return (
                <div key={index} className="border p-4 rounded-lg mb-4 shadow">
                  <h3 className="text-base font-bold mb-2">{certificat.nom}</h3>
                  <p className="text-gray-700">Institution: {certificat.institution}</p>
                  <p className="text-gray-700">Année: {certificat.annee}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">Aucun certificat disponible.</p>
        )}
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-bold mb-2">Expériences</h2>
        {experiences && experiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experiences.map((experience, index) => {
              const user = users?.find((user) => user.id === experience.utilisateur_id);
              return (
                <div key={index} className="border p-4 rounded-lg mb-4 shadow">
                  <h3 className="text-base font-bold mb-2">{experience.poste}</h3>
                  
                  <p className="text-gray-700">Durée: {experience.duree}</p>
                  <p className="text-gray-700">Mission: {experience.mission}</p>
                  {user && <p className="text-sm text-gray-500">Expérience chez: {experience.entreprise}</p>}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">Aucune expérience disponible.</p>
        )}
      </section>
    </div>
  );
};

export default CertificationsAndExperiences;

