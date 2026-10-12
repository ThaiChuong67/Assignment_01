/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/components/AddActivityModal.js
 * DESCRIPTION   : Modal form for adding new activity with validation
 * ============================================================================
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { CATEGORIES } from '../constants/defaultData';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function AddActivityModal({ visible, onClose, onAdd }) {
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  const availableCategories = CATEGORIES.filter((c) => c !== 'All');

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title cannot be blank';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must have at least 3 characters';
    }

    if (!description.trim()) {
      errs.description = 'Description cannot be blank';
    } else if (description.trim().length < 8) {
      errs.description = 'Description must have at least 8 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onAdd({
      title: title.trim(),
      category,
      description: description.trim(),
      location: location.trim() || 'Online / Campus',
      date: 'Today',
      icon: category === 'Technology' ? 'code-slash' : category === 'Sports' ? 'fitness' : 'bookmark',
      color: colors.primary,
    });

    // Reset & close
    setTitle('');
    setCategory('Technology');
    setDescription('');
    setLocation('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={[styles.modalSheet, { backgroundColor: colors.surface, borderColor: colors.border }, shadows.medium]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>Add New Activity</Text>
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                Create an interest or campus event
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={[styles.closeBtn, { backgroundColor: colors.surfaceSubtle }]}>
              <Ionicons name="close" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
            {/* Title */}
            <CustomInput
              label="Activity Title"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              placeholder="e.g. AI Hackathon 2026"
              icon="sparkles-outline"
              error={errors.title}
            />

            {/* Category Select Chips */}
            <Text style={[styles.categoryLabel, { color: colors.text }]}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {availableCategories.map((cat) => {
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.surfaceSubtle,
                        borderColor: isSelected ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Description */}
            <CustomInput
              label="Description"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
              }}
              placeholder="Provide a brief summary of the activity/interest..."
              multiline={true}
              numberOfLines={3}
              error={errors.description}
            />

            {/* Location */}
            <CustomInput
              label="Location (Optional)"
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. Lab 401, FPT University"
              icon="location-outline"
            />

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <CustomButton
                title="Cancel"
                variant="secondary"
                onPress={handleClose}
                style={{ flex: 1, marginRight: 8 }}
              />
              <CustomButton
                title="Save Activity"
                variant="primary"
                icon="checkmark"
                onPress={handleSave}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderTopWidth: 1,
    maxHeight: '85%',
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContent: {
    paddingBottom: spacing.lg,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipRow: {
    gap: 8,
    marginBottom: spacing.md,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
});
