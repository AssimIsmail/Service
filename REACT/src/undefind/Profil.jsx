import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import useRequireAuth from "../auth/UseRequireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context";
const Profil = () => {
  const { utilisateur_id,service_id } = useParams();
  const { user } = useContext(UserContext);
  const [userr, setUser] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [service, setService] = useState(null);
  const [certificats, setCertificats] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [basic, setBasic] = useState(null);
  const [standard, setStandard] = useState(null);
  const [premium, setPremium] = useState(null);
  const [commentaires, setCommentaires] = useState(null);
  const [users, setUsers] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [starts, setStarts] = useState(0);
  const [demandes,setDemandes] = useState(null)
  const [activecoment,setactivecoment] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    if (demandes) {
      const demandesFiltrees = demandes.filter(demande => demande.status === "Terminer");
      setactivecoment(demandesFiltrees);
    }
  }, [demandes]);
  
  
  const handleSubmitComment = async () => {

    try {
      const newCommentData = {
        service_id: service[0].id,
        utilisateur_id: user.id,
        etoil: starts,
        commentaire: newComment,
      };
      console.log(newCommentData)
      await axios.post(
        `http://127.0.0.1:8000/api/commentaires`,
        newCommentData
      );

      fetchData();
      setNewComment("");
      setStarts(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  useEffect(() => {
    if (!utilisateur_id) return;
  
    const fetchData = async () => {
      try {
        // Récupérer les informations de l'utilisateur
        const userResponse = await axios.get(
          `http://127.0.0.1:8000/api/utilisateurs/${utilisateur_id}`
        );
        setUser(userResponse.data);
        if(user){
        const demandeResponse = await axios.get(
          `http://127.0.0.1:8000/api/demandes?dev=${utilisateur_id}&utilisateur_id=${user.id}`
        );
        setDemandes(demandeResponse.data);}
        
        const demandesFiltrees = demandes ? demandes.filter(demande => demande.status === "Terminer") : [];
        console.log(demandesFiltrees);
  
        const templateResponse = await axios.get(
          `http://127.0.0.1:8000/api/templates?service_id=${service_id}`
        );
        setTemplates(templateResponse.data);
  
        const serviceResponse = await axios.get(
          `http://127.0.0.1:8000/api/services?id=${service_id}`
        );
        setService(serviceResponse.data);
  
        if (serviceResponse.data.length > 0) {
          const serviceId = serviceResponse.data[0].id;
  
          const [
            basicResponse,
            standardResponse,
            premiumResponse,
            responseCommentaires,
          ] = await Promise.all([
            axios.get(
              `http://127.0.0.1:8000/api/basics?service_id=${service_id}`
            ),
            axios.get(
              `http://127.0.0.1:8000/api/standards?service_id=${service_id}`
            ),
            axios.get(
              `http://127.0.0.1:8000/api/premiums?service_id=${service_id}`
            ),
            axios.get(
              `http://127.0.0.1:8000/api/commentaires?service_id=${service_id}`
            ),
          ]);
  
          setBasic(basicResponse.data);
          setStandard(standardResponse.data);
          setPremium(premiumResponse.data);
          setCommentaires(responseCommentaires.data);
  
          const userPromises = responseCommentaires.data.map((comment) =>
            axios.get(
              `http://127.0.0.1:8000/api/utilisateurs/${comment.utilisateur_id}`
            )
          );
          const usersData = await Promise.all(userPromises);
          setUsers(usersData.map((res) => res.data));
        }
  
        const [certificatResponse, experienceResponse] = await Promise.all([
          axios.get(
            `http://127.0.0.1:8000/api/certificats?utilisateur_id=${utilisateur_id}`
          ),
          axios.get(
            `http://127.0.0.1:8000/api/experiences?utilisateur_id=${utilisateur_id}`
          ),
        ]);
  
        setCertificats(certificatResponse.data);
        setExperiences(experienceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [utilisateur_id,service_id]);
  

  const handlePlanSelect = (plan) => setSelectedPlan(plan);
  const handleClickNext = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === templates.length - 1 ? 0 : prevIndex + 1
    );
  const handleClickPrevious = () =>
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 1 : prevIndex - 1
    );
  const handleContinue = (id, type) =>
    navigate(`/Utilisateur/demande/${type}/${id}/${utilisateur_id}`);

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    return stars;
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-10">
        {/* Information Personnelle */}
        <div className="border p-4 min-h-52 items-center">
          <h1 className="text-lg font-bold mb-2">Information Personnelle</h1>
          <div className="flex items-center">
            <div
              className="h-14 w-14 rounded-full mr-2 cursor-pointer"
              style={{
                backgroundImage: `url('${userr && userr.image}')`,
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <p className="text-black hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                {userr && `${userr.username} ${userr.lastname}`}
              </p>
            </div>
          </div>
          <div className="mt-4 w-96 ml-36">
            <div className="flex items-center justify-center">
              {templates &&
                templates.map((template, index) => (
                  <div
                    key={index}
                    className={`max-w-full h-auto rounded-lg shadow-md overflow-hidden ${
                      index === currentImageIndex ? "block" : "hidden"
                    }`}
                    style={{ width: "400px", height: "300px" }}
                  >
                    <img
                      src={template.image}
                      alt={`Template ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={handleClickPrevious}
                className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Précédent
              </button>
              <button
                onClick={handleClickNext}
                className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
              >
                Suivant
              </button>
            </div>
          </div>
          <br />
          <p className="mb-4 font-bold text-xl">Description :</p>
          <div className="mt-4 ml-28">
            <div className="text-gray-700 text-lg leading-relaxed">
              <p className="mb-4">{service && service[0].description}</p>
            </div>
          </div>
        </div>
        {/* Prix de Service */}
        <div className="border p-4">
          <h2 className="text-lg font-bold mb-2">Prix de Service</h2>
          <div className="border flex justify-center">
            <div className="grid grid-cols-3 gap-4">
              {["basic", "standard", "premium"].map((plan) => (
                <div
                  key={plan}
                  className={`p-4 text-center cursor-pointer border-gray-200 ${
                    selectedPlan === plan ? "underline" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <h3 className="font-bold mb-2">
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="border mt-4 min-h-48 h-auto p-4">
            {selectedPlan === "basic" && basic && basic[0] && (
              <div className="border p-4 mb-4">
                <p className="mb-2">
                  <span className="font-bold">Prix:</span> {basic[0].prix} $
                </p>
                <p className="mb-2">
                  <span className="font-bold">Description:</span>{" "}
                  {basic[0].description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Livraison:</span> {basic[0].durer}{" "}
                  jours
                </p>
                <p className="mb-2">
                  <span className="font-bold">Révisions:</span>{" "}
                  {basic[0].revisions} révisions
                </p>
                <button
                  onClick={() => handleContinue(basic[0].id, "basics")}
                  className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Continuer
                </button>
              </div>
            )}
            {selectedPlan === "standard" && standard && standard[0] && (
              <div className="border p-4 mb-4">
                <p className="mb-2">
                  <span className="font-bold">Prix:</span> {standard[0].prix} $
                </p>
                <p className="mb-2">
                  <span className="font-bold">Description:</span>{" "}
                  {standard[0].description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Livraison:</span>{" "}
                  {standard[0].durer} jours
                </p>
                <p className="mb-2">
                  <span className="font-bold">Révisions:</span>{" "}
                  {standard[0].revisions} révisions
                </p>
                <button
                  onClick={() => handleContinue(standard[0].id, "standards")}
                  className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Continuer
                </button>
              </div>
            )}
            {selectedPlan === "premium" && premium && premium[0] && (
              <div className="border p-4 mb-4">
                <p className="mb-2">
                  <span className="font-bold">Prix:</span> {premium[0].prix} $
                </p>
                <p className="mb-2">
                  <span className="font-bold">Description:</span>{" "}
                  {premium[0].description}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Livraison:</span>{" "}
                  {premium[0].durer} jours
                </p>
                <p className="mb-2">
                  <span className="font-bold">Révisions:</span>{" "}
                  {premium[0].revisions} révisions
                </p>
                <button
                  onClick={() => handleContinue(premium[0].id, "premiums")}
                  className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-10">
        {/* Commentaires */}
        <div className="border p-4">
          <h2 className="text-lg font-bold mb-2">Commentaires</h2>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">
              {commentaires && commentaires.length} Commentaires
            </p>
          </div>
          {commentaires && commentaires.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {(showAllComments ? commentaires : commentaires.slice(0, 3)).map(
                (commentaire, index) => {
                  const user =
                    users &&
                    users.find(
                      (user) => user.id === commentaire.utilisateur_id
                    );
                  return (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        {user && user.image && (
                          <div
                            className="h-8 w-8 rounded-full mr-2"
                            style={{
                              backgroundImage: `url('${user.image}')`,
                              backgroundSize: "cover",
                            }}
                          ></div>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          {commentaire.date_commentaire} -{" "}
                          {user ? user.username : "Utilisateur inconnu"}
                        </p>
                      </div>
                      <p className="text-gray-700 text-base">
                        {commentaire.commentaire}
                      </p>
                      <div className="mt-2 text-sm text-yellow-500">
                        {renderStars(commentaire.etoil)}
                      </div>
                    </div>
                  );
                }
              )}
              {commentaires.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                >
                  {showAllComments ? "Voir moins" : "Voir tous"}
                </button>
              )}
{console.log("activecoment:", activecoment)}
{user && activecoment !== null && activecoment.length > 0 && (
  <button
    onClick={() => setShowCommentForm(true)}
    className="ml-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
  >
    Ajouter un commentaire
  </button>
)}

              {showCommentForm && (
                <div className="mt-4">
                  <select
                    name="stars"
                    value={starts}
                    onChange={(e) => setStarts(e.target.value)}
                    className="px-3 py-2 border rounded-md mr-2"
                  >
                    <option value="1">1 étoile</option>
                    <option value="2">2 étoiles</option>
                    <option value="3">3 étoiles</option>
                    <option value="4">4 étoiles</option>
                    <option value="5">5 étoiles</option>
                  </select>
                  <textarea
                    name="content"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Écrivez votre commentaire ici..."
                    className="w-full px-3 py-2 border rounded-md mt-2"
                  />
                  <button
                    onClick={handleSubmitComment}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 focus:outline-none"
                  >
                    Envoyer
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">Aucun commentaire disponible.</p>
          )}
        </div>

        {/* Certificats et Expériences */}
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
                  <p className="mt-2 text-sm text-gray-500">
                    {renderStars(experience.etoiles)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">Aucune expérience disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
