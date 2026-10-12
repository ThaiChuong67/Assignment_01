/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/EmptyState.js
 * DESCRIPTION   : Empty state placeholder component for FlatList / collections
 * ============================================================================
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import CustomButton from './CustomButton';
import { borderRadius, spacing } from '../styles/theme';

export default function EmptyState({
  icon = 'albums-outline',
  title = 'No items found',
  message = 'There are currently no items in this section.',
  actionTitle,
  onActionPress,
  style,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceSubtle }]}>
        <Ionicons name={icon} size={36} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

      {actionTitle && onActionPress && (
        <CustomButton
          title={actionTitle}
          onPress={onActionPress}
          variant="outline"
          size="sm"
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginVertical: spacing.lg,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: spacing.md,
    maxWidth: 260,
  },
  actionButton: {
    marginTop: spacing.xs,
  },
});
