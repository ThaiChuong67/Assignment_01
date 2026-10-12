/**
 * ============================================================================
 * PROJECT       : Assignment 1 - Profile & Activity App
 * COURSE        : MMA301 - Multiplatform Mobile App Development
 * FILE          : src/styles/theme.js
 * DESCRIPTION   : Design system tokens for Light and Dark theme modes
 * ============================================================================
 */

export const lightColors = {
  primary: '#6366F1',       // Indigo
  primaryLight: '#EEF2FF',
  secondary: '#0EA5E9',     // Sky
  secondaryLight: '#E0F2FE',
  accent: '#F43F5E',        // Rose
  accentLight: '#FFE4E6',
  success: '#10B981',       // Emerald
  successLight: '#D1FAE5',
  warning: '#F59E0B',       // Amber
  background: '#F8FAFC',    // Slate 50
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9', // Slate 100
  text: '#0F172A',          // Slate 900
  textSecondary: '#64748B', // Slate 500
  textMuted: '#94A3B8',     // Slate 400
  border: '#E2E8F0',        // Slate 200
  borderFocused: '#6366F1',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  card: '#FFFFFF',
  statusBar: 'dark-content',
};

export const darkColors = {
  primary: '#818CF8',       // Lighter Indigo
  primaryLight: '#312E81',
  secondary: '#38BDF8',
  secondaryLight: '#0C4A6E',
  accent: '#FB7185',
  accentLight: '#881337',
  success: '#34D399',
  successLight: '#064E3B',
  warning: '#FBBF24',
  background: '#0B0F19',    // Deep slate
  surface: '#1E293B',       // Slate 800
  surfaceSubtle: '#0F172A', // Slate 900
  text: '#F8FAFC',          // Slate 50
  textSecondary: '#94A3B8', // Slate 400
  textMuted: '#64748B',     // Slate 500
  border: '#334155',        // Slate 700
  borderFocused: '#818CF8',
  error: '#F87171',
  errorLight: '#7F1D1D',
  card: '#1E293B',
  statusBar: 'light-content',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 26, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '700' },
  h3: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  bodyBold: { fontSize: 14, fontWeight: '600' },
  caption: { fontSize: 12, fontWeight: '400' },
  captionBold: { fontSize: 12, fontWeight: '600' },
};

export const shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  glow: (color = '#6366F1') => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  }),
};
