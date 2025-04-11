import React from 'react';
import { CompanyProfile } from '../types/company';
import { useProfileEditor } from '../hooks/useProfileEditor';
import { EditButton } from './EditButton';
import ProfileField from './ProfileField';

interface CompanyProfileProps {
  profile: CompanyProfile;
  onUpdate: (updatedProfile: CompanyProfile) => void;
}

interface FieldConfig {
  label: string;
  field: keyof CompanyProfile;
  isPOC?: boolean;
}

const fieldConfigs: FieldConfig[] = [
  { label: 'Company Description', field: 'company_description' },
  { label: 'Service Lines', field: 'service_line' },
  { label: 'Tier 1 Keywords', field: 'tier1_keywords' },
  { label: 'Tier 2 Keywords', field: 'tier2_keywords' },
  { label: 'Emails', field: 'emails' },
  { label: 'Points of Contact', field: 'poc', isPOC: true },
];

const CompanyProfileComponent: React.FC<CompanyProfileProps> = ({ profile, onUpdate }) => {
  const {
    isEditing,
    setIsEditing,
    editedProfile,
    handleInputChange,
  } = useProfileEditor(profile);

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  const currentProfile = isEditing ? editedProfile : profile;
  const onFieldUpdate = handleInputChange;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="mt-2 text-3xl font-bold text-gray-900">{profile.company_name}</h1>
        <EditButton
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
        />
      </div>

      {fieldConfigs.map(({ label, field, isPOC }) => (
        <ProfileField
          key={field}
          label={label}
          field={field}
          profile={currentProfile}
          isEditing={isEditing}
          onUpdate={onFieldUpdate}
          isPOC={isPOC}
        />
      ))}
    </div>
  );
};

export default CompanyProfileComponent; 