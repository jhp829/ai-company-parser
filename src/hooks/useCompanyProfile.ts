import { useState } from 'react';
import { CompanyProfile } from '../types/company';
import { getAIService } from '../services/aiService';

export const useCompanyProfile = () => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateProfile = async (url: string) => {
    setError(null);
    setProfile(null);
    setIsLoading(true);

    try {
      const aiService = getAIService();
      const newProfile = await aiService.generateCompanyProfile(url);
      setProfile(newProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the profile');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (updatedProfile: CompanyProfile) => {
    setProfile(updatedProfile);
  };

  return {
    profile,
    error,
    isLoading,
    generateProfile,
    updateProfile
  };
}; 