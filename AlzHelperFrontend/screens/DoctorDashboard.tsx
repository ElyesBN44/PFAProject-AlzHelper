import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { removeToken } from '../utils/tokenStorage';
import { getAllPatients } from '../api/patients';

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
    <Card style={styles.card} onPress={() => navigation.navigate('PatientDetailsScreen', { patient: item })}>
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
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Doctor Dashboard" titleStyle={{ color: '#000' }} />
        <Appbar.Action icon="logout" color="#000" onPress={handleLogout} />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Patient Overview</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginVertical: 32 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
        ) : (
          <FlatList
            data={patients}
            renderItem={renderPatient}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            style={styles.patientList}
            ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#666' }}>No patients found.</Text>}
          />
        )}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: '#000' }]}
            onPress={() => navigation.navigate('ViewReportsScreen')}
          >
            View Reports
          </Button>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: '#000' }]}
            onPress={() => navigation.navigate('AddPatientScreen')}
          >
            Add Patient
          </Button>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: '#000' }]}
            onPress={() => {/* TODO: Navigate to analytics */}}
          >
            Analytics
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  patientList: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  patientImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  patientInfo: { flex: 1 },
  patientName: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  patientDetails: { fontSize: 14, color: '#666', marginBottom: 2 },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default DoctorDashboard; 