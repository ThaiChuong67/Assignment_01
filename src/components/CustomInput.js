/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/CustomInput.js
 * DESCRIPTION   : Controlled Input component with validation error styling
 * ============================================================================
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing } from '../styles/theme';

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  helperText,
  style,
  inputStyle,
}) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(error);

  let currentBorderColor = colors.border;
  if (hasError) {
    currentBorderColor = colors.error;
  } else if (isFocused) {
    currentBorderColor = colors.primary;
  }

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
          {hasError && <Text style={[styles.errorLabel, { color: colors.error }]}>*</Text>}
        </View>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: editable ? colors.surface : colors.surfaceSubtle,
            borderColor: currentBorderColor,
            borderWidth: isFocused || hasError ? 1.5 : 1,
            minHeight: multiline ? 90 : 48,
            alignItems: multiline ? 'flex-start' : 'center',
            paddingVertical: multiline ? 10 : 0,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={hasError ? colors.error : isFocused ? colors.primary : colors.textMuted}
            style={[styles.leadingIcon, multiline && { marginTop: 4 }]}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.textInput,
            {
              color: colors.text,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
        />
      </View>

      {hasError ? (
        <View style={styles.feedbackRow}>
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        </View>
      ) : helperText ? (
        <Text style={[styles.helperText, { color: colors.textMuted }]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  errorLabel: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    paddingHorizontal: 12,
  },
  leadingIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
