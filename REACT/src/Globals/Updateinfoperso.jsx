import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context"; // Adjust the path as needed
import useRequireAuth from "../auth/UseRequireAuth";
import { useNavigate } from "react-router-dom";
import Navbaruser from "../Utilisateur/Navbaruser";
import axios from "axios";

const Updateinfoperso = () => {
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
    const formData = new FormData();
    formData.append("username", updatedUser.username);
    formData.append("lastname", updatedUser.lastname);
    formData.append("email", updatedUser.email);
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
      console.log(response.data);
      updateUser(response.data);
      navigate('/Utilisateur/infoperso');
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
    <div className="h-screen bg-white shadow-md">
      <Navbaruser />
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full h-full m-2 mt-2 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Informations Personnelles</h2>
          <div className="grid grid-cols-1 gap-4">
            {updatedUser.image && (
              <div
                className="h-16 w-16 rounded-full mr-2 cursor-pointer"
                style={{
                  backgroundImage: `url('${updatedUser.image}')`,
                  backgroundSize: "cover",
                }}
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
                className="text-lg ml-20 text-gray-900 flex-1"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Prénom :</label>
              <input
                type="text"
                name="lastname"
                value={updatedUser.lastname}
                onChange={handleInputChange}
                className="text-lg ml-16 text-gray-900 flex-1"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Adresse e-mail :</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="text-lg ml-4 text-gray-900 flex-1"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Mot de passe :</label>
              <input
                type="password"
                name="password"
                value={updatedUser.password}
                onChange={handleInputChange}
                className="text-lg ml-6 text-gray-900 flex-1"
                placeholder="Laissez vide pour ne pas changer"
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Rôle :</label>
              <p className="text-lg ml-20 text-gray-900 flex-1">{updatedUser.role}</p>
            </div>
          </div>
          <br />
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleUpdate}
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateinfoperso;
