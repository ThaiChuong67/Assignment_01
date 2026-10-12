/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/contexts/ThemeContext.js
 * DESCRIPTION   : Context provider managing Light / Dark mode app-wide
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightColors, darkColors } from '../styles/theme';
import { storageService } from '../services/storageService';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await storageService.getTheme();
        setThemeModeState(savedTheme);
      } catch (err) {
        console.warn('Error hydrating theme:', err);
      } finally {
        setIsLoaded(true);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeModeState(nextMode);
    await storageService.saveTheme(nextMode);
  };

  const setThemeMode = async (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setThemeModeState(mode);
      await storageService.saveTheme(mode);
    }
  };

  const isDarkMode = themeMode === 'dark';
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDarkMode,
        colors,
        toggleTheme,
        setThemeMode,
        isLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
