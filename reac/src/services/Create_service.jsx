import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import ServiceLevel from "../components/ServiceLevel";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";
import ImageFields from "../components/ImageFields";

const Create_service = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    "Frontend Development"
  );
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
  const [imageFields, setImageFields] = useState([
    { id: Date.now(), files: [] },
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [serviceImage, setServiceImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addImageField = () => {
    setImageFields([...imageFields, { id: Date.now(), files: [] }]);
  };

  const removeImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, event) => {
    const newImageFields = [...imageFields];
    newImageFields[index].files = Array.from(event.target.files);
    setImageFields(newImageFields);
  };

  const handleServiceImageChange = (event) => {
    setServiceImage(event.target.files[0]);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
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

  const resetForm = () => {
    setSelectedCategory("");
    setDescription("");
    setBasicPrice("");
    setBasicDuration("");
    setBasicRevisions("");
    setBasicDescription("");
    setStandardPrice("");
    setStandardDuration("");
    setStandardRevisions("");
    setStandardDescription("");
    setPremiumPrice("");
    setPremiumDuration("");
    setPremiumRevisions("");
    setPremiumDescription("");
    setImageFields([{ id: Date.now(), files: [] }]);
    setSelectedTemplate(null);
    setServiceImage(null); // Reset service image
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!categories) {
      console.error("Liste des catégories non définie.");
      return;
    }

    if (!description || !basicPrice || !standardPrice || !premiumPrice) {
      console.error("Please fill all required fields.");
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

    const formData = new FormData();
    for (const key in newservice) {
      formData.append(key, newservice[key]);
    }

    if (serviceImage) {
      formData.append("image", serviceImage);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success creating service:", response.data);

      const serviceId = response.data.service.id; // Assurez-vous que le chemin d'accès est correct selon la structure de votre réponse
      console.log("Data being sent:", newservice);
      const newbasic = {
        service_id: serviceId,
        prix: parseFloat(basicPrice), // Assurez-vous que le prix est un nombre
        description: basicDescription,
        durer: basicDuration,
        revisions: basicRevisions,
      };

      try {
        await axios.post("http://127.0.0.1:8000/api/basics", newbasic);
        console.log("Success creating basic service");
      } catch (error) {
        console.error("Error creating basic service:", error.response.data);
      }

      const newstandard = {
        service_id: serviceId,
        prix: parseFloat(standardPrice), // Assurez-vous que le prix est un nombre
        description: standardDescription,
        durer: standardDuration,
        revisions: standardRevisions,
      };

      try {
        await axios.post("http://127.0.0.1:8000/api/standards", newstandard);
        console.log("Success creating standard service");
      } catch (error) {
        console.error("Error creating standard service:", error.response.data);
      }

      const newpremium = {
        service_id: serviceId,
        prix: parseFloat(premiumPrice), // Assurez-vous que le prix est un nombre
        description: premiumDescription,
        durer: premiumDuration,
        revisions: premiumRevisions,
      };

      try {
        await axios.post("http://127.0.0.1:8000/api/premiums", newpremium);
        console.log("Success creating premium service");
      } catch (error) {
        console.error("Error creating premium service:", error.response.data);
      }

      const imageFormData = new FormData();
      imageFormData.append("utilisateur_id", user.id);
      imageFormData.append("service_id", serviceId);

      imageFields.forEach((field) => {
        field.files.forEach((file) => {
          imageFormData.append("images[]", file);
        });
      });

      const request = selectedTemplate
        ? axios.put(
            `http://127.0.0.1:8000/api/templates/${selectedTemplate.id}`,
            imageFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
        : axios.post("http://127.0.0.1:8000/api/templates", imageFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      console.log("Basic service data being sent:", newbasic);
      console.log("Standard service data being sent:", newstandard);
      console.log("Premium service data being sent:", newpremium);
      await request;
      console.log("Template saved successfully");

      resetForm(); // Réinitialisez le formulaire ici
      navigate("/service_list"); 
    } catch (error) {
      console.error(
        "Error creating service:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar/>
      <Navbarlinks />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Ajouter un service</h1>
        <form onSubmit={handleCreateService}>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="mt-4 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter le service
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Réinitialiser
            </button>
          </div>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Templates
                </label>
                <ImageFields
                  imageFields={imageFields}
                  handleImageChange={handleImageChange}
                  addImageField={addImageField}
                  removeImageField={removeImageField}
                  selectedTemplate={selectedTemplate}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Image du service
                </label>
                <input
                  type="file"
                  onChange={handleServiceImageChange}
                  className="mt-1 p-2 border rounded w-full  text-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Description et sélection de la catégorie */}
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 p-2 border rounded w-full  text-black"
              >
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre service ici..."
                className="mt-1 p-2 border rounded w-full text-black"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Niveaux de service (Basic, Standard, Premium) */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Niveaux de service</h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <ServiceLevel
                  title="Basic"
                  price={basicPrice}
                  setPrice={setBasicPrice}
                  duration={basicDuration}
                  setDuration={setBasicDuration}
                  revisions={basicRevisions}
                  setRevisions={setBasicRevisions}
                  description={basicDescription}
                  setDescription={setBasicDescription}
                  placeholder="Description du service Basic"
                />
              </div>
              <div className="flex-1 mb-4 md:mb-0">
                <ServiceLevel
                  title="Standard"
                  price={standardPrice}
                  setPrice={setStandardPrice}
                  duration={standardDuration}
                  setDuration={setStandardDuration}
                  revisions={standardRevisions}
                  setRevisions={setStandardRevisions}
                  description={standardDescription}
                  setDescription={setStandardDescription}
                  placeholder="Description du service Standard"
                />
              </div>
              <div className="flex-1">
                <ServiceLevel
                  title="Premium"
                  price={premiumPrice}
                  setPrice={setPremiumPrice}
                  duration={premiumDuration}
                  setDuration={setPremiumDuration}
                  revisions={premiumRevisions}
                  setRevisions={setPremiumRevisions}
                  description={premiumDescription}
                  setDescription={setPremiumDescription}
                  placeholder="Description du service Premium"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <div className="flex items-center mb-4">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <span className="ml-2">Traitement en cours...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Create_service;
