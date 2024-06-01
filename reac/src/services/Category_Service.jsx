import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const Category_Service = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      // Ensure the image URLs are correct
      const categoriesWithFullImageUrls = response.data.map(category => ({
        ...category,
        image: category.image && !category.image.startsWith('http')
          ? `http://127.0.0.1:8000${category.image}`
          : category.image,
      }));
      setCategories(categoriesWithFullImageUrls);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')         
      .replace(/[^\w-]+/g, '')     
      .replace(/--+/g, '-')        
      .replace(/^-+/, '')         
      .replace(/-+$/, '');        
  }

  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
        {categories.map((category) => (
          <Link
            to={`/Profile_category/${slugify(category.name)}`}
            key={category.id}
            className="border border-gray-300 rounded overflow-hidden"
          >
            <div
              className="bg-cover bg-center h-40"
              style={{ backgroundImage: `url(${category.image ? category.image : 'default-image-path.jpg'})` }}
            ></div>
            <div className="p-4">
              <h4 className="font-bold text-lg">{category.name}</h4>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category_Service;
