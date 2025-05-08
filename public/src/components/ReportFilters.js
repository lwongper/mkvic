import React, { useState } from 'react';
import { employees, branches } from '../mock/employees';

const ReportFilters = ({ onFilter }) => {
  const [employee, setEmployee] = useState('');
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ employee, branch, date });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Filtrar Reporte</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Empleado
          </label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black"
          >
            <option value="">Todos</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Sucursal
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black"
          >
            <option value="">Todas</option>
            {branches.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
      >
        Generar Reporte
      </button>
    </form>
  );
};

export default ReportFilters;