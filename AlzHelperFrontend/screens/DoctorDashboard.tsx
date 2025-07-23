import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, Card, Button, Avatar } from 'react-native-paper';
import { removeToken } from '../utils/tokenStorage';

const DoctorDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = async () => {
    await removeToken();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Doctor Dashboard" titleStyle={{ color: '#000' }} />
        <Appbar.Action icon="logout" color="#000" onPress={handleLogout} />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Patient Overview</Text>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.patientRow}>
              <Avatar.Text size={50} label="JD" style={styles.avatar} />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>John Doe</Text>
                <Text style={styles.patientDetails}>Age: 72 | Stage: Early</Text>
                <Text style={styles.lastVisit}>Last Visit: 2 days ago</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.patientRow}>
              <Avatar.Text size={50} label="MS" style={styles.avatar} />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>Mary Smith</Text>
                <Text style={styles.patientDetails}>Age: 68 | Stage: Moderate</Text>
                <Text style={styles.lastVisit}>Last Visit: 1 week ago</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.patientRow}>
              <Avatar.Text size={50} label="RJ" style={styles.avatar} />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>Robert Johnson</Text>
                <Text style={styles.patientDetails}>Age: 75 | Stage: Early</Text>
                <Text style={styles.lastVisit}>Last Visit: 3 days ago</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
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
            onPress={() => {/* TODO: Navigate to add patient */}}
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
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#000',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  lastVisit: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
});

export default DoctorDashboard; 