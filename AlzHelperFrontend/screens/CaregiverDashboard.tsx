import React from 'react';
import { View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { removeToken } from '../utils/tokenStorage';

const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    age: 78,
    condition: 'Stable',
    image: require('../pictures/oldman.jpg'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 82,
    condition: 'Needs Attention',
    image: require('../pictures/oldwoman.jpg'),
  },
];

const CaregiverDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = async () => {
    await removeToken();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderPatient = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image source={item.image} style={styles.patientImage} />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text>Age: {item.age}</Text>
          <Text>Condition: {item.condition}</Text>
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
        <FlatList
          data={mockPatients}
          renderItem={renderPatient}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          style={styles.patientList}
        />
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