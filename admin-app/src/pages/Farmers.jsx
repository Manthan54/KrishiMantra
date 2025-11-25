import React, { useState, useEffect } from 'react';
import axios from 'axios';

const mockFarmers = [
  { id: 1, name: 'Rajesh Kumar', language: 'Hindi', soilType: 'Loamy', cropType: 'Wheat', district: 'Pune' },
  { id: 2, name: 'Priya Sharma', language: 'English', soilType: 'Clay', cropType: 'Rice', district: 'Mumbai' },
  { id: 3, name: 'Suresh Patil', language: 'Marathi', soilType: 'Black', cropType: 'Cotton', district: 'Nashik' },
  { id: 4, name: 'Anita Singh', language: 'Hindi', soilType: 'Sandy', cropType: 'Sugarcane', district: 'Kolhapur' }
];

export default function Farmers() {
  const [farmers, setFarmers] = useState(mockFarmers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = !filterDistrict || farmer.district === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  const districts = [...new Set(farmers.map(f => f.district))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Farmers</h1>
        <p className="text-gray-600">Manage registered farmers and their information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search farmers or crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4">
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soil Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">{farmer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{farmer.language}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{farmer.soilType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{farmer.cropType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{farmer.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}