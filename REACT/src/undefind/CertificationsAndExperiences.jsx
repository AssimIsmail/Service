import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CertificationsAndExperiences = ({ certificats, experiences, users }) => {
  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold mb-2">Certificats</h2>
      {certificats && certificats.length > 0 ? (
        certificats.map((certificat, index) => {
          const user =
            users &&
            users.find((user) => user.id === certificat.utilisateur_id);
          return (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h3 className="text-base font-bold mb-2">{certificat.nom}</h3>
              <p className="text-gray-700">{certificat.description}</p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">Aucun certificat disponible.</p>
      )}
      <h2 className="text-lg font-bold mb-2">Expériences</h2>
      {experiences && experiences.length > 0 ? (
        experiences.map((experience, index) => {
          const user =
            users &&
            users.find((user) => user.id === experience.utilisateur_id);
          return (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <h3 className="text-base font-bold mb-2">{experience.nom}</h3>
              <p className="text-gray-700">{experience.description}</p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">Aucune expérience disponible.</p>
      )}
    </div>
  );
};

export default CertificationsAndExperiences;
