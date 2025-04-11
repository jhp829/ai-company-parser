import { useState } from 'react';
import { CompanyProfile, POC } from '../types/company';

export const useProfileEditor = (initialProfile: CompanyProfile) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CompanyProfile>({
    ...initialProfile,
    poc: initialProfile.poc || []
  });

  const handleInputChange = (field: keyof CompanyProfile, value: string | string[] | POC[]) => {
    if (field === 'poc' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'name' in value[0]) {
      setEditedProfile(prev => ({
        ...prev,
        poc: value as POC[]
      }));
    } else {
      setEditedProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getPOCArray = (field: keyof CompanyProfile): POC[] => {
    const value = editedProfile[field];
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'name' in value[0]) {
      return value as POC[];
    }
    return [];
  };

  return {
    isEditing,
    setIsEditing,
    editedProfile,
    handleInputChange,
    getPOCArray
  };
}; 