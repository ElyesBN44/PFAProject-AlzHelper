import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton, Menu } from 'react-native-paper';
import { createPatient } from '../api/patients';
import { getAllDoctors } from '../api/doctors';
import { getUserRole } from '../utils/tokenStorage';

const AddPatientScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [contact, setContact] = useState('');
  const [picture, setPicture] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const loadUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      
      // If user is caregiver, load doctors
      if (role === 'caregiver') {
        try {
          const doctorsData = await getAllDoctors();
          setDoctors(doctorsData);
        } catch (err: any) {
          setError('Failed to load doctors: ' + err.message);
        }
      }
    };
    loadUserRole();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !age.trim() || !gender || !contact.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // For caregivers, require doctor selection
    if (userRole === 'caregiver' && !selectedDoctor) {
      setError('Please select a doctor to assign this patient to.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const patientData: any = {
        name: name.trim(),
        age: Number(age),
        gender,
        contact: contact.trim(),
        picture: picture.trim() || undefined,
      };

      // Add assignedDoctorId for caregivers
      if (userRole === 'caregiver' && selectedDoctor) {
        patientData.assignedDoctorId = selectedDoctor._id;
      }

      await createPatient(patientData);
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Patient" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      <ScrollView style={styles.content}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.radioRow}>
            <RadioButton value="male" /><Text>Male</Text>
            <RadioButton value="female" /><Text>Female</Text>
            <RadioButton value="other" /><Text>Other</Text>
          </View>
        </RadioButton.Group>
        <TextInput
          label="Contact"
          value={contact}
          onChangeText={setContact}
          style={styles.input}
        />
        <TextInput
          label="Picture URL (optional)"
          value={picture}
          onChangeText={setPicture}
          style={styles.input}
        />
        {userRole === 'caregiver' && (
          <View style={styles.doctorSelection}>
            <Text style={styles.label}>Assign to Doctor</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={styles.doctorButton}
                >
                  {selectedDoctor ? `${selectedDoctor.name} (${selectedDoctor.email})` : 'Select a doctor'}
                </Button>
              }
            >
              {doctors.map((doctor) => (
                <Menu.Item
                  key={doctor._id}
                  onPress={() => {
                    setSelectedDoctor(doctor);
                    setMenuVisible(false);
                  }}
                  title={`${doctor.name} (${doctor.email})`}
                />
              ))}
            </Menu>
          </View>
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={[styles.button, { backgroundColor: '#000' }]}
        >
          Add Patient
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#fff', elevation: 0 },
  content: { flex: 1, padding: 16 },
  input: { marginBottom: 16, backgroundColor: '#f0f0f0' },
  label: { fontSize: 16, marginBottom: 8 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  doctorSelection: { marginBottom: 16 },
  doctorButton: { marginTop: 8 },
  button: { marginTop: 16 },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});

export default AddPatientScreen; 