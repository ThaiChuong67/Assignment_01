/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * AUTHOR        : Student Assignment Submission
 * FILE          : App.js
 * DESCRIPTION   : App Root Entry - Provider nesting & StatusBar configuration
 * ============================================================================
 */

import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { ProfileProvider } from './src/contexts/ProfileContext';
import { ActivityProvider } from './src/contexts/ActivityContext';
import AppNavigator from './src/navigation/AppNavigator';

function MainApp() {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileProvider>
          <ActivityProvider>
            <MainApp />
          </ActivityProvider>
        </ProfileProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
