import { useState } from 'react';
import { CompanyProfile } from '../types/company';

interface ProfileEditorState {
  editedProfile: CompanyProfile;
  handleInputChange: <T extends keyof CompanyProfile>(
    field: T,
    value: CompanyProfile[T]
  ) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useProfileEditor = (initialProfile: CompanyProfile): ProfileEditorState => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CompanyProfile>(initialProfile);

  const handleInputChange = <T extends keyof CompanyProfile>(
    field: T,
    value: CompanyProfile[T]
  ) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    isEditing,
    setIsEditing,
    editedProfile,
    handleInputChange
  };
}; 