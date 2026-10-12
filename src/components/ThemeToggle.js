/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/ThemeToggle.js
 * DESCRIPTION   : Interactive Light/Dark theme switcher with animations
 * ============================================================================
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing } from '../styles/theme';

export default function ThemeToggle({ showLabel = true, style }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={styles.leftRow}>
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: isDarkMode ? '#312E81' : '#FEF3C7' },
          ]}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={18}
            color={isDarkMode ? '#818CF8' : '#F59E0B'}
          />
        </View>

        {showLabel && (
          <View style={styles.textColumn}>
            <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.switchTrack,
          {
            backgroundColor: isDarkMode ? colors.primary : colors.surfaceSubtle,
            borderColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.switchThumb,
            {
              backgroundColor: '#FFFFFF',
              transform: [{ translateX: isDarkMode ? 20 : 0 }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textColumn: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  switchTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
