import React from 'react';

interface EditButtonProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ isEditing, onEdit, onSave }) => (
  <button
    onClick={isEditing ? onSave : onEdit}
    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
      isEditing
        ? 'bg-green-600 text-white hover:bg-green-700'
        : 'bg-blue-600 text-white hover:bg-blue-700'
    }`}
  >
    {isEditing ? (
      <>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Save Changes
      </>
    ) : (
      <>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Profile
      </>
    )}
  </button>
); 