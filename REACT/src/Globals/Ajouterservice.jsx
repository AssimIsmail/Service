import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbaruser from "../Utilisateur/Navbaruser";
import axios from "axios";
import useRequireAuth from "../auth/UseRequireAuth";
import { UserContext } from "../context";

const Ajouterservice = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicDuration, setBasicDuration] = useState("");
  const [basicRevisions, setBasicRevisions] = useState("");
  const [basicDescription, setBasicDescription] = useState("");
  const [standardPrice, setStandardPrice] = useState("");
  const [standardDuration, setStandardDuration] = useState("");
  const [standardRevisions, setStandardRevisions] = useState("");
  const [standardDescription, setStandardDescription] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [premiumDuration, setPremiumDuration] = useState("");
  const [premiumRevisions, setPremiumRevisions] = useState("");
  const [premiumDescription, setPremiumDescription] = useState("");
  const [averagePrice, setAveragePrice] = useState(0);
  const navigate = useNavigate();
  
 
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories`);
      setCategories(response.data);
      console.log("Categories:", response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const calculateAveragePrice = () => {
    const totalPrices = basicPrice * 1 + standardPrice * 1 + premiumPrice * 1;
    const totalCounts = 3;
    const average = totalPrices / totalCounts;
    setAveragePrice(average);
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  useEffect(() => {
    calculateAveragePrice();
  }, [basicPrice, standardPrice, premiumPrice]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log("Catégorie sélectionnée:", e.target.value);
  };

  const Handelcreatservice = async (e) => {
    e.preventDefault();
    if (!categories) {
      console.error("Liste des catégories non définie.");
      return;
    }

    const selectedCategoryObject = categories.find(
      (categorie) => categorie.name === selectedCategory
    );

    if (!selectedCategoryObject) {
      console.error("Catégorie sélectionnée non trouvée.");
      return;
    }

    const newservice = {
      utilisateur_id: user.id,
      categorie_id: selectedCategoryObject.id,
      categorie: selectedCategoryObject.name,
      description: description,
      prixmoyen: averagePrice,
    };

    try {
      const responseService = await axios.post(
        "http://127.0.0.1:8000/api/services",
        newservice
      );

      console.log("Success creating service:", responseService.data);

      const serviceId = responseService.data.id;

      const newbasic = {
        service_id: serviceId,
        prix: basicPrice,
        description: basicDescription,
        durer: basicDuration,
        revisions: basicRevisions,
      };

      const newstandard = {
        service_id: serviceId,
        prix: standardPrice,
        description: standardDescription,
        durer: standardDuration,
        revisions: standardRevisions,
      };

      const newpremium = {
        service_id: serviceId,
        prix: premiumPrice,
        description: premiumDescription,
        durer: premiumDuration,
        revisions: premiumRevisions,
      };

      try {
        await axios.post("http://127.0.0.1:8000/api/basics", newbasic);
        console.log("Success creating basic service");
      } catch (error) {
        console.error("Error creating basic service:", error);
      }

      try {
        await axios.post("http://127.0.0.1:8000/api/standards", newstandard);
        console.log("Success creating standard service");
      } catch (error) {
        console.error("Error creating standard service:", error);
      }

      try {
        await axios.post("http://127.0.0.1:8000/api/premiums", newpremium);
        console.log("Success creating premium service");
      } catch (error) {
        console.error("Error creating premium service:", error);
      }

      navigate("/Utilisateur/Listeservice");
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbaruser />
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xl font-semibold">Ajouter Service</span>
          </div>
          <div className="flex items-center">
            <Link
              to="/Utilisateur/Listeservice"
              className="text-gray-500 hover:underline mr-4"
            >
              Retournez à la liste des services
            </Link>
            <button
              onClick={Handelcreatservice}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow"
            >
              Ajouter service
            </button>
          </div>
        </div>
        <div className=" w-full mb-4">template</div>
        <div className=" w-full mb-4">
          <div className="flex border rounded-lg shadow-lg p-4">
            <div className="w-96">
              <select
                name="category"
                id="categorySelect"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full mb-2 p-2 border rounded"
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
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajouterservice;
