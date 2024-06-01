import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Category from "../components/Category";
import Navbar from "../navigation/Navbar";


const Home = () => {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const aproposRef = useRef(null); //
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleClickApropos = () => {
    aproposRef.current.scrollIntoView({ behavior: "smooth" }); 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearchSubmit(e.target.value);
  };

  const handleSearchSubmit = (query) => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSelectOption = (categoryName) => {
    setSearchQuery(categoryName);
    setShowOptions(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (category) => slugify(category.name) === slugify(searchQuery)
    );
    if (selectedCategory) {
      window.location.href = `/Profile_category/${slugify(selectedCategory.name)}`;
    }
  };

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
        <Navbar/>
      <div className="bg-white min-h-screen flex flex-col items-center justify-center text-black">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur notre plateforme de services en ligne
        </h1>
        <p className="text-lg mb-8">
          Trouvez les services dont vous avez besoin rapidement et facilement.
        </p>
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher un service"
              className="border border-gray-700 rounded px-4 py-2 w-96 focus:outline-none focus:border-gray-900 bg-gray-100"
              onFocus={() => setShowOptions(true)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-gray-700 text-white px-4 py-2 rounded-r focus:outline-none hover:bg-gray-900"
            >
              Rechercher
            </button>
          </div>
          {showOptions && (
            <div
              className="absolute top-10 left-0 w-96 border border-gray-300 bg-white rounded shadow-lg"
              ref={optionsRef}
            >
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSelectOption(category.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </form>
        <div className="mb-8">
          <h5 className="text-1xl font-bold mb-2">Services Populaires :</h5>
          {filteredCategories.slice(0, 3).map((category) => (
            <span
              key={category.id}
              className="mr-4 border border-black rounded-full px-2 py-1"
            >
              <Link
                to={`/Profile_category/${slugify(category.name)}`}
                className="text-black hover:underline"
              >
                {category.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
      <Category/>
      {/* <div id="about-section" className="bg-white min-h-screen flex flex-col items-center justify-center text-black">
      <Apropos ref={aproposRef}/>
      </div> */}
   

    </div>
  );
};

export default Home;
