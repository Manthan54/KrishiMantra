import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', name: 'Dashboard', icon: '📊' },
  { path: '/farmers', name: 'Farmers', icon: '👨‍🌾' },
  { path: '/advisories', name: 'Advisories', icon: '📋' },
  { path: '/settings', name: 'Settings', icon: '⚙️' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-green-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <span className="text-2xl mr-2">🌾</span>
        <h1 className="text-xl font-bold">KrishiMantra</h1>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-green-700 text-white'
                : 'text-green-100 hover:bg-green-700 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}