/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/screens/HomeScreen.js
 * DESCRIPTION   : Home Dashboard Screen with summary, quick stats & navigation
 * ============================================================================
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useActivities } from '../contexts/ActivityContext';
import ActivityItem from '../components/ActivityItem';
import ThemeToggle from '../components/ThemeToggle';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const { profile } = useProfile();
  const { activities, toggleFavorite, toggleJoined, deleteActivity } = useActivities();

  // Metrics
  const totalActivities = activities.length;
  const favoriteCount = activities.filter((a) => a.isFavorite).length;
  const joinedCount = activities.filter((a) => a.isJoined).length;

  // Recent 3 activities
  const recentActivities = activities.slice(0, 3);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Greeting Card */}
        <View
          style={[
            styles.welcomeCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
            shadows.medium,
          ]}
        >
          <View style={styles.welcomeRow}>
            <View style={styles.welcomeTextColumn}>
              <Text style={[styles.greetingLabel, { color: colors.primary }]}>
                WELCOME BACK 👋
              </Text>
              <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
                {profile.name}
              </Text>
              <Text style={[styles.userRole, { color: colors.textSecondary }]}>
                {profile.role}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileTab')}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: profile.avatar }}
                style={[styles.avatar, { borderColor: colors.primary }]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Stat 1: Total Activities */}
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
          >
            <View style={[styles.statIconBadge, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="sparkles" size={18} color={colors.primary} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{totalActivities}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Activities</Text>
          </View>

          {/* Stat 2: Favorites */}
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
          >
            <View style={[styles.statIconBadge, { backgroundColor: colors.accentLight }]}>
              <Ionicons name="heart" size={18} color={colors.accent} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{favoriteCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
          </View>

          {/* Stat 3: Joined */}
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
          >
            <View style={[styles.statIconBadge, { backgroundColor: colors.successLight }]}>
              <Ionicons name="checkmark-done" size={18} color={colors.success} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{joinedCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Joined</Text>
          </View>
        </View>

        {/* Quick Shortcuts */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.shortcutsRow}>
          <TouchableOpacity
            style={[
              styles.shortcutCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
            onPress={() => navigation.navigate('ProfileTab')}
            activeOpacity={0.7}
          >
            <View style={[styles.shortcutIconBox, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.shortcutTitle, { color: colors.text }]}>View Profile</Text>
            <Text style={[styles.shortcutDesc, { color: colors.textSecondary }]}>Check details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shortcutCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
            onPress={() => navigation.navigate('ActivitiesTab')}
            activeOpacity={0.7}
          >
            <View style={[styles.shortcutIconBox, { backgroundColor: colors.secondaryLight }]}>
              <Ionicons name="compass-outline" size={24} color={colors.secondary} />
            </View>
            <Text style={[styles.shortcutTitle, { color: colors.text }]}>Explore</Text>
            <Text style={[styles.shortcutDesc, { color: colors.textSecondary }]}>All activities</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shortcutCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
            onPress={() => navigation.navigate('SettingsTab')}
            activeOpacity={0.7}
          >
            <View style={[styles.shortcutIconBox, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="settings-outline" size={24} color={colors.text} />
            </View>
            <Text style={[styles.shortcutTitle, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.shortcutDesc, { color: colors.textSecondary }]}>Preferences</Text>
          </TouchableOpacity>
        </View>

        {/* Theme Quick Switcher */}
        <ThemeToggle style={{ marginVertical: spacing.md }} />

        {/* Recent Activities Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activities</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ActivitiesTab')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All ({totalActivities})</Text>
          </TouchableOpacity>
        </View>

        {recentActivities.map((item) => (
          <ActivityItem
            key={item.id}
            item={item}
            onToggleFavorite={toggleFavorite}
            onToggleJoined={toggleJoined}
            onDelete={deleteActivity}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  welcomeCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeTextColumn: {
    flex: 1,
    paddingRight: 12,
  },
  greetingLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 13,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  statIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
  },
  shortcutCard: {
    flex: 1,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  shortcutIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shortcutTitle: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  shortcutDesc: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
