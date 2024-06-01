import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Navbar from "../navigation/Navbar";
import axios from "axios";
import Navbarlinks from "../navigation/Navlinks";

const Chat_request = () => {
  useRequireAuth();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [responseText, setResponseText] = useState("");

  const fetchUsers = () => {
    axios
      .get("http://127.0.0.1:8000/api/utilisateurs")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchDemande(); // Correction du nom de la fonction
    fetchMessages(); // Correction du nom de la fonction
    fetchUsers();
    const interval = setInterval(fetchMessages, 5000); // Rafraîchissement toutes les 5 secondes
    return () => clearInterval(interval);
  }, [id]);

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  const fetchDemande = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/demandes/${id}`
      );
      setDemande(response.data);
    } catch (error) {
      console.error("Error fetching demande:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/chat?demande_id=${id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();

    if (!responseText.trim()) {
      console.error("Response text is empty");
      return;
    }

    const newResponse = {
      demande_id: id,
      utilisateur_id: String(user.id), // Convertir l'ID en chaîne
      message: responseText,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chat",
        newResponse
      );
      setMessages([...messages, response.data]);
      setResponseText("");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      {" "}
      <Navbar />
      <Navbarlinks/>
      <div className="flex justify-center items-center flex-col">
        <div className="w-full max-w-screen-md border p-5 mt-5">
          {demande && (
            <div>
              <p className="text-lg font-bold text-center">
                Référence: {demande.id}
              </p>
              <p className="text-sm text-center">
                Description: {demande.description}
              </p>
            </div>
          )}
          <div>
            {messages.map((message) => {
              const messageUser = getUserById(message.utilisateur_id);
              const isCurrentUser = message.utilisateur_id === user.id;
              return (
                <div
                  key={message.id}
                  className={`m-2 p-4 border rounded-md ${
                    isCurrentUser ? "text-left" : "text-right"
                  }`}
                >
                  {!isCurrentUser && messageUser && (
                    <div className="flex items-center mb-2">
                      <div
                        className="w-8 h-8 bg-cover bg-center rounded-full mr-2"
                        style={{
                          backgroundImage: `url('${messageUser.image}')`,
                        }}
                      ></div>
                      <p>
                        <strong>{messageUser.lastname}</strong>{" "}
                        {messageUser.username}
                      </p>
                    </div>
                  )}
                  {isCurrentUser && messageUser && (
                    <div className="flex items-center mb-2">
                      <div
                        className="w-8 h-8 bg-cover bg-center rounded-full mr-2"
                        style={{
                          backgroundImage: `url('${messageUser.image}')`,
                        }}
                      ></div>
                      <p>
                        <strong>{messageUser.lastname}</strong>{" "}
                        {messageUser.username}
                      </p>
                    </div>
                  )}
                  <p className="p-2 border rounded-md">{message.message}</p>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleResponseSubmit} className="w-full mt-4">
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full h-24 p-2 border rounded-md"
              placeholder="Votre réponse..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
            >
              Répondre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat_request;
