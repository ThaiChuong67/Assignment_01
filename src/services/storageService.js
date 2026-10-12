/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/services/storageService.js
 * DESCRIPTION   : Service layer for AsyncStorage with robust error handling,
 *                 serialization/deserialization, and fallback strategies.
 * ============================================================================
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { DEFAULT_PROFILE, DEFAULT_ACTIVITIES } from '../constants/defaultData';

export const storageService = {
  /**
   * Retrieves profile from persistent storage.
   * If not found or if JSON is corrupt, safely falls back to DEFAULT_PROFILE.
   */
  async getProfile() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!raw) return DEFAULT_PROFILE;
      const parsed = JSON.parse(raw);
      // Validate minimal structure
      if (typeof parsed === 'object' && parsed !== null && parsed.name) {
        return { ...DEFAULT_PROFILE, ...parsed };
      }
      return DEFAULT_PROFILE;
    } catch (error) {
      console.warn('[storageService] Failed to parse profile, using default fallback:', error);
      return DEFAULT_PROFILE;
    }
  },

  /**
   * Saves profile to persistent storage.
   */
  async saveProfile(profile) {
    try {
      const serialized = JSON.stringify(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, serialized);
      return true;
    } catch (error) {
      console.error('[storageService] Error saving profile:', error);
      throw error;
    }
  },

  /**
   * Retrieves theme preference ('light' | 'dark').
   */
  async getTheme() {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      if (theme === 'dark' || theme === 'light') {
        return theme;
      }
      return 'light'; // Default
    } catch (error) {
      console.warn('[storageService] Error reading theme, fallback to light:', error);
      return 'light';
    }
  },

  /**
   * Saves theme preference.
   */
  async saveTheme(theme) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (error) {
      console.error('[storageService] Error saving theme:', error);
      throw error;
    }
  },

  /**
   * Retrieves activities list with fallback to DEFAULT_ACTIVITIES.
   */
  async getActivities() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (!raw) return DEFAULT_ACTIVITIES;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed;
      }
      return DEFAULT_ACTIVITIES;
    } catch (error) {
      console.warn('[storageService] Error reading activities, using fallback:', error);
      return DEFAULT_ACTIVITIES;
    }
  },

  /**
   * Saves activities list.
   */
  async saveActivities(activities) {
    try {
      const serialized = JSON.stringify(activities);
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES, serialized);
      return true;
    } catch (error) {
      console.error('[storageService] Error saving activities:', error);
      throw error;
    }
  },

  /**
   * Retrieves app-wide preferences.
   */
  async getPreferences() {
    const defaultPrefs = { notifications: true, compactCards: false };
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (!raw) return defaultPrefs;
      const parsed = JSON.parse(raw);
      return { ...defaultPrefs, ...parsed };
    } catch (error) {
      console.warn('[storageService] Error reading preferences:', error);
      return defaultPrefs;
    }
  },

  /**
   * Saves app-wide preferences.
   */
  async savePreferences(preferences) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('[storageService] Error saving preferences:', error);
      throw error;
    }
  },

  /**
   * Clears all application keys in AsyncStorage (reset to defaults).
   */
  async clearAll() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.PROFILE,
        STORAGE_KEYS.THEME,
        STORAGE_KEYS.ACTIVITIES,
        STORAGE_KEYS.PREFERENCES,
      ]);
      return true;
    } catch (error) {
      console.error('[storageService] Error clearing storage:', error);
      throw error;
    }
  },
};
