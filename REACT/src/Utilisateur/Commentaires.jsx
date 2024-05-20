import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import useRequireAuth from '../auth/UseRequireAuth';
import axios from 'axios';

const Commentaires = () => {

    const [commentaires, setCommentaires] = useState([]);

    useEffect(() => {
        const fetchCommentaires = async () => {
            try {
                const responseCommentaires = await axios.get(`http://127.0.0.1:8000/api/commentaires?utilisateur_id=${user.id}`);
                setCommentaires(responseCommentaires.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires :', error);
            }
        };
        fetchCommentaires();
    }, [user]);

    const handleRatingSelect = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <div className="p-4">
            <div className="max-w-md">
                {commentaires.map((commentaire) => (
                    <div key={commentaire.id} className="border rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="user-avatar"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span className="font-semibold">Utilisateur</span>
                        </div>
                        <p className="text-gray-700">{commentaire.commentaire}</p>
                        <div className="flex items-center mt-2">
                            <span className="text-xs text-gray-500 mr-2">Note:</span>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <svg
                                        key={num}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 fill-current ${
                                            num <= commentaire.etoil ? 'text-yellow-500' : 'text-gray-300'
                                        } cursor-pointer`}
                                        viewBox="0 0 20 20"
                                        onClick={() => handleRatingSelect(num)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 1l1.556 5.335H18l-4.042 3.197L14.91 18 10 14.901 5.09 18l.032-8.468L2 6.335h5.443L10 1zm0 2.307L8.694 6.88H4.914l3.165 2.5-.97 3.22L10 11.478l3.792 2.122-.97-3.22 3.166-2.5h-3.78L10 3.308z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Commentaires;
