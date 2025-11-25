import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function WeatherManager() {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: '', severity: '', message: '', action: '' });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const response = await api.getWeatherAlerts();
    setAlerts(response.alerts || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addWeatherAlert(formData);
    setFormData({ type: '', severity: '', message: '', action: '' });
    setShowForm(false);
    fetchAlerts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Weather Alert Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Alert
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Weather Alert</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Alert Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Type</option>
                <option value="rainfall">Rainfall</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="wind">Wind</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border rounded px-3 py-2 h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recommended Action</label>
              <textarea
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                className="w-full border rounded px-3 py-2 h-20"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{alert.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">{alert.message}</td>
                <td className="px-6 py-4">{alert.action}</td>
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