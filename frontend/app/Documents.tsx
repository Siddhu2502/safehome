import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Theme constants (You'll likely have these defined elsewhere in your project)
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

// Mock Data (Keep this consistent with your main app)
const mockDocuments = [
  { id: 1, name: 'ID Proof', status: 'uploaded', lastUpdate: '2024-02-01' },
  { id: 2, name: 'Address Proof', status: 'pending', lastUpdate: null },
  { id: 3, name: 'Work Contract', status: 'uploaded', lastUpdate: '2024-01-15' },
  { id: 4, name: 'Insurance Documents', status: 'pending', lastUpdate: null },
];

type PropsDocItem = {
    document: { id: number; name: string; status: string; lastUpdate: string | null };
};

// Documents Tab Components (Refactored for reusability)
const DocumentItem = ({ document }: PropsDocItem) => (
  <View style={styles.documentItem}>
    <View style={styles.documentInfo}>
      <MaterialIcons
        name={document.status === 'uploaded' ? 'check-circle' : 'pending'}
        size={24}
        color={document.status === 'uploaded' ? COLORS.success : COLORS.warning}
      />
      <View style={styles.documentDetails}>
        <Text style={styles.documentName}>{document.name}</Text>
        <Text style={styles.documentStatus}>
          {document.status === 'uploaded'
            ? `Last updated: ${document.lastUpdate}`
            : 'Pending upload'}
        </Text>
      </View>
    </View>
    <TouchableOpacity style={styles.updateButton}>
      <Text style={styles.updateButtonText}>
        {document.status === 'uploaded' ? 'Update' : 'Upload'}
      </Text>
    </TouchableOpacity>
  </View>
);


export default function Documents() {
  return (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Required Documents</Text>
      {mockDocuments.map(document => (
        <DocumentItem key={document.id} document={document} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        padding: SPACING.md,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.md, // Add marginBottom for spacing
      },
      documentItem: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      documentDetails: {
        marginLeft: SPACING.md,
      },
      documentName: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
      },
      documentStatus: {
        fontSize: 12,
        color: COLORS.textLight,
      },
      updateButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 8,
      },
      updateButtonText: {
        color: COLORS.white,
        fontWeight: '500',
      },
});