import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState([]);

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

  useEffect(() => {
    const endIndex = Math.min(startIndex + 4, categories.length);
    setVisibleCategories(categories.slice(startIndex, endIndex));
  }, [categories, startIndex]);

  const handleNext = () => {
    if (startIndex + 4 < categories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0} // Disable the button if we are at the beginning of the list
          className={`bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-full border border-black focus:outline-none focus:ring focus:ring-gray-400 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ fontSize: "1.5rem" }}
        >
          &lt;
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          {visibleCategories.map((category) => (
            <Link
              to={`/Profile_category/${slugify(category.name)}`}
              key={category.id}
              className="border border-gray-300 rounded overflow-hidden"
            >
              <div
                className="bg-cover bg-center h-40"
                style={{
                  backgroundImage: `url(${category.image ? category.image : "default-image-path.jpg"})`,
                }}
              ></div>
              <div className="p-4">
                <h4 className="font-bold text-lg">{category.name}</h4>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={startIndex + 4 >= categories.length} // Disable the button if we are at the end of the list
          className={`bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-full border border-black focus:outline-none focus:ring focus:ring-gray-400 ${startIndex + 4 >= categories.length ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ fontSize: "1.5rem" }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Category;
