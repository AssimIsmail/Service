import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners"; // Import the spinner

const Comments = ({ commentaires, users, user, handleSubmitComment, fetchData }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [stars, setStars] = useState(0); // Correction: 'starts' should be 'stars' if it represents star ratings
  const [loading, setLoading] = useState(false); // Add loading state
  const [hasCommented, setHasCommented] = useState(false); // Track if user has commented

  useEffect(() => {
    console.log("User:", user);
    console.log("Has Commented:", hasCommented);
    console.log("Commentaires:", commentaires);
  }, [user, hasCommented, commentaires]);

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      );
    }
    return stars;
  };

  const handleCommentSubmit = async () => {
    setLoading(true); // Set loading to true
    await handleSubmitComment(newComment, stars); // Correction: 'starts' should be 'stars' if it represents star ratings
    await fetchData(); // Wait for fetchData to complete
    setLoading(false); // Set loading to false
    setShowCommentForm(false); // Hide the comment form
    setHasCommented(true); // Mark as commented
  };

  return (
    <div className="border p-4">
      <h2 className="text-lg font-bold mb-2">Commentaires</h2>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">
          {commentaires && commentaires.length} Commentaires
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#0000ff" />
        </div>
      ) : (
        <>
          {commentaires && commentaires.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {(showAllComments ? commentaires : commentaires.slice(0, 3)).map(
                (commentaire, index) => {
                  const userFound =
                    users &&
                    users.find((user) => user.id === commentaire.utilisateur_id);
                  return (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        {userFound && userFound.image && (
                          <div
                            className="h-8 w-8 rounded-full mr-2"
                            style={{
                              backgroundImage: `url('${userFound.image}')`,
                              backgroundSize: "cover",
                            }}
                          ></div>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          {commentaire.date_commentaire} -{" "}
                          {userFound ? userFound.username : "Utilisateur inconnu"}
                        </p>
                      </div>
                      <p className="text-gray-700 text-base">
                        {commentaire.commentaire}
                      </p>
                      <div className="mt-2 text-sm text-yellow-500">
                        {renderStars(commentaire.etoil)}
                      </div>
                    </div>
                  );
                }
              )}
              {commentaires.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                >
                  {showAllComments ? "Voir moins" : "Voir tous"}
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-600">Aucun commentaire disponible.</p>
          )}
          {!hasCommented && user && (
            <button
              onClick={() => setShowCommentForm(true)}
              className="ml-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            >
              Ajouter un commentaire
            </button>
          )}
          {showCommentForm && (
            <div className="mt-4">
              <select
                name="stars"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                className="px-3 py-2 border rounded-md mr-2"
              >
                <option value="1">1 étoile</option>
                <option value="2">2 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="5">5 étoiles</option>
              </select>
              <textarea
                name="content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez votre commentaire ici..."
                className="w-full px-3 py-2 border rounded-md mt-2"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 focus:outline-none"
              >
                {loading ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Envoyer"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;

