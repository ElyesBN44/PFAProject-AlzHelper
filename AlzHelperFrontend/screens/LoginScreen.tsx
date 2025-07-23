import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { loginCaregiver, loginDoctor } from '../api/auth';
import { saveToken } from '../utils/tokenStorage';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'caregiver' | 'doctor'>('caregiver');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (role === 'caregiver') {
        response = await loginCaregiver(email, password);
      } else {
        response = await loginDoctor(email, password);
      }
      // Log the token for now
      console.log('Token:', response.token);
      // Save token
      await saveToken(response.token);
      // TODO: Save token and navigate to dashboard based on role
      if (role === 'caregiver') {
        navigation.reset({ index: 0, routes: [{ name: 'CaregiverDashboard' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'DoctorDashboard' }] });
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AlzHelper Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: '#f0f0f0' }]}
      />
      <RadioButton.Group onValueChange={value => setRole(value as 'caregiver' | 'doctor')} value={role}>
        <View style={styles.radioRow}>
          <RadioButton value="caregiver" />
          <Text>Caregiver</Text>
          <RadioButton value="doctor" />
          <Text>Doctor</Text>
        </View>
      </RadioButton.Group>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={[styles.button, { backgroundColor: '#000' }]}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Register')} style={styles.link} labelStyle={{ color: '#000' }}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { marginBottom: 16 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  button: { marginTop: 16 },
  link: { marginTop: 8 },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});

export default LoginScreen;
