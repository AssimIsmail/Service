import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context";

const ServicePricing = ({ basic, standard, premium, selectedPlan, handlePlanSelect, handleContinue }) => {
  const { user } = useContext(UserContext);
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/services?utilisateur_id=${user.id}`);
        setServiceDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch service details:', error);
      }
    };

    fetchServiceDetails();
  }, []);


  return (
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
              <span className="font-bold">Description:</span> {basic[0].description}
            </p>
            <p className="mb-2">
              <span className="font-bold">Livraison:</span> {basic[0].durer} jours
            </p>
            <p className="mb-2">
              <span className="font-bold">Révisions:</span> {basic[0].revisions} révisions
            </p>
            {basic[0].service_id !== serviceDetails.id && (
              <button
                onClick={() => handleContinue(basic[0].id, "basics")}
                className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Continuer
              </button>
            )}
          </div>
        )}
        {selectedPlan === "standard" && standard && standard[0] && (
          <div className="border p-4 mb-4">
            <p className="mb-2">
              <span className="font-bold">Prix:</span> {standard[0].prix} $
            </p>
            <p className="mb-2">
              <span className="font-bold">Description:</span> {standard[0].description}
            </p>
            <p className="mb-2">
              <span className="font-bold">Livraison:</span> {standard[0].durer} jours
            </p>
            <p className="mb-2">
              <span className="font-bold">Révisions:</span> {standard[0].revisions} révisions
            </p>
            {standard[0].service_id !== serviceDetails.id && (
              <button
                onClick={() => handleContinue(standard[0].id, "standards")}
                className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Continuer
              </button>
              )}
          </div>
        )}
        {selectedPlan === "premium" && premium && premium[0] && (
          <div className="border p-4 mb-4">
            <p className="mb-2">
              <span className="font-bold">Prix:</span> {premium[0].prix} $
            </p>
            <p className="mb-2">
              <span className="font-bold">Description:</span> {premium[0].description}
            </p>
            <p className="mb-2">
              <span className="font-bold">Livraison:</span> {premium[0].durer} jours
            </p>
            <p className="mb-2">
              <span className="font-bold">Révisions:</span> {premium[0].revisions} révisions
            </p>
            {premium[0].service_id !== serviceDetails.id && (
              <button
                onClick={() => handleContinue(premium[0].id, "premiums")}
                className="bg-white ml-24 w-96 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Continuer
              </button>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePricing;

