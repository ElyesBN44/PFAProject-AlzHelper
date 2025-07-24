import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton } from 'react-native-paper';
import axios from 'axios';

const BASE_URL = 'https://0edc3cf12e4c.ngrok-free.app/api';

const AddPatientScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [contact, setContact] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !age.trim() || !gender || !contact.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${BASE_URL}/patient`, {
        name: name.trim(),
        age: Number(age),
        gender,
        contact: contact.trim(),
        picture: picture.trim() || undefined,
      });
      navigation.goBack();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add patient');
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
  button: { marginTop: 16 },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});

export default AddPatientScreen; 