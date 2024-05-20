import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbaruser from "../Utilisateur/Navbaruser";
import axios from "axios";
import useRequireAuth from "../auth/UseRequireAuth";
import { UserContext } from "../context";

const DetailService = () => {
  const { idservice } = useParams();
  const navigate = useNavigate();
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [basicPrice, setBasicPrice] = useState(0);
  const [basicDuration, setBasicDuration] = useState(0);
  const [basicRevisions, setBasicRevisions] = useState(0);
  const [basicDescription, setBasicDescription] = useState("");
  const [standardPrice, setStandardPrice] = useState(0);
  const [standardDuration, setStandardDuration] = useState(0);
  const [standardRevisions, setStandardRevisions] = useState(0);
  const [standardDescription, setStandardDescription] = useState("");
  const [premiumPrice, setPremiumPrice] = useState(0);
  const [premiumDuration, setPremiumDuration] = useState(0);
  const [premiumRevisions, setPremiumRevisions] = useState(0);
  const [premiumDescription, setPremiumDescription] = useState("");
  const [averagePrice, setAveragePrice] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/services/${idservice}`);
      setSelectedCategory(response.data.categorie);
      setDescription(response.data.description);
      setAveragePrice(response.data.prixmoyen);
    } catch (error) {
      console.error("Error fetching service", error);
    }
  };

  const fetchBasicDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/basics?service_id=${idservice}`);
      if (response.data.length > 0) {
        setBasicPrice(response.data[0].prix);
        setBasicDescription(response.data[0].description);
        setBasicDuration(response.data[0].durer);
        setBasicRevisions(response.data[0].revisions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStandardDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/standards?service_id=${idservice}`);
      if (response.data.length > 0) {
        setStandardPrice(response.data[0].prix);
        setStandardDescription(response.data[0].description);
        setStandardDuration(response.data[0].durer);
        setStandardRevisions(response.data[0].revisions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPremiumDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/premiums?service_id=${idservice}`);
      if (response.data.length > 0) {
        setPremiumPrice(response.data[0].prix);
        setPremiumDescription(response.data[0].description);
        setPremiumDuration(response.data[0].durer);
        setPremiumRevisions(response.data[0].revisions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateAveragePrice = () => {
    const totalPrices = basicPrice + standardPrice + premiumPrice;
    const totalCounts = 3;
    const average = totalPrices / totalCounts;
    setAveragePrice(average);
  };

  useEffect(() => {
    fetchCategories();
    fetchServiceDetails();
    fetchBasicDetails();
    fetchStandardDetails();
    fetchPremiumDetails();
  }, [user]);

  useEffect(() => {
    calculateAveragePrice();
  }, [basicPrice, standardPrice, premiumPrice]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("Catégorie sélectionnée:", e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
    <Navbaruser />
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-xl font-semibold">
            Detail Service {idservice}
          </span>
        </div>
        <div className="flex items-center">
          <Link
            to="/Utilisateur/Listeservice"
            className="text-gray-500 hover:underline mr-4"
          >
            Retournez à la liste des services
          </Link>
        </div>
      </div>
      <div className=" w-full mb-4">
        <div className="flex border rounded-lg shadow-lg p-4">
          <div className="w-96">
            <select
              name="category"
              id="categorySelect"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full mb-2 p-2 border rounded"
              readOnly
            >
              {categories &&
                categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.name}>
                    {categorie.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full ml-2">
            <textarea
              name=""
              id=""
              value={description}
              placeholder="Description du service"
              onChange={(e) => setDescription(e.target.value)}
              className="h-36 w-full mb-2 p-2 border rounded"
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Service */}
        <div className="p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Basics</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prix
            </label>
            <input
              type="number"
              value={basicPrice}
              onChange={(e) => setBasicPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Durée par jour
            </label>
            <input
              type="number"
              value={basicDuration}
              onChange={(e) => setBasicDuration(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de révisions
            </label>
            <input
              type="number"
              value={basicRevisions}
              onChange={(e) => setBasicRevisions(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description Basic
            </label>
            <textarea
              value={basicDescription}
              onChange={(e) => setBasicDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            ></textarea>
          </div>
        </div>
        {/* Standard Service */}
        <div className="p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Standards</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prix
            </label>
            <input
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Durée par jour
            </label>
            <input
              type="number"
              value={standardDuration}
              onChange={(e) => setStandardDuration(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de révisions
            </label>
            <input
              type="number"
              value={standardRevisions}
              onChange={(e) => setStandardRevisions(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description Standard
            </label>
            <textarea
              value={standardDescription}
              onChange={(e) => setStandardDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            ></textarea>
          </div>
        </div>
        {/* Premium Service */}
        <div className="p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Premium</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prix
            </label>
            <input
              type="number"
              value={premiumPrice}
              onChange={(e) => setPremiumPrice(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Durée par jour
            </label>
            <input
              type="number"
              value={premiumDuration}
              onChange={(e) => setPremiumDuration(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de révisions
            </label>
            <input
              type="number"
              value={premiumRevisions}
              onChange={(e) => setPremiumRevisions(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description Premium
            </label>
            <textarea
              value={premiumDescription}
              onChange={(e) => setPremiumDescription(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default DetailService;
