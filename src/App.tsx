import React, { useState } from 'react';
import CompanyProfileComponent from './components/CompanyProfile';
import { CompanyProfile } from './types/company';
import JsonDisplay from './components/JsonDisplay';
import { useCompanyProfile } from './hooks/useCompanyProfile';

function App() {
  const [url, setUrl] = useState('');
  const { profile, error, isLoading, generateProfile, updateProfile } = useCompanyProfile();

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generateProfile(url)
  };

  const handleProfileEdit = (updatedProfile: CompanyProfile) => {
    updateProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Profile Generator</h1>
        </div>
        <form onSubmit={handleUrlSubmit} className="mb-8">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                disabled={isLoading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Profile'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 shadow-sm">
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {profile && !isLoading && (
          <div className="transform transition-all duration-300 ease-in-out">
            <div className="flex justify-end mb-4">
              <JsonDisplay jsonData={profile} />
            </div>
            <CompanyProfileComponent
              profile={profile}
              onUpdate={handleProfileEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
