import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbaruser from '../Utilisateur/Navbaruser';
import axios from 'axios';

const DetailTaches = () => {
    const { idtache } = useParams();
    const [tache, setTache] = useState(null);

    useEffect(() => {
        const fetchTache = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/demandes/${idtache}`);
                setTache(response.data);
            } catch (error) {
                console.error('Error fetching tache:', error);
            }
        };
        fetchTache();
    }, [idtache]);

    return (
        <div className="h-screen bg-gray-100">
            <Navbaruser />

            <div className="flex justify-center items-center m-2">
                <div className="w-full p-8 bg-white shadow-md rounded-lg">
                    {tache ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Détail de la Tâche {idtache}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(tache).map(([key, value]) => (
                                    <div className="mb-4" key={key}>
                                        <p className="font-semibold">{key.replace(/_/g, ' ').toUpperCase()}:</p>
                                        <p>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Chargement...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailTaches;
