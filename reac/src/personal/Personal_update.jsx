import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";

const Personal_update = () => {
  const { user, setUser, updateUser } = useContext(UserContext);
  useRequireAuth();
  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "",
    image: user?.image || "",
  });

  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("username", updatedUser.username);
    formData.append("lastname", updatedUser.lastname);
    if (updatedUser.password) {
      formData.append("password", updatedUser.password);
    }
    if (newImage) {
      formData.append("image", newImage);
    }
    formData.append("_method", "PUT");

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/utilisateurs/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateUser(response.data);
      navigate('/Personal_info');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      role: user?.role || "",
      image: user?.image || "",
    });
  }, [user]);

  return (
    <div className="h-screen bg-gray-100 relative">
      <Navbar/>
      <Navbarlinks />
      <div className="flex justify-center items-center ">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Mettre à jour les informations personnelles</h2>
          <div className="grid grid-cols-1 gap-4">
            {updatedUser.image && (
              <div
                className="h-16 w-16 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${updatedUser.image}')` }}
              ></div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Nom :</label>
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
                className="text-lg ml-4 text-gray-900 flex-1 bg-transparent border-none"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Prénom :</label>
              <input
                type="text"
                name="lastname"
                value={updatedUser.lastname}
                onChange={handleInputChange}
                className="text-lg ml-4 text-gray-900 flex-1 bg-transparent border-none"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
  <label className="text-sm font-medium text-gray-700">Adresse e-mail :</label>
  <input
    type="email"
    name="email"
    value={updatedUser.email}
    onChange={handleInputChange}
    className="text-lg ml-4 text-gray-900 flex-1 bg-transparent border-none"
  />
</div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Mot de passe :</label>
              <input
                type="password"
                name="password"
                value={updatedUser.password}
                onChange={handleInputChange}
                className="text-lg ml-4 text-gray-900 flex-1 bg-transparent border-none"
                placeholder="Laissez vide pour ne pas changer"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Rôle :</label>
              <p className="text-lg ml-4 text-gray-900 flex-1">{updatedUser.role}</p>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={handleUpdate}
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <span className="ml-2">Traitement en cours...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal_update;
