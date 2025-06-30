import React, { useState, useEffect } from 'react';
import {
    FiEdit3,
    FiTrash2,
    FiPlus,
    FiFileText,
    FiCalendar,
    FiDollarSign
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function List() {
    const navigate = useNavigate();
    const [consignations, setConsignations] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('consignations')) || [];
        setConsignations(stored);
    }, []);

    const handleDelete = (index) => {
        const updatedConsignations = consignations.filter((_, i) => i !== index);
        setConsignations(updatedConsignations);
        localStorage.setItem('consignations', JSON.stringify(updatedConsignations));
        console.log(`Consignación ${index} eliminada`);

    };

    const handleEdit = (index) => {
        console.log(`Editando consignación ${index}`);
        navigate(`/edit/${index}`);
    };

    if (consignations.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiFileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay consignaciones</h3>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Lista de Consignaciones
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Gestiona todas tus consignaciones de forma fácil
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Consignaciones</p>
                                <p className="text-2xl font-bold text-gray-900">{consignations.length}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiFileText className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monto Total</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${new Intl.NumberFormat('es-CO').format(
                                        consignations.reduce((sum, c) => sum + c.amount, 0)
                                    )}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FiDollarSign className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Última Consignación</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {consignations.length > 0 ?
                                        new Date(Math.max(...consignations.map(c => new Date(c.date)))).toLocaleDateString('es-CO')
                                        : 'N/A'
                                    }
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FiCalendar className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table for larger screens */}
                <div className="hidden md:block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Monto
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {consignations.map((consignation, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {consignation.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-semibold">
                                                ${new Intl.NumberFormat('es-CO').format(consignation.amount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(consignation.date).toLocaleDateString('es-CO')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                                                    title="Editar consignación"
                                                >
                                                    <FiEdit3 className="w-4 h-4" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(index)}
                                                    className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                                                    title="Eliminar consignación"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cards for mobile screens */}
                <div className="md:hidden space-y-4">
                    {consignations.map((consignation, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{consignation.name}</h3>
                                    <p className="text-2xl font-bold text-green-600 mt-1">
                                        ${new Intl.NumberFormat('es-CO').format(consignation.amount)}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-sm"
                                        title="Editar"
                                    >
                                        <FiEdit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                                        title="Eliminar"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 border-t pt-3">
                                <FiCalendar className="w-4 h-4 mr-2" />
                                {new Date(consignation.date).toLocaleDateString('es-CO')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}