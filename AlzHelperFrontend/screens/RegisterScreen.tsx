import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { registerCaregiver, registerDoctor } from '../api/auth';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [role, setRole] = useState<'caregiver' | 'doctor'>('caregiver');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState(''); // for doctor
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (role === 'caregiver') {
        await registerCaregiver(firstName, lastName, email, phone, password);
      } else {
        await registerDoctor(name, email, phone, password);
      }
      setSuccess('Registration successful! You can now log in.');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <RadioButton.Group onValueChange={value => setRole(value as 'caregiver' | 'doctor')} value={role}>
        <View style={styles.radioRow}>
          <RadioButton value="caregiver" />
          <Text>Caregiver</Text>
          <RadioButton value="doctor" />
          <Text>Doctor</Text>
        </View>
      </RadioButton.Group>
      {role === 'caregiver' ? (
        <>
          <TextInput label="First Name" value={firstName} onChangeText={setFirstName} style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
          <TextInput label="Last Name" value={lastName} onChangeText={setLastName} style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
        </>
      ) : (
        <TextInput label="Name" value={name} onChangeText={setName} style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
      )}
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
      <TextInput label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={[styles.input, { backgroundColor: '#f0f0f0' }]} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <Button mode="contained" onPress={handleRegister} loading={loading} disabled={loading} style={[styles.button, { backgroundColor: '#000' }]}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={styles.link} labelStyle={{ color: '#000' }}>
        Back to Login
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  button: { marginTop: 16 },
  link: { marginTop: 8 },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
  success: { color: 'green', marginBottom: 16, textAlign: 'center' },
});

export default RegisterScreen;
