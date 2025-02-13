import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Theme constants -  Good practice to put these in a separate file
const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  background: '#f8fafc',
  white: '#ffffff',
  text: '#0f172a',
  textLight: '#64748b',
  border: '#e2e8f0',
  card: '#ffffff',
  taskBg: '#f1f5f9',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// --- Type Definitions ---
type SettingSectionProps = {
  title: string;
  children: React.ReactNode;
};

// This is a *key* improvement.  It ensures type safety for your icons.
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

type SettingItemProps = {
  icon: MaterialIconName;  // Use the type defined above
  title: string;
  value?: string; // Optional value
  onPress: () => void;
};

// --- Component Definitions ---

// SettingsSection Component
const SettingsSection = ({ title, children }: SettingSectionProps) => (
  <View style={styles.settingsSection}>
    <Text style={styles.settingsSectionTitle}>{title}</Text>
    {children}
  </View>
);

// SettingsItem Component
const SettingsItem = ({ icon, title, value, onPress }: SettingItemProps) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <MaterialIcons name={icon} size={24} color={COLORS.primary} />
      <Text style={styles.settingsItemTitle}>{title}</Text>
    </View>
    {value && <Text style={styles.settingsItemValue}>{value}</Text>}
    <MaterialIcons name="chevron-right" size={24} color={COLORS.textLight} />
  </TouchableOpacity>
);

// UserSettings Component (Main Export)
export default function UserSettings() {
  return (
    <ScrollView style={styles.tabContent}>
      <SettingsSection title="Subscription">
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Premium Plan</Text>
          <Text style={styles.subscriptionExpiry}>Expires in 45 days</Text>
          <LinearGradient
            colors={['#2563eb', '#1d4ed8']}
            style={styles.subscriptionProgress}
          >
            <View style={[styles.progressBar, { width: '75%' }]} />
          </LinearGradient>
        </View>
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsItem
          icon="palette"
          title="Theme"
          value="Light"
          onPress={() => {}}
        />
        <SettingsItem
          icon="notifications"
          title="Notifications"
          onPress={() => {}}
        />
        <SettingsItem
          icon="language"
          title="Language"
          value="English"
          onPress={() => {}}
        />
      </SettingsSection>

      <SettingsSection title="Account">
        <SettingsItem
          icon="person"
          title="Personal Information"
          onPress={() => {}}
        />
        <SettingsItem
          icon="security"
          title="Security"
          onPress={() => {}}
        />
        <SettingsItem
          icon="description"
          title="Terms & Conditions"
          onPress={() => {}}
        />
      </SettingsSection>
    </ScrollView>
  );
}

// --- Styles ---

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    padding: SPACING.md,
  },
  settingsSection: {
    marginBottom: SPACING.lg,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  subscriptionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  subscriptionExpiry: {
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  subscriptionProgress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },

  // progress bar card
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },


  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.border,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemTitle: {
    marginLeft: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  settingsItemValue: {
    marginRight: SPACING.md,
    color: COLORS.textLight,
  },
});