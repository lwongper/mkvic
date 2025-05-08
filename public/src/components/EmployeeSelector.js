const EmployeeSelector = ({ employee, setEmployee, employees }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Seleccionar empleado
      </label>
      <select
        value={employee || ''}
        onChange={(e) => setEmployee(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">Seleccione su nombre</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelector;

// DONE