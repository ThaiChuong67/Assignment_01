/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/contexts/ActivityContext.js
 * DESCRIPTION   : Context provider managing activities/interests collection,
 *                 filtering, interactions, and persistence.
 * ============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { DEFAULT_ACTIVITIES } from '../constants/defaultData';

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function hydrateActivities() {
      try {
        const stored = await storageService.getActivities();
        setActivities(stored);
      } catch (err) {
        console.warn('Error hydrating activities:', err);
        setActivities(DEFAULT_ACTIVITIES);
      } finally {
        setIsLoading(false);
      }
    }
    hydrateActivities();
  }, []);

  const toggleFavorite = async (id) => {
    const updated = activities.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setActivities(updated);
    await storageService.saveActivities(updated);
  };

  const toggleJoined = async (id) => {
    const updated = activities.map((item) =>
      item.id === id ? { ...item, isJoined: !item.isJoined } : item
    );
    setActivities(updated);
    await storageService.saveActivities(updated);
  };

  const addActivity = async (newActivity) => {
    const itemWithId = {
      ...newActivity,
      id: `act_${Date.now()}`,
      isFavorite: false,
      isJoined: false,
    };
    const updated = [itemWithId, ...activities];
    setActivities(updated);
    await storageService.saveActivities(updated);
    return itemWithId;
  };

  const deleteActivity = async (id) => {
    const updated = activities.filter((item) => item.id !== id);
    setActivities(updated);
    await storageService.saveActivities(updated);
  };

  const refreshActivities = async () => {
    setRefreshing(true);
    try {
      const stored = await storageService.getActivities();
      setActivities(stored);
    } catch (err) {
      console.warn('Error refreshing activities:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const resetActivities = async () => {
    setActivities(DEFAULT_ACTIVITIES);
    await storageService.saveActivities(DEFAULT_ACTIVITIES);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        isLoading,
        refreshing,
        toggleFavorite,
        toggleJoined,
        addActivity,
        deleteActivity,
        refreshActivities,
        resetActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
};
