import React from 'react';

const ClockConfirmation = ({ record }) => {
  if (!record) return null;

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-bold mb-2">Registro exitoso</h3>
      <p className="text-gray-700">
        {record.type === 'in' ? 'Entrada' : 'Salida'} registrada a las{' '}
        {record.time} en {record.branchName}
      </p>
    </div>
  );
};

export default ClockConfirmation;