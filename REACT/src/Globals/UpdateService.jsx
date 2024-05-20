import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbaruser from "../Utilisateur/Navbaruser";
import axios from "axios";
import useRequireAuth from "../auth/UseRequireAuth";
import { UserContext } from "../context";

const UpdateService = () => {
  const { idservice } = useParams();
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
  const [service, setService] = useState(null);
  const [SelectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();
  console.log(selectedCategory);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchservice = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/services/${idservice}`
      );
      setSelectedCategory(response.data.categorie);
      setDescription(response.data.description);
      setAveragePrice(response.data.prixmoyen);
    } catch (error) {
      console.error("Error fetching service", error);
    }
  };
  const fetchbasic = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/basics?service_id=${idservice}`
      );
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
  const fetchstandart = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/standards?service_id=${idservice}`
      );
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
  const fetchpremium = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/premiums?service_id=${idservice}`
      );
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
    const totalPrices = basicPrice * 1 + standardPrice * 1 + premiumPrice * 1;
    const totalCounts = 3;
    const average = totalPrices / totalCounts;
    setAveragePrice(average);
  };

  useEffect(() => {
    fetchCategories();
    fetchservice();
    fetchbasic();
    fetchstandart();
    fetchpremium();
  }, [user]);

  useEffect(() => {
    calculateAveragePrice();
  }, [basicPrice, standardPrice, premiumPrice]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const Handelupdateservice = async (e) => {
    e.preventDefault();
    if (!categories) {
      console.error("Liste des catégories non définie.");
      return;
    }

    const selectedCategoryObject = categories.find(
      (categorie) => categorie.name === selectedCategory
    );
    const categorieName = selectedCategoryObject
      ? selectedCategoryObject.name
      : "";
    if (!selectedCategoryObject) {
      console.error("Catégorie sélectionnée non trouvée.");
      return;
    }

    const newservice = {
      utilisateur_id: user.id,
      categorie_id: selectedCategoryObject ? selectedCategoryObject.id : null,
      categorie: categorieName,
      description: description,
      prixmoyen: averagePrice,
    };

    try {
      const responseService = await axios.put(
        `http://127.0.0.1:8000/api/services/${idservice}`,
        newservice
      );
      console.log("Success:", responseService.data);

      const newbasic = {
        service_id: idservice,
        prix: basicPrice,
        description: basicDescription,
        durer: basicDuration,
        revisions: basicRevisions,
      };
      const newstandard = {
        service_id: idservice,
        prix: standardPrice,
        description: standardDescription,
        durer: standardDuration,
        revisions: standardRevisions,
      };
      const newpremuim = {
        service_id: idservice,
        prix: premiumPrice,
        description: premiumDescription,
        durer: premiumDuration,
        revisions: premiumRevisions,
      };
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/basics/${idservice}`,
          newbasic
        );
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }

      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/premiums/${idservice}`,
          newpremuim
        );
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/standards/${idservice}`,
          newstandard
        );
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
      navigate("/Utilisateur/Listeservice");
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbaruser />
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xl font-semibold">
              Modifier Service {idservice}
            </span>
          </div>
          <div className="flex items-center">
            <Link
              to="/Utilisateur/Listeservice"
              className="text-gray-500 hover:underline mr-4"
            >
              Retournez à la liste des services
            </Link>
            <button
              onClick={Handelupdateservice}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow"
            >
              Modifier service
            </button>
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
            ></textarea></div>
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

export default UpdateService;
