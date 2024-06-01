import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbarlinks from "../navigation/Navlinks";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbar from "../navigation/Navbar";

const Personal_info = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [imageKey, setImageKey] = useState("");

  useEffect(() => {
    if (user?.image) {
      const baseUrl = user.image.split("?")[0];
      setImageKey(`${baseUrl}?${new Date().getTime()}`);
    }
  }, [user?.image]);

  useEffect(() => {
    console.log("Mise à jour de l'utilisateur détectée", user);
    console.log("Nouvelle clé d'image", imageKey);
  }, [user, imageKey]);
  useEffect(() => {
    // Mettre à jour l'URL de l'image
    if (user?.image) {
      setImageKey(user.image);
    }
  }, [user?.image]);
  
  
  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <Navbarlinks />
      <div className="flex justify-center items-center ">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Informations Personnelles</h2>
          <div className="grid grid-cols-1 gap-4">
            {user?.image && (
              <div
                className="h-16 w-16 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${imageKey}')` }}
              ></div>
            )}
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Nom :</label>
              <p className="text-lg ml-4 text-gray-900 flex-1">
                {user?.username}
              </p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Prénom :</label>
              <p className="text-lg ml-4 text-gray-900 flex-1">
                {user?.lastname}
              </p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Adresse e-mail :</label>
              <p className="text-lg ml-4 text-gray-900 flex-1">{user?.email}</p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Mot de passe :</label>
              <input
                type="password"
                className="text-lg ml-4 text-gray-900 bg-transparent border-none"
                value={user?.password || ""}
                disabled
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Rôle :</label>
              <p className="text-lg ml-4 text-gray-900 flex-1">{user?.role}</p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
              to={"/Personal_update"}
            >
              Mettre à jour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal_info;
