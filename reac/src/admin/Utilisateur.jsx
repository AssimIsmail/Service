import React, { useEffect, useState } from 'react'
import Navbar from '../navigation/Navbar'
import AdminNav from '../navigation/AdminNav'
import axios from 'axios'
import useRequireAuthAdmin from '../hooks/useRequireAuthAdmin'

const Utilisateur = () => {
  useRequireAuthAdmin()

    const [utilisateurs, setUtilisateurs] = useState([]);

    const fetchutilisateur = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs`);
        setUtilisateurs(response.data.map(u => ({ ...u, roleEdit: u.role })));
    };

    const handleRoleChange = (id, newRole) => {
        setUtilisateurs(utilisateurs.map(u => u.id === id ? { ...u, roleEdit: newRole } : u));
    };

    const saveRole = async (id) => {
        const user = utilisateurs.find(u => u.id === id);
        const response = await axios.put(`http://127.0.0.1:8000/api/utilisateurs/${id}`, {
            role: user.roleEdit
        });
        if (response.status === 200) {
            alert('Role updated successfully');
        } else {
            alert('Failed to update role');
        }
    };

    useEffect(() => {
        fetchutilisateur();
    }, []);

    return (
        <div>
            <AdminNav />
            <div className="container mx-auto mt-10">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {utilisateurs.map((utilisateur) => (
                                            <tr key={utilisateur.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{utilisateur.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{utilisateur.username}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{utilisateur.lastname}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{utilisateur.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <select
                                                        value={utilisateur.roleEdit}
                                                        onChange={(e) => handleRoleChange(utilisateur.id, e.target.value)}
                                                        className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-gray-500"
                                                    >
                                                        <option value="user">user</option>
                                                        <option value="dev">dev</option>
                                                        <option value="admin">admin</option>
                                                        <option value="banned">Banned</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() => saveRole(utilisateur.id)}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                    >
                                                        Sauvegarder
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Utilisateur
