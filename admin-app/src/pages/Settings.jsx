import React, { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    language: 'en',
    timezone: 'Asia/Kolkata'
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // API call placeholder
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications about new farmers and advisories</p>
            </div>
            <button
              onClick={() => setSettings({...settings, notifications: !settings.notifications})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Alerts</h3>
              <p className="text-sm text-gray-500">Get email notifications for important updates</p>
            </div>
            <button
              onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailAlerts ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}