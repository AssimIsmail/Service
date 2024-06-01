import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import Navbar from "../navigation/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Profile_category = () => {
  const { categorie } = useParams();
  const categorieName = categorie.replace(/-/g, " ");
  const [services, setServices] = useState([]);
  const [etoilesMoyennes, setEtoilesMoyennes] = useState({}); // Nouvel état pour stocker les moyennes des étoiles

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services");
        const filteredServices = response.data.filter(
          (service) =>
            service.categorie.toLowerCase() === categorieName.toLowerCase()
        );
        setServices(filteredServices);
        filteredServices.forEach(service => {
          fetchCommentsAverage(service.id);
        });
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [categorieName]);
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    return stars;
  };
  const fetchCommentsAverage = async (serviceId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/commentaires?service_id=${serviceId}`);
      const commentaires = response.data;
      const totalEtoiles = commentaires.reduce((acc, commentaire) => acc + commentaire.etoil, 0);
      const moyenneEtoiles = commentaires.length > 0 ? (totalEtoiles / commentaires.length).toFixed(2) : 0;
      setEtoilesMoyennes(prev => ({ ...prev, [serviceId]: moyenneEtoiles }));
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error);
    }
  };

  const shortenDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 6) {
      return `${words.slice(0, 6).join(" ")} ...`;
    }
    return description;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">
          {categorieName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-10">
          {services.map((service) => (
            <Link
              to={
                service
                  ? `/profile/${service.utilisateur_id}/${service.id}`
                  : ""
              }
              key={service.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div
                className="bg-cover bg-center h-48"
                style={{
                  backgroundImage: `url(${
                    service.image ? service.image : "default-image-path.jpg"
                  })`,
                }}
              ></div>
              <div className="p-4">
                
                <h4 className="font-semibold mb-2">
                  {shortenDescription(service.description)}
                </h4>
                <p className="text-gray-600">
                  Prix moyen: ${service.prixmoyen}
                </p>
                <p className="text-gray-600">
                  {etoilesMoyennes[service.id] ? renderStars(Math.round(etoilesMoyennes[service.id])) : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile_category;
