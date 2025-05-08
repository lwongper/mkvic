import React, { useState } from 'react';
import { employees as initialEmployees, branches, records } from './mock/employees';
import ClockHeader from './components/ClockHeader';
import EmployeeSelector from './components/EmployeeSelector';
import BranchSelector from './components/BranchSelector';
import ClockButtons from './components/ClockButtons';
import ClockConfirmation from './components/ClockConfirmation';
import ReportFilters from './components/ReportFilters';
import ReportTable from './components/ReportTable';
import ReportActions from './components/ReportActions';
import PasswordModal from './components/PasswordModal';
import EmployeeManager from './components/EmployeeManager';

const App = () => {
  const [employee, setEmployee] = useState(null);
  const [branch, setBranch] = useState(null);
  const [lastRecord, setLastRecord] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [employees, setEmployees] = useState(initialEmployees);

  const handleCheckIn = () => {
    if (!employee || !branch) return;
    
    const employeeName = employees.find(e => e.id === parseInt(employee)).name;
    const branchName = branches.find(b => b.id === parseInt(branch)).name;
    const now = new Date();
    
    const newRecord = {
      employeeId: employee,
      employeeName,
      branchId: branch,
      branchName,
      type: 'in',
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString()
    };
    
    records.push(newRecord);
    setLastRecord(newRecord);
    setEmployee(null);
    setBranch(null);
  };

  const handleCheckOut = () => {
    if (!employee || !branch) return;
    
    const employeeName = employees.find(e => e.id === parseInt(employee)).name;
    const branchName = branches.find(b => b.id === parseInt(branch)).name;
    const now = new Date();
    
    const newRecord = {
      employeeId: employee,
      employeeName,
      branchId: branch,
      branchName,
      type: 'out',
      time: now.toLocaleTimeString(),
      date: now.toLocaleDateString()
    };
    
    records.push(newRecord);
    setLastRecord(newRecord);
    setEmployee(null);
    setBranch(null);
  };

  const handleFilter = ({ employee, branch, date }) => {
    let result = [...records];
    
    if (employee) {
      result = result.filter(r => r.employeeId === parseInt(employee));
    }
    
    if (branch) {
      result = result.filter(r => r.branchId === parseInt(branch));
    }
    
    if (date) {
      result = result.filter(r => r.date === date);
    }
    
    setFilteredRecords(result);
  };

  const handleExport = (type) => {
    const headers = ['Empleado', 'Sucursal', 'Tipo', 'Fecha', 'Hora'];
    let content, mimeType, extension;
    
    if (type === 'csv') {
      content = [
        headers.join(','),
        ...filteredRecords.map(r => 
          [r.employeeName, r.branchName, r.type === 'in' ? 'Entrada' : 'Salida', r.date, r.time].join(',')
        )
      ].join('\n');
      mimeType = 'text/csv;charset=utf-8;';
      extension = 'csv';
    } else {
      const rows = filteredRecords.map(r => `
        <Row>
          <Cell><Data ss:Type="String">${r.employeeName}</Data></Cell>
          <Cell><Data ss:Type="String">${r.branchName}</Data></Cell>
          <Cell><Data ss:Type="String">${r.type === 'in' ? 'Entrada' : 'Salida'}</Data></Cell>
          <Cell><Data ss:Type="String">${r.date}</Data></Cell>
          <Cell><Data ss:Type="String">${r.time}</Data></Cell>
        </Row>
      `).join('');
      
      content = `<?xml version="1.0"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40">
        <Worksheet ss:Name="Reporte">
          <Table>
            <Row>
              ${headers.map(h => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join('')}
            </Row>
            ${rows}
          </Table>
        </Worksheet>
      </Workbook>`;
      mimeType = 'application/vnd.ms-excel';
      extension = 'xls';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_asistencia.${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAuthSuccess = () => {
    setShowReport(true);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ClockHeader />
      <main className="container mx-auto p-4 max-w-6xl">
        {!showReport ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <EmployeeSelector employee={employee} setEmployee={setEmployee} employees={employees} />
              <BranchSelector branch={branch} setBranch={setBranch} />
              <ClockButtons 
                handleCheckIn={handleCheckIn}
                handleCheckOut={handleCheckOut}
              />
              <ClockConfirmation record={lastRecord} />
              <button
                onClick={() => setShowAuthModal(true)}
                className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                Ver Reportes
              </button>
            </div>
            <EmployeeManager employees={employees} setEmployees={setEmployees} />
          </>
        ) : (
          <div>
            <button
              onClick={() => setShowReport(false)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Volver al registro
            </button>
            <ReportActions onExport={handleExport} />
            <ReportFilters onFilter={handleFilter} />
            <ReportTable records={filteredRecords} />
          </div>
        )}

        <PasswordModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onConfirm={handleAuthSuccess}
        />
      </main>
    </div>
  );
};

export default App;

// DONE