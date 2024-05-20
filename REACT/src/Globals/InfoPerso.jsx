import React, { useContext } from "react";
import useRequireAuth from "../auth/UseRequireAuth";
import Navbaruser from "../Utilisateur/Navbaruser";
import { Link } from "react-router-dom";
import { UserContext } from "../context";

const InfoPerso = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen  bg-gray-100 bg-white shadow-md">
      <Navbaruser />
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full h-full m-2 mt-2  p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Informations Personnelles</h2>
          <div className="grid grid-cols-1 gap-4">
            {user?.image && (
              <div
                className="h-16 w-16 rounded-full mr-2 cursor-pointer"
                style={{
                  backgroundImage: `url('${user?.image}')`,
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">Nom :</label>
              <p className="text-lg ml-20 text-gray-900 flex-1">
                {user?.username}
              </p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">
                Prénom :
              </label>
              <p className="text-lg ml-16 text-gray-900 flex-1">
                {user?.lastname}
              </p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">
                Adresse e-mail :
              </label>
              <p className="text-lg ml-4 text-gray-900 flex-1">{user?.email}</p>
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">
                Mot de passe :
              </label>
              <input
                type="password"
                className="text-lg ml-6 text-gray-900  "
                value={user?.password || ""}
                disabled
              />
            </div>
            <div className="mb-4 border-b border-gray-300 flex items-center">
              <label className="text-sm font-medium text-gray-700">
                Rôle :
              </label>
              <p className="text-lg ml-20 text-gray-900 flex-1">{user?.role}</p>
            </div>
          </div>
          <br />
          <Link
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            to={"/Utilisateur/updateinfo"}
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoPerso;
