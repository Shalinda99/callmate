import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Calls from './pages/Calls';

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">
        <Sidebar />
        <main className="ml-64 flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
