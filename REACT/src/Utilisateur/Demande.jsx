import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequireAuth from "../auth/UseRequireAuth";
import axios from "axios";
import Navbaruser from "./Navbaruser";
import { UserContext } from "../context";

const Demande = () => {
  const { user } = useContext(UserContext);
  useRequireAuth();
  const { id, type, utilisateur_id } = useParams();
  const [userr, setUser] = useState(null);
  const [prixtype, setPrixtype] = useState(null);
  const [besoin, setBesoin] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      console.log(response.data);
      setShowAlert(false);
      setSuccessAlert(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeny = () => {
    setShowAlert(false);
  };
  return (
    <div className="h-screen  bg-white shadow-md">
      <Navbaruser />

      <div className="flex-1 flex justify-center items-center">
        <div className="w-full h-full m-4 mt-4 bg-white shadow-md rounded-lg">
          <form
            onSubmit={handeldemande}
            className="  mx-auto  shadow-md ml-2 mt-2 p-10 mr-2 bg-white rounded-lg"
          >
            {showAlert && (
              <div role="alert" className="alert m-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Confirmez-vous l'envoi de cette demande ?</span>
                <div>
                  <button onClick={handleDeny} className="btn btn-sm">
                    Refuser
                  </button>
                  <button
                    onClick={handleAccept}
                    className="btn btn-sm btn-primary"
                  >
                    Accepter
                  </button>
                </div>
              </div>
            )}
            {successAlert && (
              <div role="alert" className="alert alert-success m-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
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
            )}
            {userr && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nom du développeur
                </label>
                <input
                  className="input-field"
                  value={
                    userr && userr.username && userr.lastname
                      ? userr.username && userr.lastname
                        ? `${userr.username} ${userr.lastname}`
                        : ""
                      : ""
                  }
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description de mes besoins
              </label>
              <textarea
                id="description"
                className="input-field w-96 "
                rows="4"
                placeholder="Saisissez la description de vos besoins..."
                onChange={(e) => setBesoin(e.target.value)}
              />
            </div>

            <button
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Soumettre
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Demande;
