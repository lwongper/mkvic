const ClockHeader = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4 w-16 h-16">
            <img 
              src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0i0qWfa1U3SvywDhA4KtNVcgeG7fQn92ZEUMj" 
              alt="Logo Grupo Victoria"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Asistencia Grupo Victoria</h1>
            <p className="text-gray-600">Control de acceso personalizado</p>
          </div>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">Sistema de registro oficial</p>
        </div>
      </div>
    </header>
  );
};

export default ClockHeader;

// DONE