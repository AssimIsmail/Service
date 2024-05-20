import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Categorie = () => {
  const { categorie } = useParams();
  const categorieName = categorie.replace(/-/g, " ");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/services");
        const filteredServices = response.data.filter(
          (service) =>
            service.categorie.toLowerCase() === categorieName.toLowerCase()
        );
        setServices(filteredServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [categorieName]);

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
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">{categorieName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-10">
          {services.map((service) => (
            <Link
            to={service ? `/profile/${service.utilisateur_id}/${service.id}` : ''}
              key={service.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div
                className="bg-cover bg-center h-48"
                style={{ backgroundImage: `url(${service.image ? service.image : 'default-image-path.jpg'})` }}
              ></div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">
                  {shortenDescription(service.description)}
                </h4>
                <p className="text-gray-600">
                  Prix moyen: ${service.prixmoyen}
                </p>
                <p className="text-gray-600">
                  Nombre de services réalisés: {services.length}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorie;
