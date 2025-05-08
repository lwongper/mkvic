import React, { useState } from 'react';
import PasswordModal from './PasswordModal';

const EmployeeManager = ({ employees, setEmployees }) => {
  const [newEmployee, setNewEmployee] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleAddConfirm = () => {
    if (!newEmployee.trim()) return;
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    setEmployees([...employees, { id: newId, name: newEmployee.trim() }]);
    setNewEmployee('');
    setShowAddModal(false);
  };

  const handleRemoveConfirm = () => {
    if (!selectedEmployee) return;
    setEmployees(employees.filter(emp => emp.id !== parseInt(selectedEmployee)));
    setSelectedEmployee('');
    setShowRemoveModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Gestión de Empleados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Agregar Nuevo Empleado</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Nombre completo"
            />
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Agregar
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Eliminar Empleado</h3>
          <div className="flex space-x-2">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar empleado</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            <button
              onClick={() => setShowRemoveModal(true)}
              disabled={!selectedEmployee}
              className={`py-2 px-4 rounded ${selectedEmployee ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <PasswordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirm={handleAddConfirm}
      />

      <PasswordModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
};

export default EmployeeManager;

// DONE