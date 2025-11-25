import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function CropManager() {
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', season: '', soil: '' });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const response = await api.getCrops();
    setCrops(response.crops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addCrop(formData);
    setFormData({ name: '', season: '', soil: '' });
    setShowForm(false);
    fetchCrops();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Crop Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Crop
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Crop</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Crop Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Season</label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Season</option>
                <option value="kharif">Kharif</option>
                <option value="rabi">Rabi</option>
                <option value="year-round">Year Round</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Soil Type</label>
              <select
                value={formData.soil}
                onChange={(e) => setFormData({ ...formData, soil: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Soil</option>
                <option value="loamy">Loamy</option>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="black">Black</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Season</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Soil Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {crops.map((crop) => (
              <tr key={crop.id}>
                <td className="px-6 py-4 whitespace-nowrap">{crop.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{crop.season}</td>
                <td className="px-6 py-4 whitespace-nowrap">{crop.soil}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}