import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar, TextInput, Button, Text, Card } from 'react-native-paper';
import { registerCaregiver, registerDoctor } from '../api/auth';
import { sharedStyles, colors, typography, spacing, shadows } from '../utils/sharedStyles';
import Logo from '../components/Logo';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState<'caregiver' | 'doctor'>('caregiver');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (!formData.first_name.trim() || !formData.last_name.trim() || 
        !formData.email.trim() || !formData.phone.trim() || 
        !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (role === 'doctor') {
        await registerDoctor(
          `${formData.first_name} ${formData.last_name}`,
          formData.email,
          formData.phone,
          formData.password
        );
      } else {
        await registerCaregiver(
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.phone,
          formData.password
        );
      }
      
      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Appbar.Header style={sharedStyles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Account" titleStyle={sharedStyles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Logo size="large" />
        </View>

        {/* Registration Form */}
        <Card style={styles.registerCard}>
          <Card.Content>
            <Text style={styles.welcomeText}>Create Your Account</Text>
            <Text style={styles.subtitleText}>Choose your role and fill in your details</Text>
            
            <View style={styles.roleSelector}>
              <Button
                mode={role === 'caregiver' ? 'contained' : 'outlined'}
                onPress={() => setRole('caregiver')}
                style={[styles.roleButton, role === 'caregiver' && { backgroundColor: colors.primary }]}
                labelStyle={[styles.roleButtonLabel, role === 'caregiver' && { color: 'white' }]}
              >
                Caregiver
              </Button>
              <Button
                mode={role === 'doctor' ? 'contained' : 'outlined'}
                onPress={() => setRole('doctor')}
                style={[styles.roleButton, role === 'doctor' && { backgroundColor: colors.secondary }]}
                labelStyle={[styles.roleButtonLabel, role === 'doctor' && { color: 'white' }]}
              >
                Doctor
              </Button>
            </View>
            
            <TextInput
              label="First Name"
              value={formData.first_name}
              onChangeText={(text) => setFormData({...formData, first_name: text})}
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Last Name"
              value={formData.last_name}
              onChangeText={(text) => setFormData({...formData, last_name: text})}
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Phone"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              secureTextEntry
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
              secureTextEntry
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}
            
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={[sharedStyles.button, sharedStyles.buttonPrimary]}
              labelStyle={styles.buttonLabel}
            >
              Create Account
            </Button>
          </Card.Content>
        </Card>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Login here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  registerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    ...shadows.md,
  },
  welcomeText: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text.secondary,
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  roleButton: {
    flex: 1,
    borderRadius: 8,
  },
  roleButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: colors.accent,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: 14,
  },
  successText: {
    color: colors.success,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  linkText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
