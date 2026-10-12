/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/contexts/ProfileContext.js
 * DESCRIPTION   : Context provider managing user profile data & persistence
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { DEFAULT_PROFILE } from '../constants/defaultData';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function hydrateProfile() {
      try {
        const stored = await storageService.getProfile();
        setProfile(stored);
      } catch (err) {
        console.warn('Error hydrating profile:', err);
        setProfile(DEFAULT_PROFILE);
      } finally {
        setIsLoading(false);
      }
    }
    hydrateProfile();
  }, []);

  const updateProfile = async (newProfileData) => {
    const updated = { ...profile, ...newProfileData };
    setProfile(updated);
    await storageService.saveProfile(updated);
    return updated;
  };

  const resetProfile = async () => {
    setProfile(DEFAULT_PROFILE);
    await storageService.saveProfile(DEFAULT_PROFILE);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        updateProfile,
        resetProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
