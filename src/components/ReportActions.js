import React, { useState } from 'react';

const ReportActions = ({ onExport }) => {
  const [exportType, setExportType] = useState('');

  const handleExportClick = (type) => {
    setExportType(type);
    onExport(type);
  };

  return (
    <div className="flex justify-end mb-4 space-x-3">
      <button
        onClick={() => handleExportClick('csv')}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Exportar a CSV
      </button>
      <button
        onClick={() => handleExportClick('excel')}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="CurrentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
            clipRule="evenodd"
          />
        </svg>
        Exportar a Excel
      </button>
    </div>
  );
};

export default ReportActions;

// DONE