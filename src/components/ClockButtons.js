import React from 'react';

const ClockButtons = ({ handleCheckIn, handleCheckOut }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button
        onClick={handleCheckIn}
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Entrada
      </button>
      <button
        onClick={handleCheckOut}
        className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Salida
      </button>
    </div>
  );
};

export default ClockButtons;