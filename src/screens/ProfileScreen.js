/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/screens/ProfileScreen.js
 * DESCRIPTION   : Detailed Profile Screen displaying user info & edit entry
 * ============================================================================
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { useActivities } from '../contexts/ActivityContext';
import CustomButton from '../components/CustomButton';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const { activities } = useActivities();

  const favoriteCount = activities.filter((a) => a.isFavorite).length;
  const joinedCount = activities.filter((a) => a.isJoined).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card Header */}
        <View
          style={[
            styles.profileHeaderCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
            shadows.medium,
          ]}
        >
          {/* Top Decorative Banner */}
          <View style={[styles.bannerStrip, { backgroundColor: colors.primary }]} />

          <View style={styles.headerBody}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: profile.avatar }}
                style={[styles.avatar, { borderColor: colors.surface }]}
              />
              <TouchableOpacity
                style={[styles.cameraBadge, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
            <View style={[styles.roleBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.roleText, { color: colors.primary }]}>{profile.role}</Text>
            </View>

            <Text style={[styles.universityText, { color: colors.textSecondary }]}>
              {profile.university} • {profile.classCode}
            </Text>

            {/* Quick Metrics */}
            <View style={[styles.metricsRow, { borderColor: colors.border }]}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: colors.text }]}>{activities.length}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Activities</Text>
              </View>
              <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: colors.accent }]}>{favoriteCount}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Favorites</Text>
              </View>
              <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: colors.success }]}>{joinedCount}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Joined</Text>
              </View>
            </View>

            {/* Edit Button */}
            <CustomButton
              title="Edit Profile"
              icon="create-outline"
              variant="primary"
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.editBtn}
            />
          </View>
        </View>

        {/* Bio Section */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadows.soft,
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>About Me</Text>
          </View>
          <Text style={[styles.bioText, { color: colors.textSecondary }]}>
            {profile.bio || 'No bio written yet. Tap Edit Profile to add one.'}
          </Text>
        </View>

        {/* Contact Information */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
            shadows.soft,
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <Ionicons name="id-card-outline" size={20} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Contact & Details</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={[styles.contactIconBox, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="mail-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.contactTextCol}>
              <Text style={[styles.contactLabel, { color: colors.textMuted }]}>Email Address</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>{profile.email}</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={[styles.contactIconBox, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="call-outline" size={18} color={colors.success} />
            </View>
            <View style={styles.contactTextCol}>
              <Text style={[styles.contactLabel, { color: colors.textMuted }]}>Phone Number</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>{profile.phone}</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={[styles.contactIconBox, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="location-outline" size={18} color={colors.accent} />
            </View>
            <View style={styles.contactTextCol}>
              <Text style={[styles.contactLabel, { color: colors.textMuted }]}>Location</Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>{profile.location}</Text>
            </View>
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
  profileHeaderCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  bannerStrip: {
    height: 60,
    width: '100%',
  },
  headerBody: {
    padding: spacing.md,
    alignItems: 'center',
    marginTop: -40,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  universityText: {
    fontSize: 12,
    marginBottom: spacing.md,
  },
  metricsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: spacing.md,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: '100%',
  },
  editBtn: {
    width: '100%',
  },
  infoCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  bioText: {
    fontSize: 13,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactTextCol: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 11,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 1,
  },
});
