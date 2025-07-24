import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, Card } from 'react-native-paper';

const defaultPatientImage = require('../pictures/oldman.jpg');

const PatientDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Patient Details" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={patient.picture ? { uri: patient.picture } : defaultPatientImage}
            style={styles.patientImage}
          />
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text>Age: {patient.age}</Text>
            <Text>Gender: {patient.gender}</Text>
            <Text>Contact: {patient.contact}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#fff', elevation: 0 },
  card: { margin: 24, backgroundColor: '#f0f0f0' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  patientImage: { width: 100, height: 100, borderRadius: 50, marginRight: 24 },
  patientInfo: { flex: 1 },
  patientName: { fontWeight: 'bold', fontSize: 24, marginBottom: 8 },
});

export default PatientDetailsScreen; 