import React, { useState } from 'react';
import { CompanyProfile } from '../types/company';

interface JsonDisplayProps {
  jsonData: CompanyProfile;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ jsonData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Show JSON
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">JSON Data</h2>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonDisplay; 