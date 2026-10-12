/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/ProfileCard.js
 * DESCRIPTION   : Reusable profile card component displaying user details
 * ============================================================================
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function ProfileCard({
  profile,
  onEditPress,
  compact = false,
  style,
}) {
  const { colors } = useTheme();

  if (!profile) return null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        shadows.medium,
        style,
      ]}
    >
      {/* Top Banner Accent */}
      <View style={[styles.cardHeaderAccent, { backgroundColor: colors.primary }]} />

      <View style={styles.cardContent}>
        {/* Avatar and Info Row */}
        <View style={styles.avatarRow}>
          <Image
            source={{
              uri: profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
            }}
            style={[styles.avatar, { borderColor: colors.surface }]}
          />

          <View style={styles.headerInfo}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {profile.name || 'Anonymous User'}
            </Text>

            <View style={[styles.roleBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.roleText, { color: colors.primary }]}>
                {profile.role || 'Student'}
              </Text>
            </View>

            {profile.classCode ? (
              <Text style={[styles.subText, { color: colors.textSecondary }]}>
                {profile.classCode} • {profile.university || 'FPT University'}
              </Text>
            ) : null}
          </View>

          {onEditPress ? (
            <TouchableOpacity
              style={[styles.editIconButton, { backgroundColor: colors.surfaceSubtle }]}
              onPress={onEditPress}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Bio */}
        {!compact && profile.bio ? (
          <View style={styles.bioContainer}>
            <Text style={[styles.bioText, { color: colors.textSecondary }]}>
              {profile.bio}
            </Text>
          </View>
        ) : null}

        {/* Details list (Email, Phone, Location) */}
        {!compact ? (
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        ) : null}

        {!compact ? (
          <View style={styles.contactList}>
            {profile.email ? (
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={16} color={colors.primary} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.text }]} numberOfLines={1}>
                  {profile.email}
                </Text>
              </View>
            ) : null}

            {profile.phone ? (
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={16} color={colors.success} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.text }]} numberOfLines={1}>
                  {profile.phone}
                </Text>
              </View>
            ) : null}

            {profile.location ? (
              <View style={styles.contactItem}>
                <Ionicons name="location-outline" size={16} color={colors.accent} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.text }]} numberOfLines={1}>
                  {profile.location}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    marginVertical: spacing.sm,
  },
  cardHeaderAccent: {
    height: 6,
    width: '100%',
  },
  cardContent: {
    padding: spacing.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
  },
  editIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioContainer: {
    marginTop: spacing.md,
  },
  bioText: {
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  contactList: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 8,
    width: 18,
  },
  contactText: {
    fontSize: 13,
    flex: 1,
  },
});
