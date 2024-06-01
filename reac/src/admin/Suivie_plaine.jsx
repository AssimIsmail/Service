import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../navigation/AdminNav';
import useRequireAuthAdmin from '../hooks/useRequireAuthAdmin';
import { UserContext } from '../context/UserContext';

const Suivie_plaine = () => {
    useRequireAuthAdmin();
    const { user } = useContext(UserContext);
    const { id } = useParams(); // id du support
    const [support, setSupport] = useState(null);
    const [reponses, setReponses] = useState([]);
    const [users, setUsers] = useState([]);
    const [responseText, setResponseText] = useState('');
    const fetchUsers = () => {
        axios.get('http://127.0.0.1:8000/api/utilisateurs')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };
    useEffect(() => {
        fetchSupport();
        fetchReponses();
        fetchUsers();
        const interval = setInterval(fetchReponses, 5000); // Rafraîchissement toutes les 5 secondes
        return () => clearInterval(interval);
    }, [id]);
    const getUserById = (userId) => {
        return users.find(user => user.id === userId);
    };
    const fetchSupport = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/supports/${id}`);
            setSupport(response.data);
            } catch (error) {
            console.error('Error fetching support:', error);
            }
            };const fetchReponses = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/reponses?support_id=${id}`);
                    setReponses(response.data);
                } catch (error) {
                    console.error('Error fetching responses:', error);
                }
            };
            
            const handleResponseSubmit = async (e) => {
                e.preventDefault();
            
                if (!responseText.trim()) {
                    console.error('Response text is empty');
                    return;
                }
            
                const newResponse = {
                    support_id: id,
                    utilisateur_id: String(user.id), // Convertir l'ID en chaîne
                    description: responseText,
                };
            
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/reponses', newResponse);
                    setReponses([...reponses, response.data]);
                    setResponseText('');
                } catch (error) {
                    console.error('Error submitting form:', error);
                    if (error.response) {
                        console.error('Error response data:', error.response.data);
                    }
                }
            };
            
            return (
                <div className="flex justify-center items-center flex-col">
                    <AdminNav />
                    <div className="w-full max-w-screen-md border p-5 mt-5">
                        {support && (
                            <div>
                                <p className="text-lg font-bold text-center">Référence: {support.id}</p>
                                <h2 className="text-xl font-bold text-center">Réclamation: {support.raison}</h2>
                                <p className="text-sm text-center">Description: {support.description}</p>
                            </div>
                        )}
                        <div>
                        {reponses.map((reponse) => {
    const reponseUser = getUserById(reponse.utilisateur_id);
    const isCurrentUser = reponse.utilisateur_id === user.id;
    return (
        <div key={reponse.id} className={`m-2 p-4 border rounded-md ${isCurrentUser ? 'text-left' : 'text-right'}`}>
            {!isCurrentUser && reponseUser && (
                <div className="flex items-center mb-2">
                    <div
                        className="w-8 h-8 bg-cover bg-center rounded-full mr-2"
                        style={{ backgroundImage: `url('${reponseUser.image}')` }}
                    ></div>
                    <p><strong>{reponseUser.lastname}</strong> {reponseUser.username}</p>
                </div>
            )}
            {isCurrentUser && reponseUser && (
                <div className="flex items-center mb-2">
                    <div
                        className="w-8 h-8 bg-cover bg-center rounded-full mr-2"
                        style={{ backgroundImage: `url('${reponseUser.image}')` }}
                    ></div>
                    <p><strong>{reponseUser.lastname}</strong> {reponseUser.username}</p>
                </div>
            )}
            <p className="p-2 border rounded-md">{reponse.description}</p>

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
            );
        };

        export default Suivie_plaine;            
