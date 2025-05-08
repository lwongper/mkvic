import React, { useState } from 'react';
import { branches } from '../mock/employees';

const BranchSelector = ({ branch, setBranch }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Seleccionar sucursal
      </label>
      <select
        value={branch || ''}
        onChange={(e) => setBranch(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">Seleccione sucursal</option>
        {branches.map((br) => (
          <option key={br.id} value={br.id}>
            {br.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelector;