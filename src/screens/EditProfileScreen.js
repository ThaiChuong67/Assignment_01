/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/screens/EditProfileScreen.js
 * DESCRIPTION   : Controlled Form Screen for editing user profile with strict
 *                 validation rules, instant state sync, and cancel guards.
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useProfile } from '../contexts/ProfileContext';
import { AVATAR_PRESETS } from '../constants/defaultData';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function EditProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  // Controlled form state initialized with current profile
  const [name, setName] = useState(profile.name || '');
  const [role, setRole] = useState(profile.role || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [location, setLocation] = useState(profile.location || '');
  const [avatar, setAvatar] = useState(profile.avatar || AVATAR_PRESETS[0]);

  // Validation error state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if form has unsaved modifications
  const isDirty =
    name !== (profile.name || '') ||
    role !== (profile.role || '') ||
    bio !== (profile.bio || '') ||
    email !== (profile.email || '') ||
    phone !== (profile.phone || '') ||
    location !== (profile.location || '') ||
    avatar !== (profile.avatar || '');

  // Validation engine
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    // Role validation
    if (!role.trim()) {
      newErrors.role = 'Role / Title is required';
    }

    // Bio validation (Rubric requirement: minimum length check)
    if (!bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (bio.trim().length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. user@fpt.edu.vn)';
    }

    // Phone validation
    const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Phone must contain 8-20 digits';
    }

    // Location validation
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert(
        'Validation Error',
        'Please correct the highlighted errors before saving.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        avatar: avatar.trim(),
      });

      Alert.alert('Success', 'Your profile has been successfully updated!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved edits. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Form',
      'Reset all inputs back to your previously saved profile values?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setName(profile.name || '');
            setRole(profile.role || '');
            setBio(profile.bio || '');
            setEmail(profile.email || '');
            setPhone(profile.phone || '');
            setLocation(profile.location || '');
            setAvatar(profile.avatar || AVATAR_PRESETS[0]);
            setErrors({});
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Action Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleCancel} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <Ionicons name="refresh" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Avatar Preview & Preset Selection */}
          <View
            style={[
              styles.avatarSection,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
          >
            <Text style={[styles.sectionSubtitle, { color: colors.text }]}>Avatar</Text>
            <Image
              source={{ uri: avatar || AVATAR_PRESETS[0] }}
              style={[styles.largeAvatar, { borderColor: colors.primary }]}
            />

            <Text style={[styles.presetLabel, { color: colors.textSecondary }]}>
              Choose from presets or edit URL below:
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.presetRow}
            >
              {AVATAR_PRESETS.map((presetUrl, idx) => {
                const isSelected = avatar === presetUrl;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setAvatar(presetUrl)}
                    style={[
                      styles.presetThumbWrapper,
                      {
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderWidth: isSelected ? 2.5 : 1,
                      },
                    ]}
                  >
                    <Image source={{ uri: presetUrl }} style={styles.presetThumb} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Form Inputs */}
          <View
            style={[
              styles.formCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadows.soft,
            ]}
          >
            {/* Full Name */}
            <CustomInput
              label="Full Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
              placeholder="e.g. Alex Nguyen"
              icon="person-outline"
              error={errors.name}
            />

            {/* Role / Title */}
            <CustomInput
              label="Role / Major"
              value={role}
              onChangeText={(text) => {
                setRole(text);
                if (errors.role) setErrors((prev) => ({ ...prev, role: null }));
              }}
              placeholder="e.g. Mobile Software Engineer"
              icon="briefcase-outline"
              error={errors.role}
            />

            {/* Bio */}
            <CustomInput
              label="Bio (Minimum 10 characters)"
              value={bio}
              onChangeText={(text) => {
                setBio(text);
                if (errors.bio) setErrors((prev) => ({ ...prev, bio: null }));
              }}
              placeholder="Tell us a little bit about yourself and your passions..."
              multiline={true}
              numberOfLines={4}
              error={errors.bio}
              helperText={`${bio.length} characters`}
            />

            {/* Email */}
            <CustomInput
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              placeholder="e.g. alex.nguyen@fpt.edu.vn"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              error={errors.email}
            />

            {/* Phone */}
            <CustomInput
              label="Phone Number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
              }}
              placeholder="e.g. +84 901 234 567"
              keyboardType="phone-pad"
              icon="call-outline"
              error={errors.phone}
            />

            {/* Location */}
            <CustomInput
              label="Location"
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                if (errors.location) setErrors((prev) => ({ ...prev, location: null }));
              }}
              placeholder="e.g. Ho Chi Minh City, Vietnam"
              icon="location-outline"
              error={errors.location}
            />
          </View>

          {/* Action Buttons: Save & Cancel */}
          <View style={styles.actionRow}>
            <CustomButton
              title="Cancel"
              variant="secondary"
              onPress={handleCancel}
              style={{ flex: 1, marginRight: 8 }}
            />
            <CustomButton
              title="Save Changes"
              variant="primary"
              icon="checkmark-sharp"
              loading={isSubmitting}
              onPress={handleSave}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  resetBtn: {
    padding: 6,
  },
  avatarSection: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  largeAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    marginBottom: 10,
  },
  presetLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  presetRow: {
    gap: 10,
    paddingVertical: 4,
  },
  presetThumbWrapper: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  presetThumb: {
    width: 44,
    height: 44,
  },
  formCard: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
});
