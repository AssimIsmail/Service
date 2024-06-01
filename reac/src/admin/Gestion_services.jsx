import React, { useEffect, useState } from "react";
import AdminNav from "../navigation/AdminNav";
import axios from "axios";
import { Link } from "react-router-dom";
import useRequireAuthAdmin from "../hooks/useRequireAuthAdmin";

const Gestion_services = () => {
  useRequireAuthAdmin();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      // Ensure the image URLs are correct
      const categoriesWithFullImageUrls = response.data.map(category => ({
        ...category,
        image: category.image && !category.image.startsWith('http')
          ? `http://127.0.0.1:8000${category.image}`
          : category.image,
      }));
      setCategories(categoriesWithFullImageUrls);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      alert("Category deleted successfully");
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto mt-10 w-3/4">
        <div className="flex justify-end items-center mb-4">
          <Link
            to={"/Create_categorie"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td
                          className="h-16 w-16 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${category.image}')`,
                          }}
                        ></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.name}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                          {category.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link
                            to={`/Update_categorie/${category.id}`}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                          >
                            Modifier
                          </Link>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gestion_services;
