import React from 'react';
import { CompanyProfile, POC } from '../types/company';

interface ProfileFieldProps {
  label: string;
  field: keyof CompanyProfile;
  profile: CompanyProfile;
  isEditing: boolean;
  onUpdate?: (field: keyof CompanyProfile, value: string | string[] | POC[]) => void;
  isPOC?: boolean;
}

// Type guards
const isPOCArray = (value: unknown): value is POC[] => {
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return true;
  const firstItem = value[0];
  return (
    typeof firstItem === 'object' &&
    firstItem !== null &&
    'name' in firstItem &&
    'title' in firstItem &&
    'email' in firstItem
  );
};

const isStringArray = (value: unknown): value is string[] => {
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return true;
  return typeof value[0] === 'string';
};

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  className = '',
  label,
}) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
    />
  </div>
);

const ProfileField: React.FC<ProfileFieldProps> = ({ 
  label, 
  field, 
  profile, 
  isEditing, 
  onUpdate,
  isPOC = false
}) => {
  const value = profile[field];

  const renderPOCEditor = (pocs: POC[]) => {
    if (!onUpdate) return null;
    
    const pocFields = [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' }
    ] as const;
    
    return (
      <div className="space-y-4">
        {pocs.map((poc, index) => (
          <div key={index} className="space-y-2">
            {pocFields.map(({ key, label, type }) => (
              <InputField
                key={key}
                value={poc[key]}
                onChange={(newValue) => {
                  const newPocs = [...pocs];
                  newPocs[index] = { ...poc, [key]: newValue };
                  onUpdate(field, newPocs);
                }}
                type={type}
                label={label}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                const newPocs = [...pocs];
                newPocs.splice(index, 1);
                onUpdate(field, newPocs);
              }}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newPocs = [...pocs, { name: '', title: '', email: '' }];
            onUpdate(field, newPocs);
          }}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Add POC
        </button>
      </div>
    );
  };

  const renderStringArrayEditor = (items: string[]) => {
    if (!onUpdate) return null;

    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <InputField
              value={item}
              onChange={(newValue) => {
                const newItems = [...items];
                newItems[index] = newValue;
                onUpdate(field, newItems);
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newItems = [...items];
                newItems.splice(index, 1);
                onUpdate(field, newItems);
              }}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newItems = [...items, ''];
            onUpdate(field, newItems);
          }}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Add Item
        </button>
      </div>
    );
  };

  const renderPOCDisplay = (pocs: POC[]) => (
    <div className="flex flex-wrap gap-2">
      {pocs.map((poc, index) => (
        <div key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
          <div className="font-semibold">{poc.name}</div>
          <div className="text-sm text-gray-600">{poc.title}</div>
          <div className="text-sm text-blue-600">{poc.email}</div>
        </div>
      ))}
    </div>
  );

  const renderStringArrayDisplay = (items: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className={`px-3 py-1 rounded-full text-sm ${
            field === 'tier1_keywords'
              ? 'bg-blue-100 text-blue-800'
              : field === 'tier2_keywords'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );

  if (isEditing && onUpdate) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        {isPOC && isPOCArray(value) ? renderPOCEditor(value) :
         !isPOC && isStringArray(value) ? renderStringArrayEditor(value) :
         typeof value === 'string' ? (
          <textarea
            value={value}
            onChange={(e) => onUpdate(field, e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="mt-1">
        {isPOC && isPOCArray(value) ? renderPOCDisplay(value) :
         !isPOC && isStringArray(value) ? renderStringArrayDisplay(value) :
         typeof value === 'string' ? (
          <p className="text-gray-700">{value}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileField; 