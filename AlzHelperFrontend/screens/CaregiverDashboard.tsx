import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { removeToken } from '../utils/tokenStorage';
import { getAllPatients } from '../api/patients';

const defaultPatientImage = require('../pictures/oldman.jpg'); // fallback image

const CaregiverDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setError('');
        const data = await getAllPatients();
        setPatients(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load patients');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderPatient = ({ item }: any) => (
    <Card style={styles.card} onPress={() => navigation.navigate('PatientDetailsScreen', { patient: item })}>
      <Card.Content style={styles.cardContent}>
        <Image
          source={item.picture ? { uri: item.picture } : defaultPatientImage}
          style={styles.patientImage}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text>Age: {item.age}</Text>
          <Text>Gender: {item.gender}</Text>
          <Text>Contact: {item.contact}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Caregiver Dashboard" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
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
            onPress={() => navigation.navigate('AddReportScreen')}
          >
            Add New Symptom
          </Button>
          <Button 
            mode="contained" 
            style={[styles.actionButton, { backgroundColor: '#000' }]}
            onPress={() => {/* TODO: Navigate to view reports */}}
          >
            View Reports
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#fff', elevation: 0 },
  content: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  patientList: {
    marginBottom: 16,
  },
  card: { marginBottom: 16, backgroundColor: '#f0f0f0' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  patientImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  patientInfo: { flex: 1 },
  patientName: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default CaregiverDashboard; 