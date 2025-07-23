import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';

const mockPatients = [
  { id: '1', name: 'John Doe', age: 78, condition: 'Stable' },
  { id: '2', name: 'Jane Smith', age: 82, condition: 'Needs Attention' },
];

const CaregiverDashboard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleLogout = () => {
    // TODO: Clear token if using token storage
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderPatient = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text>Age: {item.age}</Text>
        <Text>Condition: {item.condition}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Caregiver Dashboard" titleStyle={{ color: '#000' }} />
        <Appbar.Action icon="logout" color="#000" onPress={handleLogout} />
      </Appbar.Header>
      <FlatList
        data={mockPatients}
        renderItem={renderPatient}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <Button mode="contained" style={[styles.button, { backgroundColor: '#000' }]} onPress={() => {}}>
        Add New Symptom
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#fff', elevation: 0 },
  list: { padding: 16 },
  card: { marginBottom: 16, backgroundColor: '#f0f0f0' },
  patientName: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  button: { margin: 16 },
});

export default CaregiverDashboard; 