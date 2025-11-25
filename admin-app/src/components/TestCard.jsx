import React from 'react';

export default function TestCard() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden m-4">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-xl font-bold text-gray-900">TailwindCSS Working!</div>
            <p className="text-gray-600">Styles are loading correctly.</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}