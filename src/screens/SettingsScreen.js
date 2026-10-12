/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/screens/SettingsScreen.js
 * DESCRIPTION   : App Settings Screen managing Themes, Preferences, Storage Reset
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useActivities } from '../contexts/ActivityContext';
import { storageService } from '../services/storageService';
import ThemeToggle from '../components/ThemeToggle';
import CustomButton from '../components/CustomButton';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function SettingsScreen() {
  const { colors, isDarkMode } = useTheme();
  const { resetProfile } = useProfile();
  const { resetActivities } = useActivities();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [compactCards, setCompactCards] = useState(false);

  useEffect(() => {
    async function loadPreferences() {
      const prefs = await storageService.getPreferences();
      setNotificationsEnabled(prefs.notifications);
      setCompactCards(prefs.compactCards);
    }
    loadPreferences();
  }, []);

  const handleToggleNotifications = async (val) => {
    setNotificationsEnabled(val);
    await storageService.savePreferences({
      notifications: val,
      compactCards,
    });
  };

  const handleToggleCompact = async (val) => {
    setCompactCards(val);
    await storageService.savePreferences({
      notifications: notificationsEnabled,
      compactCards: val,
    });
  };

  const handleResetProfile = () => {
    Alert.alert(
      'Reset Profile',
      'Are you sure you want to revert your profile back to original default info?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProfile();
            Alert.alert('Done', 'Profile has been restored to default.');
          },
        },
      ]
    );
  };

  const handleResetActivities = () => {
    Alert.alert(
      'Reset Activities',
      'Are you sure you want to revert activities back to seed samples?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetActivities();
            Alert.alert('Done', 'Activities have been restored to defaults.');
          },
        },
      ]
    );
  };

  const handleClearAllStorage = () => {
    Alert.alert(
      'Factory Reset Storage',
      'This will clear all AsyncStorage records (Profile, Theme, Activities, Preferences) and restart with defaults.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All Data',
          style: 'destructive',
          onPress: async () => {
            await storageService.clearAll();
            await resetProfile();
            await resetActivities();
            Alert.alert('Success', 'Storage cleared. App state returned to factory defaults.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.pageTitle, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
          Manage theme, preferences and local persistence
        </Text>

        {/* Section 1: Appearance */}
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Appearance & Theme</Text>
        <ThemeToggle style={{ marginBottom: spacing.md }} />

        {/* Section 2: Preferences */}
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Preferences</Text>
        <View
          style={[
            styles.cardSection,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadows.soft,
          ]}
        >
          {/* Notification Preference */}
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="notifications-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.prefTitle, { color: colors.text }]}>Push Notifications</Text>
                <Text style={[styles.prefDesc, { color: colors.textSecondary }]}>
                  Receive reminders for joined activities
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Compact View Preference */}
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconBox, { backgroundColor: colors.secondaryLight }]}>
                <Ionicons name="grid-outline" size={18} color={colors.secondary} />
              </View>
              <View>
                <Text style={[styles.prefTitle, { color: colors.text }]}>Compact Card Mode</Text>
                <Text style={[styles.prefDesc, { color: colors.textSecondary }]}>
                  Show concise cards to view more items
                </Text>
              </View>
            </View>
            <Switch
              value={compactCards}
              onValueChange={handleToggleCompact}
              trackColor={{ false: colors.border, true: colors.secondary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Section 3: Data & Storage Persistence */}
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Data & Persistence</Text>
        <View
          style={[
            styles.cardSection,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadows.soft,
          ]}
        >
          <TouchableOpacity
            style={styles.clickableRow}
            onPress={handleResetProfile}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={{ marginRight: 10 }} />
              <Text style={[styles.clickableText, { color: colors.text }]}>Reset Profile to Default</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={handleResetActivities}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="albums-outline" size={20} color={colors.textSecondary} style={{ marginRight: 10 }} />
              <Text style={[styles.clickableText, { color: colors.text }]}>Reset Activities to Seed Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <TouchableOpacity
            style={styles.clickableRow}
            onPress={handleClearAllStorage}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="trash-bin-outline" size={20} color={colors.error} style={{ marginRight: 10 }} />
              <Text style={[styles.clickableText, { color: colors.error }]}>Clear All AsyncStorage Records</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.error} />
          </TouchableOpacity>
        </View>

        {/* Section 4: About & System Info */}
        <Text style={[styles.sectionHeading, { color: colors.text }]}>About</Text>
        <View
          style={[
            styles.cardSection,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadows.soft,
          ]}
        >
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Course</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>MMA301 - Multiplatform Mobile App</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Project</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Assignment 01 - Profile & Activity App</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Architecture</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Context API + AsyncStorage + Clean Code</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Version</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>1.0.0 (Release Candidate)</Text>
          </View>
        </View>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  pageSubtitle: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardSection: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  prefTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  prefDesc: {
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  clickableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clickableText: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  aboutLabel: {
    fontSize: 13,
  },
  aboutValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});
