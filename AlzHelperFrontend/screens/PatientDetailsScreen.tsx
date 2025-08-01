import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Appbar, Text, Card, Chip, Button } from 'react-native-paper';
import { getPatientReports, deletePatient, getPatientNotes, addPatientNote } from '../api/patients';
import { getUserRole } from '../utils/tokenStorage';

const defaultPatientImage = require('../pictures/oldman.jpg');

const PatientDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { patient } = route.params;
  const [reports, setReports] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        setNotesLoading(true);
        
        // Get user role first
        const role = await getUserRole();
        console.log('User role:', role);
        setUserRole(role);
        
        // Fetch reports
        console.log('Fetching reports for patient:', patient._id);
        const reportsData = await getPatientReports(patient._id);
        console.log('Reports data:', reportsData);
        setReports(reportsData);
        
        // Fetch notes
        console.log('Fetching notes for patient:', patient._id);
        const notesData = await getPatientNotes(patient._id);
        console.log('Notes data:', notesData);
        setNotes(notesData);
        
      } catch (err: any) {
        console.error('Error in fetchData:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
        setNotesLoading(false);
      }
    };
    fetchData();
  }, [patient._id]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Patient',
      'Are you sure you want to delete this patient? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deletePatient(patient._id);
              navigation.goBack();
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to delete patient');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  const handleAddNote = () => {
    navigation.navigate('AddPatientNoteScreen', { patient });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Patient Details" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      <ScrollView>
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
        
        {userRole === 'doctor' && (
          <Button
            mode="contained"
            onPress={handleAddNote}
            style={[styles.addNoteButton, { backgroundColor: '#000' }]}
          >
            Add Note
          </Button>
        )}
        
        <Button
          mode="contained"
          onPress={handleDelete}
          loading={deleting}
          disabled={deleting}
          style={[styles.deleteButton, { backgroundColor: '#d32f2f' }]}
        >
          Delete Patient
        </Button>

        {/* Notes Section */}
        <Text style={styles.sectionTitle}>Doctor Notes</Text>
        {notesLoading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginVertical: 32 }} />
        ) : notes.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 16 }}>No notes found for this patient.</Text>
        ) : (
          notes.map((note, idx) => (
            <Card key={note._id || idx} style={styles.noteCard}>
              <Card.Content>
                <View style={styles.noteHeader}>
                  <Text style={styles.noteDate}>{new Date(note.createdAt).toLocaleDateString()}</Text>
                  {note.doctorId && (
                    <Text style={styles.doctorName}>
                      By: Dr. {note.doctorId.name}
                    </Text>
                  )}
                </View>
                <Text style={styles.noteText}>{note.comment}</Text>
              </Card.Content>
            </Card>
          ))
        )}

        <Text style={styles.sectionTitle}>Reports</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginVertical: 32 }} />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
        ) : reports.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#666', marginBottom: 16 }}>No reports found for this patient.</Text>
        ) : (
          reports.map((report, idx) => (
            <Card key={report._id || idx} style={styles.reportCard}>
              <Card.Content>
                <View style={styles.reportHeader}>
                  <Text style={styles.reportDate}>{new Date(report.createdAt).toLocaleDateString()}</Text>
                  {report.caregiverId && (
                    <Text style={styles.caregiverName}>
                      By: {report.caregiverId.first_name} {report.caregiverId.last_name}
                    </Text>
                  )}
                </View>
                {report.symptoms && report.symptoms.length > 0 && (
                  <View style={styles.symptomsList}>
                    {report.symptoms.map((symptom: any, symptomIdx: number) => (
                      <Chip
                        key={symptomIdx}
                        mode="outlined"
                        style={[
                          styles.symptomChip,
                          {
                            backgroundColor:
                              symptom.severity === 'severe' ? '#ffebee' :
                              symptom.severity === 'moderate' ? '#fff3e0' : '#f3e5f5'
                          }
                        ]}
                      >
                        {symptom.name} ({symptom.severity})
                      </Chip>
                    ))}
                  </View>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
    marginLeft: 24,
  },
  reportCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caregiverName: {
    fontSize: 14,
    color: '#666',
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    marginBottom: 8,
  },
  deleteButton: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  addNoteButton: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  noteCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: 14,
    color: '#666',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PatientDetailsScreen; 