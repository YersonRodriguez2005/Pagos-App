import React, { useState } from 'react';
import { FaUser, FaMoneyBillWave, FaCalendarAlt, FaSave, FaFileInvoiceDollar, FaCheckCircle } from 'react-icons/fa';

export default function Create() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Formatea como moneda COP
    const formatCOP = (value) => {
        const number = parseInt(value.replace(/\D/g, ''), 10);
        if (isNaN(number)) return '';
        return new Intl.NumberFormat('es-CO').format(number);
    };

    // Maneja el cambio en el campo del monto
    const handleAmountChange = (e) => {
        const raw = e.target.value;
        const formatted = formatCOP(raw);
        setAmount(formatted);
    };

    // Guardar en localStorage
    const handleSubmit = (event) => {
        event.preventDefault();

        const rawAmount = parseInt(amount.replace(/\./g, ''), 10);

        const consignation = { name, amount: rawAmount, date };
        const consignations = JSON.parse(localStorage.getItem('consignations')) || [];
        consignations.push(consignation);
        localStorage.setItem('consignations', JSON.stringify(consignations));

        // Mostrar mensaje de éxito
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Limpiar campos
        setName('');
        setAmount('');
        setDate('');
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-3 rounded-xl">
                        <FaFileInvoiceDollar className="text-blue-600 text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Crear Consignación</h1>
                </div>
                <p className="text-gray-600 text-sm">Registra una nueva consignación en el sistema</p>
            </div>

            {/* Alert de éxito */}
            {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <div>
                        <h3 className="font-semibold text-green-800">¡Consignación creada exitosamente!</h3>
                        <p className="text-green-700 text-sm">Los datos se han guardado correctamente.</p>
                    </div>
                </div>
            )}

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3" htmlFor="name">
                            <FaUser className="text-blue-500" />
                            Nombre de Persona
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            placeholder="Ingresa el nombre completo"
                            required
                        />
                    </div>

                    {/* Campo Monto */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3" htmlFor="amount">
                            <FaMoneyBillWave className="text-green-500" />
                            Monto (COP)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                $
                            </span>
                            <input
                                type="text"
                                id="amount"
                                value={amount}
                                onChange={handleAmountChange}
                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800"
                                placeholder="0"
                                inputMode="numeric"
                                required
                            />
                        </div>
                        {amount && (
                            <p className="text-xs text-gray-500 mt-1">
                                Valor: ${amount} COP
                            </p>
                        )}
                    </div>

                    {/* Campo Fecha */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3" htmlFor="date">
                            <FaCalendarAlt className="text-orange-500" />
                            Fecha de Consignación
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-800"
                            required
                        />
                    </div>

                    {/* Botón Submit */}
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <FaSave className="text-lg" />
                        Crear Consignación
                    </button>
                </form>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                        <FaFileInvoiceDollar className="text-blue-600 text-sm" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-800 mb-1">Información importante</h3>
                        <p className="text-blue-700 text-sm">
                            Los datos se guardan localmente en tu navegador. Asegúrate de completar todos los campos correctamente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}