import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbarlinks from '../navigation/Navlinks';
import Navbar from '../navigation/Navbar';

const Detail_tasks = () => {
    const { id } = useParams();
    const [tache, setTache] = useState(null);
    console.log(tache)
    useEffect(() => {
        const fetchTache = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/demandes/${id}`);
                setTache(response.data);
            } catch (error) {
                console.error('Error fetching tache:', error);
            }
        };
        fetchTache();
    }, [id]);

    return (
        <div className="h-screen ">
            <Navbar/>
            <Navbarlinks />
            <div className="flex justify-center items-center m-4">
                <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
                    {tache ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Détail de la Tâche {id}</h2>
                            <div className="flex flex-wrap">
                                {Object.entries(tache).map(([key, value]) => (
                                    <div className="w-full md:w-1/2 p-2" key={key}>
                                        <div className="flex justify-between items-center bg-gray-200 p-3 rounded">
                                            <p className="font-semibold text-gray-600">{key.replace(/_/g, ' ').toUpperCase()}</p>
                                            <p className="text-gray-800">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Chargement...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detail_tasks;
