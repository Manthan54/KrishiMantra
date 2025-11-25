import React, { useState } from 'react';
import axios from 'axios';

const mockAdvisories = [
  { id: 1, title: 'Wheat Sowing Guidelines', crop: 'Wheat', region: 'Maharashtra', date: '2024-01-15', description: 'Complete guide for wheat sowing in winter season' },
  { id: 2, title: 'Rice Pest Management', crop: 'Rice', region: 'Karnataka', date: '2024-01-10', description: 'Effective pest control methods for rice cultivation' },
  { id: 3, title: 'Cotton Irrigation Schedule', crop: 'Cotton', region: 'Gujarat', date: '2024-01-08', description: 'Optimal irrigation timing for cotton crops' }
];

export default function Advisories() {
  const [advisories, setAdvisories] = useState(mockAdvisories);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    crop: '',
    region: '',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call placeholder
    console.log('Creating advisory:', formData);
    
    const newAdvisory = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    
    setAdvisories([newAdvisory, ...advisories]);
    setFormData({ title: '', description: '', crop: '', region: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advisories</h1>
          <p className="text-gray-600">Create and manage farming advisories</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          + New Advisory
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Create New Advisory</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                <select
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Crop</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Region</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Advisory
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisories.map((advisory) => (
          <div key={advisory.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{advisory.title}</h3>
              <span className="text-xs text-gray-500">{advisory.date}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{advisory.crop}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{advisory.region}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{advisory.description}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">View Details</button>
              <div className="space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}