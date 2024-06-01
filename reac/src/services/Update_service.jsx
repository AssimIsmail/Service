import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import ServiceLevel from "../components/ServiceLevel";
import Navbarlinks from "../navigation/Navlinks";
import Navbar from "../navigation/Navbar";
import ImageFields from "../components/ImageFields";

const Update_service = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const { id } = useParams();
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
  const [imageFields, setImageFields] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [serviceImage, setServiceImage] = useState(null);
  const [serviceIm, setServiceIm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [existingTemplateImages, setExistingTemplateImages] = useState([]);
  const navigate = useNavigate();

  // Effect to fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [user]);

  // Effect to fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        // Fetch service details, basics, standards, premiums, and templates
        const responseservice = await axios.get(
          `http://127.0.0.1:8000/api/services/${id}`
        );
        const responsebasic = await axios.get(
          `http://127.0.0.1:8000/api/basics?service_id=${id}`
        );
        const responsestandard = await axios.get(
          `http://127.0.0.1:8000/api/standards?service_id=${id}`
        );
        const responsepremium = await axios.get(
          `http://127.0.0.1:8000/api/premiums?service_id=${id}`
        );
        const responsetemplates = await axios.get(
          `http://127.0.0.1:8000/api/templates?service_id=${id}`
        );
        const service = responseservice.data;
        const basic = responsebasic.data[0];
        const standard = responsestandard.data[0];
        const premium = responsepremium.data[0];
        const templates = responsetemplates.data;

        // Set state with fetched data
        setSelectedCategory(service.categorie_id);
        setDescription(service.description);
        setBasicPrice(basic.prix);
        setBasicDuration(basic.durer);
        setBasicRevisions(basic.revisions);
        setBasicDescription(basic.description);
        setStandardPrice(standard.prix);
        setStandardDuration(standard.durer);
        setStandardRevisions(standard.revisions);
        setStandardDescription(standard.description);
        setPremiumPrice(premium.prix);
        setPremiumDuration(premium.durer);
        setPremiumRevisions(premium.revisions);
        setPremiumDescription(premium.description);
        setAveragePrice(service.prixmoyen);
        setServiceImage(service.image);
        setExistingTemplateImages(templates);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  // Function to add an image field
  const addImageField = () => {
    setImageFields([...imageFields, { id: Date.now(), files: [] }]);
  };

  // Function to remove an image field
  const removeImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };

  // Function to handle image change in a specific image field
  const handleImageChange = (index, event) => {
    const newImageFields = [...imageFields];
    newImageFields[index].files = Array.from(event.target.files);
    setImageFields(newImageFields);
  };

  // Function to handle service image change
  const handleServiceImageChange = (event) => {
    setServiceIm(event.target.files[0]);
  };

  // Function to handle removal of a template image
  const handleRemoveTemplateImage = async (templateId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/templates/${templateId}`);
      setExistingTemplateImages(
        existingTemplateImages.filter((template) => template.id !== templateId)
      );
      console.log("Template image removed successfully.");
    } catch (error) {
      console.error("Error removing template image:", error.response.data);
    }
  };

  // Function to calculate the average price
  const calculateAveragePrice = () => {
    const totalPrices =
      parseFloat(basicPrice) +
      parseFloat(standardPrice) +
      parseFloat(premiumPrice);
    const totalCounts = 3;
    const average = totalPrices / totalCounts;
    setAveragePrice(average);
  };

  // Effect to recalculate average price when prices change
  useEffect(() => {
    calculateAveragePrice();
  }, [basicPrice, standardPrice, premiumPrice]);

  // Function to reset form fields
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
    setServiceImage(null);
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  // Function to handle service update
  const handleUpdateService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!categories) {
      console.error("Liste des catégories non définie.");
      setIsLoading(false);
      return;
    }

    if (!description || !basicPrice || !standardPrice || !premiumPrice) {
      console.error("Veuillez remplir tous les champs requis.");
      setIsLoading(false);
      return;
    }
    console.log("selectedCategory:", selectedCategory);
    console.log("categories:", categories);
    const selectedCategoryObject = categories.find(
      (categorie) => parseInt(categorie.id) === parseInt(selectedCategory)
    );
    console.log("selectedCategoryObject:", selectedCategoryObject);

    const newservice = {
      utilisateur_id: user.id,
      categorie_id: selectedCategory,
      categorie: selectedCategoryObject.name,
      description: description,
      prixmoyen: averagePrice,
    };
    if (serviceIm !== null && serviceIm !== undefined && serviceIm !== '') {
      try {
          await axios.delete(`http://127.0.0.1:8000/api/services/${id}/image`);
          console.log("Existing service image removed successfully.");
      } catch (error) {
          console.error(
              "Error removing existing service image:",
              error.response.data
          );
      }
  } else {
      console.log("No service image to remove.");
  }
  
    
    const imageData = new FormData();
    imageData.append("image", serviceIm); // 'serviceImage' est la nouvelle image à ajouter

    try {
      // Envoyer une requête POST pour ajouter l'image au service
      const response = await axios.post(
        `http://127.0.0.1:8000/api/services/${id}/image`,
        imageData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Assurez-vous de définir le type de contenu comme 'multipart/form-data'
        }
      );
      console.log("Image added to service successfully:", response.data);
    } catch (error) {
      console.error("Error adding image to service:", error.response.data);
    }
    console.log(newservice);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/services/${id}`,
        newservice
      );
      console.log("Service updated successfully:", response.data);
      const newbasic = {
        service_id: id,
        prix: parseFloat(basicPrice),
        description: basicDescription,
        durer: basicDuration,
        revisions: basicRevisions,
      };

      try {
        await axios.put(`http://127.0.0.1:8000/api/basics/${id}`, newbasic);
        console.log("Success updating basic service");
      } catch (error) {
        console.error("Error updating basic service:", error.response.data);
      }

      const newstandard = {
        service_id: id,
        prix: parseFloat(standardPrice),
        description: standardDescription,
        durer: standardDuration,
        revisions: standardRevisions,
      };

      try {
        await axios.put(
          `http://127.0.0.1:8000/api/standards/${id}`,
          newstandard
        );
        console.log("Success updating standard service");
      } catch (error) {
        console.error("Error updating standard service:", error.response.data);
      }

      const newpremium = {
        service_id: id,
        prix: parseFloat(premiumPrice),
        description: premiumDescription,
        durer: premiumDuration,
        revisions: premiumRevisions,
      };

      try {
        await axios.put(`http://127.0.0.1:8000/api/premiums/${id}`, newpremium);
        console.log("Success updating premium service");
      } catch (error) {
        console.error("Error updating premium service:", error.response.data);
      }

      const imageFormData = new FormData();
      imageFields.forEach((field) => {
        field.files.forEach((file) => {
          imageFormData.append("images[]", file);
        });
      });

      // Ajout des champs utilisateur_id et service_id
      imageFormData.append("utilisateur_id", user.id);
      imageFormData.append("service_id", id);

      try {
        // Store existing templates images temporarily
        const existingTemplateImagesData = [...existingTemplateImages];
      
        // Store existing templates in localStorage before deleting them
        localStorage.setItem("existingTemplates", JSON.stringify(existingTemplateImages));
      
        // Remove existing templates
        if (existingTemplateImages.length > 0) {
          for (const template of existingTemplateImages) {
            await axios.delete(
              `http://127.0.0.1:8000/api/templates/${template.id}`
            );
          }
          console.log("Existing templates removed successfully.");
        }
      
        // Create FormData for new templates
        const imageFormData = new FormData();
        imageFields.forEach((field) => {
          field.files.forEach((file) => {
            imageFormData.append("images[]", file);
          });
        });
      
        // Add existing templates images from localStorage to FormData
        const storedTemplates = JSON.parse(localStorage.getItem("existingTemplates"));
        if (storedTemplates) {
          storedTemplates.forEach((template) => {
            imageFormData.append("images[]", template.file);
          });
        }
      
        // Add utilisateur_id and service_id fields to FormData
        imageFormData.append("utilisateur_id", user.id);
        imageFormData.append("service_id", id);
      
        // Send POST request to add templates
        const request = axios.post(
          "http://127.0.0.1:8000/api/templates",
          imageFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        await request;
        console.log("Templates added successfully.");
      
        // Rest of your code...
      } catch (error) {
        console.error("Error updating service:", error.response.data);
      } finally {
        setIsLoading(false);
      }
      

      console.log("Success updating template images");
      resetForm();
      navigate(`/service_list`);
    } catch (error) {
      console.error("Error updating service:", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar links={Navbarlinks} />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Update Service</h2>
        <Link
              to={"/service_list"}
              className="flex items-center bg-green-500 text-white px-2 py-1 w-36 rounded hover:bg-green-600 text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M13.293 4.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414zM7 7a1 1 0 100 2h6a1 1 0 100-2H7zm4 5a1 1 0 100 2H7a1 1 0 100-2h4z"
                  clipRule="evenodd"
                />
              </svg>
              liste service
            </Link>
        <form onSubmit={handleUpdateService} className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category:
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="mt-1 p-2 border rounded w-full text-black"
                  >
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="serviceImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Image:
                </label>
                <input
                  type="file"
                  id="serviceImage"
                  accept="image/*"
                  onChange={handleServiceImageChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Template Images:
                </label>
                <ImageFields
                  imageFields={imageFields}
                  addImageField={addImageField}
                  removeImageField={removeImageField}
                  handleImageChange={handleImageChange}
                />
                {existingTemplateImages.map((template, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <img
                      src={template.url}
                      alt={`Template ${index}`}
                      className="w-32 h-32 object-cover mr-2"
                    />
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveTemplateImage(template.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Niveaux de service</h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <ServiceLevel
                  level="Basic"
                  price={basicPrice}
                  setPrice={setBasicPrice}
                  duration={basicDuration}
                  setDuration={setBasicDuration}
                  revisions={basicRevisions}
                  setRevisions={setBasicRevisions}
                  description={basicDescription}
                  setDescription={setBasicDescription}
                />
              </div>
              <div className="flex-1 mb-4 md:mb-0">
                <ServiceLevel
                  level="Standard"
                  price={standardPrice}
                  setPrice={setStandardPrice}
                  duration={standardDuration}
                  setDuration={setStandardDuration}
                  revisions={standardRevisions}
                  setRevisions={setStandardRevisions}
                  description={standardDescription}
                  setDescription={setStandardDescription}
                />
              </div>
              <div className="flex-1 mb-4 md:mb-0">
                <ServiceLevel
                  level="Premium"
                  price={premiumPrice}
                  setPrice={setPremiumPrice}
                  duration={premiumDuration}
                  setDuration={setPremiumDuration}
                  revisions={premiumRevisions}
                  setRevisions={setPremiumRevisions}
                  description={premiumDescription}
                  setDescription={setPremiumDescription}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="averagePrice"
              className="block text-sm font-medium text-gray-700"
            >
              Average Price:
            </label>
            <input
              type="text"
              id="averagePrice"
              value={averagePrice}
              readOnly
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update_service;
