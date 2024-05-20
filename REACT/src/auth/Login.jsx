  import React, { useState, useContext } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { UserContext } from "../context";
  import axios from "axios";
  import Navbar from "../undefind/Navbar";
  import { ClipLoader } from "react-spinners"; // Import the spinner

  const Login = () => {
    const navigate = useNavigate();
    const { loginUser, setToken } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleLogin = async () => {
      setLoading(true); // Start loading
      console.log("handleLogin called");
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email,
          password
        });
        console.log("API response:", response.data);

        const { token } = response.data;
        console.log("Token:", token);

        if (token) {
          setToken(token);
          try {
            const userResponse = await axios.get("http://127.0.0.1:8000/api/user", {
              headers: { Authorization: `Bearer ${token}` }
            });
            const user = userResponse.data;
            console.log("User:", user);
            loginUser(user); // Update the user state
            console.log("User and token set in context");
            navigate("/acceuil");
            console.log("Navigation to /acceuil");
          } catch (userError) {
            console.error("User fetch error:", userError);
            setError("Failed to fetch user information");
          }
        } else {
          setError("Token is missing in the response");
        }
      } catch (error) {
        console.error("Login error:", error);

        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("Erreur de connexion au serveur.");
        } else {
          setError("Une erreur s'est produite.");
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    return (
      <div>
        <Navbar />
        <div className="max-w-md mx-auto bg-white p-8 m-20 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6">Connexion</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex flex-col items-center space-y-4">
            <label htmlFor="email" className="mb-1">
              Adresse email :
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            />
            <label htmlFor="password" className="mb-1">
              Mot de passe :
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleLogin}
              className="bg-black text-white font-bold py-2 px-6 rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={loading} // Disable button while loading
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : "Se connecter"}
            </button>
            <p>
              Vous n'avez pas de compte ?{" "}
              <Link to="/inscription" className="text-blue-600 hover:underline">
                Inscrivez-vous ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
