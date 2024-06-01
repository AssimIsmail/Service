import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PersonalInfo from "../components/PersonalInfo";
import Comments from "../components/Comments";
import ServicePricing from "../components/ServicePricing";
import CertificationsAndExperiences from "../components/CertificationsAndExperiences";
import { UserContext } from "../context/UserContext";
import Navbar from "../navigation/Navbar";

const Profile = () => {
  const { utilisateur_id, service_id } = useParams();
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
  const [demandes, setDemandes] = useState(null);
  const [activecoment, setactivecoment] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(
        `http://127.0.0.1:8000/api/utilisateurs/${utilisateur_id}`
      );
      setUser(userResponse.data);

      const templatesResponse = await axios.get(
        `http://127.0.0.1:8000/api/templates`
      );
      setTemplates(templatesResponse.data);

      const serviceResponse = await axios.get(
        `http://127.0.0.1:8000/api/services/${service_id}`
      );
      setService(serviceResponse.data);

      const certificatsResponse = await axios.get(
        `http://127.0.0.1:8000/api/certificats`
      );
      setCertificats(certificatsResponse.data);

      const experiencesResponse = await axios.get(
        `http://127.0.0.1:8000/api/experiences`
      );
      setExperiences(experiencesResponse.data);

      const basicResponse = await axios.get(`http://127.0.0.1:8000/api/basics`);
      setBasic(basicResponse.data);

      const standardResponse = await axios.get(
        `http://127.0.0.1:8000/api/standards`
      );
      setStandard(standardResponse.data);

      const premiumResponse = await axios.get(
        `http://127.0.0.1:8000/api/premiums`
      );
      setPremium(premiumResponse.data);

      const commentairesResponse = await axios.get(
        `http://127.0.0.1:8000/api/commentaires`
      );
      setCommentaires(commentairesResponse.data);

      const usersResponse = await axios.get(
        `http://127.0.0.1:8000/api/utilisateurs`
      );
      setUsers(usersResponse.data);

      const demandesResponse = await axios.get(
        `http://127.0.0.1:8000/api/demandes`
      );
      setDemandes(demandesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Erreur lors de la récupération des données.");
    }
  };

  useEffect(() => {
    if (!utilisateur_id) return;
    fetchData();
  }, [utilisateur_id, service_id]);

  useEffect(() => {
    if (demandes) {
      const demandesFiltrees = demandes.filter(
        (demande) => demande.status === "Terminer"
      );
      setactivecoment(demandesFiltrees);
    }
  }, [demandes]);

  const handleSubmitComment = async (newComment, starts) => {
    console.log("Service:", service);
    console.log("User:", user);

    if (!service || !user) {
      console.error("Service or user data is not available.");
      setError("Service or user data is not available.");
      return;
    }

    try {
      const newCommentData = {
        service_id: service.id,
        utilisateur_id: user.id,
        etoil: starts,
        commentaire: newComment,
      };
      await axios.post(
        `http://127.0.0.1:8000/api/commentaires`,
        newCommentData
      );
      fetchData();
      setNewComment("");
      setStarts(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Erreur lors de l'envoi du commentaire.");
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = (planId, planType) => {
    navigate(`/request/${planType}/${planId}/${utilisateur_id}`);
  };

  const handleClickPrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + templates.length) % templates.length
    );
  };

  const handleClickNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % templates.length);
  };

  return (
    <div className="flex flex-col mx-auto p-4">
        <Navbar/>
      <div className="container mx-auto p-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex">
          <div className="flex-1 mr-4">
            <PersonalInfo
              userr={userr}
              templates={templates}
              currentImageIndex={currentImageIndex}
              handleClickPrevious={handleClickPrevious}
              handleClickNext={handleClickNext}
              service={service}
              className="mb-4"
            />
           <Comments
  commentaires={commentaires}
  users={users}
  user={user}
  utilisateur_id={utilisateur_id}
  service_id={service_id} 
  activecoment={activecoment}
  handleSubmitComment={handleSubmitComment}
  className="mb-4"
  fetchData={fetchData}
/>
          </div>
          <div className="flex-1 ml-4">
            <ServicePricing
            utilisateur_id={utilisateur_id}
            service_id={service_id} 
              basic={basic}
              standard={standard}
              premium={premium}
              selectedPlan={selectedPlan}
              handlePlanSelect={handlePlanSelect}
              handleContinue={handleContinue}
              className="mb-4"
            />
            <CertificationsAndExperiences
              certificats={certificats}
              experiences={experiences}
              users={users}
              className="mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
