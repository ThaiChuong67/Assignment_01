/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/screens/ActivityScreen.js
 * DESCRIPTION   : Activities & Interests collection screen with FlatList,
 *                 search filter, category filter, pull-to-refresh & empty state.
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useActivities } from '../contexts/ActivityContext';
import { CATEGORIES } from '../constants/defaultData';
import ActivityItem from '../components/ActivityItem';
import EmptyState from '../components/EmptyState';
import AddActivityModal from '../components/AddActivityModal';
import { borderRadius, spacing, shadows } from '../styles/theme';

export default function ActivityScreen() {
  const { colors } = useTheme();
  const {
    activities,
    refreshing,
    refreshActivities,
    toggleFavorite,
    toggleJoined,
    addActivity,
    deleteActivity,
  } = useActivities();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Derived filtered collection
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Favorites match
      const matchesFavorite = !favoritesOnly || item.isFavorite;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query));

      return matchesCategory && matchesFavorite && matchesSearch;
    });
  }, [activities, selectedCategory, favoritesOnly, searchQuery]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header & Search Bar */}
      <View style={styles.headerArea}>
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Activities & Interests</Text>
            <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
              {activities.length} total • {filteredActivities.length} visible
            </Text>
          </View>

          {/* Add Activity Button */}
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }, shadows.soft]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar Input */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search-outline" size={18} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search activities, keywords, locations..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills: Categories & Favorites */}
        <View style={styles.filtersWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {/* Favorites Toggle Pill */}
            <TouchableOpacity
              onPress={() => setFavoritesOnly((prev) => !prev)}
              style={[
                styles.filterPill,
                {
                  backgroundColor: favoritesOnly ? colors.accentLight : colors.surface,
                  borderColor: favoritesOnly ? colors.accent : colors.border,
                },
              ]}
            >
              <Ionicons
                name={favoritesOnly ? 'heart' : 'heart-outline'}
                size={14}
                color={favoritesOnly ? colors.accent : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.filterPillText,
                  { color: favoritesOnly ? colors.accent : colors.textSecondary },
                ]}
              >
                Favorites
              </Text>
            </TouchableOpacity>

            {/* Category Pills */}
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.filterPill,
                    {
                      backgroundColor: isSelected ? colors.primary : colors.surface,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      { color: isSelected ? '#FFFFFF' : colors.textSecondary },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* FlatList Collection */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityItem
            item={item}
            onToggleFavorite={toggleFavorite}
            onToggleJoined={toggleJoined}
            onDelete={deleteActivity}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshActivities}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No Activities Found"
            message={
              searchQuery || selectedCategory !== 'All' || favoritesOnly
                ? 'No activities match your current search/filter settings. Try clearing the filter or adding a new activity.'
                : 'Your activity list is currently empty.'
            }
            actionTitle={
              searchQuery || selectedCategory !== 'All' || favoritesOnly
                ? 'Clear Filters'
                : 'Add Activity'
            }
            onActionPress={() => {
              if (searchQuery || selectedCategory !== 'All' || favoritesOnly) {
                setSearchQuery('');
                setSelectedCategory('All');
                setFavoritesOnly(false);
              } else {
                setModalVisible(true);
              }
            }}
          />
        }
      />

      {/* Add Activity Modal */}
      <AddActivityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addActivity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerArea: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  screenSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 42,
    marginBottom: spacing.xs,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  filtersWrapper: {
    paddingVertical: spacing.xs,
  },
  categoryScroll: {
    gap: 8,
    paddingVertical: 4,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
});
