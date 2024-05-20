import React, { useContext, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";
import Allcategorie from "./Allcategorie";
import Apropos from "./Apropos";

const Acceuil = () => {
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
    aproposRef.current.scrollIntoView({ behavior: "smooth" }); // Fait défiler la page vers "A propos"
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
      window.location.href = `/service/${slugify(selectedCategory.name)}`;
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
      <Navbar />
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
                to={`/service/${slugify(category.name)}`}
                className="text-black hover:underline"
              >
                {category.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
      <Allcategorie/>
      <div id="about-section" className="bg-white min-h-screen flex flex-col items-center justify-center text-black">
      <Apropos ref={aproposRef}/>
      </div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
  <aside>
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Social</h6> 
    <div className="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </nav>
  <div className="text-center mt-5">© 2024 ACME Industries Ltd. All rights reserved.</div>
</footer>

    </div>
  );
};

export default Acceuil;
