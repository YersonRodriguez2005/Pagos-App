import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiUser, FiDollarSign, FiCalendar } from 'react-icons/fi';

export default function Edit() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const consignations = JSON.parse(localStorage.getItem('consignations')) || [];
    const target = consignations[index];
    if (target) {
      setName(target.name);
      setAmount(formatCOP(target.amount.toString()));
      setDate(target.date);
    } else {
      navigate('/list');
    }
  }, [index, navigate]);

  const formatCOP = (value) => {
    const number = parseInt(value.replace(/\D/g, ''), 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('es-CO').format(number);
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value;
    const formatted = formatCOP(raw);
    setAmount(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const consignations = JSON.parse(localStorage.getItem('consignations')) || [];
    const updatedAmount = parseInt(amount.replace(/\./g, ''), 10);

    consignations[index] = {
      name,
      amount: updatedAmount,
      date
    };

    localStorage.setItem('consignations', JSON.stringify(consignations));
    navigate('/list');
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Editar Consignación</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            <FiUser className="inline mr-2" /> Nombre de Persona:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-2">
            <FiDollarSign className="inline mr-2" /> Monto:
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="date" className="block text-gray-700 mb-2">
            <FiCalendar className="inline mr-2" /> Fecha:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <FiSave className="inline mr-2" />
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
