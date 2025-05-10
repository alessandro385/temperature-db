import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { FuturePredictions } from './components/FuturePredictions';
import { SustainableSolutions } from './components/SustainableSolutions';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/previsioni" element={<FuturePredictions />} />
          <Route path="/soluzioni" element={<SustainableSolutions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;