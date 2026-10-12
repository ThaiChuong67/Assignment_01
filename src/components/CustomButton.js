/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/CustomButton.js
 * DESCRIPTION   : Reusable animated button supporting multiple variants & states
 * ============================================================================
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function CustomButton({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const { colors } = useTheme();

  // Background and border styles based on variant
  let backgroundColor = colors.primary;
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (variant === 'secondary') {
    backgroundColor = colors.surfaceSubtle;
    textColor = colors.text;
  } else if (variant === 'outline') {
    backgroundColor = 'transparent';
    textColor = colors.primary;
    borderColor = colors.borderFocused;
    borderWidth = 1.5;
  } else if (variant === 'danger') {
    backgroundColor = colors.error;
    textColor = '#FFFFFF';
  } else if (variant === 'ghost') {
    backgroundColor = 'transparent';
    textColor = colors.textSecondary;
  }

  // Size styles
  let paddingVertical = 12;
  let paddingHorizontal = 20;
  let fontSize = 15;

  if (size === 'sm') {
    paddingVertical = 8;
    paddingHorizontal = 14;
    fontSize = 13;
  } else if (size === 'lg') {
    paddingVertical = 15;
    paddingHorizontal = 28;
    fontSize = 16;
  }

  const isShadowed = (variant === 'primary' || variant === 'danger') && !disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        {
          backgroundColor: disabled ? (colors.surfaceSubtle) : backgroundColor,
          borderColor: disabled ? colors.border : borderColor,
          borderWidth,
          paddingVertical,
          paddingHorizontal,
        },
        isShadowed && shadows.soft,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={fontSize + 2}
              color={disabled ? colors.textMuted : textColor}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            style={[
              styles.textBase,
              {
                color: disabled ? colors.textMuted : textColor,
                fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={fontSize + 2}
              color={disabled ? colors.textMuted : textColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
