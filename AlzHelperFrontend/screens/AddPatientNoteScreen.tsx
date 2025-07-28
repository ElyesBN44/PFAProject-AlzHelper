import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, Card } from 'react-native-paper';
import { addPatientNote } from '../api/patients';

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
}

interface AddPatientNoteScreenProps {
  navigation: any;
  route: {
    params: {
      patient: Patient;
    };
  };
}

const AddPatientNoteScreen: React.FC<AddPatientNoteScreenProps> = ({ navigation, route }) => {
  const { patient } = route.params;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      // TODO: Show error message
      return;
    }

    setLoading(true);
    try {
      await addPatientNote(patient._id, comment.trim());
      // TODO: Show success message
      navigation.goBack();
    } catch (error: any) {
      console.error('Error adding note:', error.message);
      // TODO: Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Patient Note" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        
        <Card style={styles.patientCard}>
          <Card.Content>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientDetails}>Age: {patient.age}</Text>
            <Text style={styles.patientDetails}>Gender: {patient.gender}</Text>
            <Text style={styles.patientDetails}>Contact: {patient.contact}</Text>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Add Your Note</Text>
        
        <TextInput
          label="Doctor's Note"
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={6}
          style={styles.input}
          placeholder="Enter your medical notes, observations, or recommendations..."
        />
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !comment.trim()}
          style={[styles.submitButton, { backgroundColor: '#000' }]}
        >
          Add Note
        </Button>
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
  patientCard: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  patientDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    marginTop: 16,
  },
});

export default AddPatientNoteScreen; 