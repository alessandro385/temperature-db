import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Home, Leaf } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className={`inline-flex items-center px-4 py-2 border-b-2 ${
              location.pathname === '/' ? 'border-blue-500 text-blue-600' : 'border-transparent'
            }`}>
              <Home className="w-5 h-5 mr-2" />
              Dashboard Attuale
            </Link>
            <Link to="/previsioni" className={`inline-flex items-center px-4 py-2 border-b-2 ${
              location.pathname === '/previsioni' ? 'border-blue-500 text-blue-600' : 'border-transparent'
            }`}>
              <BarChart2 className="w-5 h-5 mr-2" />
              Previsioni Future
            </Link>
            <Link to="/soluzioni" className={`inline-flex items-center px-4 py-2 border-b-2 ${
              location.pathname === '/soluzioni' ? 'border-blue-500 text-blue-600' : 'border-transparent'
            }`}>
              <Leaf className="w-5 h-5 mr-2" />
              Soluzioni Sostenibili
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}