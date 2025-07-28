import { StyleSheet } from 'react-native';

// Color palette
export const colors = {
  primary: '#2C3E50',      // Dark blue-gray
  secondary: '#3498DB',    // Blue
  accent: '#E74C3C',       // Red for alerts
  success: '#27AE60',      // Green
  warning: '#F39C12',      // Orange
  background: '#F8F9FA',   // Light gray background
  surface: '#FFFFFF',       // White cards
  text: {
    primary: '#2C3E50',    // Dark text
    secondary: '#7F8C8D',  // Gray text
    light: '#BDC3C7',      // Light gray text
  },
  border: '#E9ECEF',       // Light border
  shadow: '#000000',       // Shadow color
};

// Typography
export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text.primary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  small: {
    fontSize: 12,
    color: colors.text.light,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Shared component styles
export const sharedStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  
  // Header styles
  header: {
    backgroundColor: colors.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  
  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  // Button styles
  button: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonDanger: {
    backgroundColor: colors.accent,
  },
  
  // Text styles
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  bodyText: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  captionText: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  
  // List styles
  listItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  
  // Form styles
  input: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  
  // Status indicators
  statusChip: {
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusSevere: {
    backgroundColor: '#FFEBEE',
  },
  statusModerate: {
    backgroundColor: '#FFF3E0',
  },
  statusMild: {
    backgroundColor: '#F3E5F5',
  },
  
  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.text.secondary,
  },
}); 