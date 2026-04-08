import { ThemeMode } from '@/store/useAppStore';

export type ThemePalette = {
  background: string;
  card: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  secondary: string;
};

const THEMES: Record<ThemeMode, ThemePalette> = {
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#1A1A1A',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    primary: '#2563EB',
    secondary: '#16A34A'
  },
  deepBlue: {
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    mutedText: '#94A3B8',
    border: '#334155',
    primary: '#3B82F6',
    secondary: '#22C55E'
  },
  dark: {
    background: '#000000',
    card: '#121212',
    text: '#EDEDED',
    mutedText: '#A3A3A3',
    border: '#262626',
    primary: '#2563EB',
    secondary: '#16A34A'
  }
};

export const getTheme = (mode: ThemeMode): ThemePalette => THEMES[mode];
