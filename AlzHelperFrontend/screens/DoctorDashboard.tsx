import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { removeToken } from '../utils/tokenStorage';
import { getAllPatients } from '../api/patients';
import { sharedStyles, colors, typography, spacing, shadows } from '../utils/sharedStyles';

const defaultPatientImage = require('../pictures/oldman.jpg');

const DoctorDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPatients = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [fetchPatients])
  );

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderPatient = ({ item }: any) => (
    <Card style={styles.patientCard} onPress={() => navigation.navigate('PatientDetailsScreen', { patient: item })}>
      <Card.Content style={styles.patientRow}>
        <Image
          source={item.picture ? { uri: item.picture } : defaultPatientImage}
          style={styles.patientImage}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientDetails}>Age: {item.age}</Text>
          <Text style={styles.patientDetails}>Gender: {item.gender}</Text>
          <Text style={styles.patientDetails}>Contact: {item.contact}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={sharedStyles.container}>
      <Appbar.Header style={sharedStyles.header}>
        <Appbar.Content 
          title="AlzHelper" 
          subtitle="Doctor Dashboard"
          titleStyle={sharedStyles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
        />
        <Appbar.Action icon="logout" color={colors.text.primary} onPress={handleLogout} />
      </Appbar.Header>
      
      <ScrollView style={sharedStyles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome, Doctor</Text>
          <Text style={styles.subtitleText}>Manage your patients and their care</Text>
        </View>

        <View style={styles.statsSection}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text style={styles.statsNumber}>{patients.length}</Text>
              <Text style={styles.statsLabel}>Total Patients</Text>
            </Card.Content>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Patient Overview</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading patients...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={patients}
            renderItem={renderPatient}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            style={styles.patientList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No patients found.</Text>
                <Text style={styles.emptySubtext}>Add your first patient to get started</Text>
              </View>
            }
          />
        )}
        
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('ViewReportsScreen')}
            icon="file-document"
          >
            View Reports
          </Button>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: colors.secondary }]}
            onPress={() => navigation.navigate('AddPatientScreen')}
            icon="account-plus"
          >
            Add Patient
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSubtitle: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  headerSection: {
    marginBottom: spacing.lg,
  },
  welcomeText: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitleText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  statsSection: {
    marginBottom: spacing.lg,
  },
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    ...shadows.sm,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  statsLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    ...typography.caption,
    marginTop: spacing.sm,
    color: colors.text.secondary,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  errorText: {
    color: colors.accent,
    textAlign: 'center',
    ...typography.caption,
  },
  patientList: {
    marginBottom: spacing.lg,
  },
  patientCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: spacing.md 
  },
  patientInfo: { 
    flex: 1 
  },
  patientName: { 
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  patientDetails: { 
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.caption,
    color: colors.text.light,
  },
  actionButtons: {
    marginBottom: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.sm,
    borderRadius: 8,
  },
});

export default DoctorDashboard; 