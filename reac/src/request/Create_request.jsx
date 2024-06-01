import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";


const Create_request = () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  const { id, type, utilisateur_id } = useParams();
  const [userr, setUser] = useState(null);
  const [prixtype, setPrixtype] = useState(null);
  const [besoin, setBesoin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://127.0.0.1:8000/api/utilisateurs/${utilisateur_id}`
        );
        setUser(userResponse.data);

        const typeResponse = await axios.get(
          `http://127.0.0.1:8000/api/${type}/${id}`
        );
        setPrixtype(typeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, type, utilisateur_id]);
  const handeldemande = async (e) => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handleAccept = async () => {
    setIsSubmitting(true);
    const demande = {
      utilisateur_id: user.id,
      dev: userr.id,
      demandeur:
        user && user.username && user.lastname
          ? `${user.username} ${user.lastname}`
          : "",
      name_dev:
        userr && userr.username && userr.lastname
          ? `${userr.username} ${userr.lastname}`
          : "",
      prix: prixtype.prix,
      type: type,
      durer: prixtype.durer,
      revisions: prixtype.revisions,
      description: prixtype.description,
      mes_besoin: besoin,
      status: "en attente",
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/demandes`,
        demande
      );
      console.log("Demande réussie:", response.data);
      setShowAlert(false);
      setSuccessAlert(true);
      navigate('/Followed')
    } catch (error) {
      console.error("Erreur lors de la demande:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeny = () => {
    console.log("Refus de la demande");
    setShowAlert(false);
  };
  useEffect(() => {
    console.log("showAlert:", showAlert, "successAlert:", successAlert);
  }, [showAlert, successAlert]);
  return (
    <div className="h-screen">
      <Navbar/>
      <Navbarlinks />
    <div>
    {showAlert && (
        <div role="alert" className="alert m-4 p-5 bg-white text-black rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current text-black shrink-0 w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Confirmez-vous l'envoi de cette demande ?</span>
            </div>
            <div>
              <button
                onClick={handleDeny}
                className="btn mr-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="btn text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
      {successAlert && (
        <div role="alert" className="alert alert-success m-4 p-5 bg-green-500 text-white rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Votre demande a été soumise avec succès !</span>
          </div>
        </div>
      )}
    </div>
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-4xl m-4 bg-white shadow-md rounded-lg flex divide-x divide-gray-200">
          {/* Partie pour la description des besoins */}
          <div className="w-1/2 p-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description de mes besoins
              </label>
              <textarea
                id="description"
                className="input-field w-full h-64"
                rows="4"
                placeholder="Saisissez la description de vos besoins..."
                onChange={(e) => setBesoin(e.target.value)}
              />
            </div>
          </div>

          {/* Partie pour le reste des informations */}
          <div className="w-1/2 p-5">
            {userr && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nom du développeur
                </label>
                <input
                  className="input-field"
                  value={`${userr.username} ${userr.lastname}`}
                  readOnly
                />
              </div>
            )}
            {prixtype && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Prix
                </label>
                <input
                  className="input-field"
                  value={`${prixtype.prix} $`}
                  readOnly
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Durée
                </label>
                <input
                  className="input-field"
                  value={`Livraison en ${prixtype.durer} jours`}
                  readOnly
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Révisions
                </label>
                <input
                  className="input-field"
                  value={`${prixtype.revisions} révisions`}
                  readOnly
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <input
                  className="input-field"
                  value={prixtype.description}
                  readOnly
                />
              </div>
            )}
              <button
        onClick={handeldemande}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        type="submit"
      >
        Soumettre
      </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Create_request;
