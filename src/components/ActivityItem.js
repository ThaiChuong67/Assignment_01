/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/ActivityItem.js
 * DESCRIPTION   : Interactive activity item rendered inside FlatList
 * ============================================================================
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function ActivityItem({
  item,
  onToggleFavorite,
  onToggleJoined,
  onDelete,
}) {
  const { colors } = useTheme();

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Activity',
      `Are you sure you want to remove "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete && onDelete(item.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        shadows.soft,
      ]}
    >
      {/* Category Header Row */}
      <View style={styles.topRow}>
        <View style={[styles.categoryTag, { backgroundColor: colors.surfaceSubtle }]}>
          <Ionicons
            name={item.icon || 'star-outline'}
            size={13}
            color={item.color || colors.primary}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
            {item.category}
          </Text>
        </View>

        {/* Favorite & Delete Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => onToggleFavorite && onToggleFavorite(item.id)}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={item.isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={item.isFavorite ? colors.accent : colors.textMuted}
            />
          </TouchableOpacity>

          {onDelete && (
            <TouchableOpacity
              onPress={handleDeletePress}
              style={[styles.iconBtn, { marginLeft: 8 }]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="trash-outline" size={19} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>

      {/* Description */}
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
        {item.description}
      </Text>

      {/* Meta Row: Date & Location */}
      <View style={styles.metaRow}>
        {item.date ? (
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={13} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{item.date}</Text>
          </View>
        ) : null}

        {item.location ? (
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={13} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Bottom Interactive Joined Status */}
      <View style={[styles.bottomDivider, { backgroundColor: colors.border }]} />

      <View style={styles.bottomRow}>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: item.isJoined ? colors.success : colors.textMuted },
            ]}
          />
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            {item.isJoined ? 'Participating' : 'Not Joined'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => onToggleJoined && onToggleJoined(item.id)}
          style={[
            styles.joinButton,
            {
              backgroundColor: item.isJoined ? colors.successLight : colors.primaryLight,
              borderColor: item.isJoined ? colors.success : colors.primary,
            },
          ]}
          activeOpacity={0.7}
        >
          <Ionicons
            name={item.isJoined ? 'checkmark-circle' : 'add-circle-outline'}
            size={14}
            color={item.isJoined ? colors.success : colors.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.joinButtonText,
              { color: item.isJoined ? colors.success : colors.primary },
            ]}
          >
            {item.isJoined ? 'Joined' : 'Join Activity'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  bottomDivider: {
    height: 1,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  joinButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
