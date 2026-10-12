/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/constants/defaultData.js
 * DESCRIPTION   : Default seeds for first-run bootstrap and fallback state
 * ============================================================================
 */

export const DEFAULT_PROFILE = {
  id: 'usr_mma301_01',
  name: 'Alex Nguyen',
  role: 'Mobile Software Engineer',
  bio: 'Passionate React Native developer passionate about clean UI, robust state flow, and creating memorable cross-platform mobile experiences.',
  email: 'alex.nguyen@fpt.edu.vn',
  phone: '+84 901 234 567',
  location: 'Ho Chi Minh City, Vietnam',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  university: 'FPT University',
  classCode: 'SE1801',
};

export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80',
];

export const CATEGORIES = [
  'All',
  'Technology',
  'Sports',
  'Arts & Design',
  'Academic',
  'Community',
];

export const DEFAULT_ACTIVITIES = [
  {
    id: 'act_01',
    title: 'React Native Workshop 2026',
    category: 'Technology',
    description: 'Deep dive into Expo SDK 57, React Native architecture, and modern state management patterns.',
    date: 'Oct 18, 2026',
    location: 'Innovation Lab A1, FPT University',
    isFavorite: true,
    isJoined: true,
    icon: 'code-slash',
    color: '#6366F1',
  },
  {
    id: 'act_02',
    title: 'Campus Badminton Championship',
    category: 'Sports',
    description: 'Annual intra-university badminton tournament for singles and doubles brackets.',
    date: 'Oct 22, 2026',
    location: 'Sports Hall B',
    isFavorite: false,
    isJoined: true,
    icon: 'fitness',
    color: '#10B981',
  },
  {
    id: 'act_03',
    title: 'UI/UX Design Sprint: Mobile First',
    category: 'Arts & Design',
    description: 'Collaborative workshop exploring Figma design systems, accessibility guidelines, and micro-interactions.',
    date: 'Oct 25, 2026',
    location: 'Design Studio 302',
    isFavorite: true,
    isJoined: false,
    icon: 'color-palette',
    color: '#EC4899',
  },
  {
    id: 'act_04',
    title: 'Mobile App Hackathon Kickoff',
    category: 'Technology',
    description: '48-hour challenge building AI-powered mobile solutions using Google Gemini API.',
    date: 'Nov 02, 2026',
    location: 'Main Auditorium',
    isFavorite: true,
    isJoined: true,
    icon: 'rocket',
    color: '#8B5CF6',
  },
  {
    id: 'act_05',
    title: 'Green Campus Tree Planting Day',
    category: 'Community',
    description: 'Volunteer activity planting 200 native trees and landscaping campus gardens.',
    date: 'Nov 07, 2026',
    location: 'Campus Botanical Garden',
    isFavorite: false,
    isJoined: false,
    icon: 'leaf',
    color: '#059669',
  },
  {
    id: 'act_06',
    title: 'Academic Seminar: Edge AI on Mobile',
    category: 'Academic',
    description: 'Keynote by guest researchers on on-device machine learning inference and quantization.',
    date: 'Nov 12, 2026',
    location: 'Hall C - Virtual Hybrid',
    isFavorite: false,
    isJoined: false,
    icon: 'school',
    color: '#F59E0B',
  },
];
