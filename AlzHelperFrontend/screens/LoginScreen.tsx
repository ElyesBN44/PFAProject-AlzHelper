import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar, TextInput, Button, Text, Card } from 'react-native-paper';
import { loginCaregiver, loginDoctor } from '../api/auth';
import { saveToken, saveUserRole } from '../utils/tokenStorage';
import { sharedStyles, colors, typography, spacing, shadows } from '../utils/sharedStyles';
import Logo from '../components/Logo';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (role: 'doctor' | 'caregiver') => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;
      if (role === 'doctor') {
        response = await loginDoctor(email.trim(), password);
      } else {
        response = await loginCaregiver(email.trim(), password);
      }

      await saveToken(response.token);
      await saveUserRole(role);

      if (role === 'doctor') {
        navigation.reset({ index: 0, routes: [{ name: 'DoctorDashboard' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'CaregiverDashboard' }] });
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Appbar.Header style={sharedStyles.header}>
        <Appbar.Content title="AlzHelper" titleStyle={sharedStyles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Logo size="large" />
        </View>

        {/* Login Form */}
        <Card style={styles.loginCard}>
          <Card.Content>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.subtitleText}>Sign in to continue</Text>
            
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => handleLogin('doctor')}
                loading={loading}
                disabled={loading}
                style={[sharedStyles.button, sharedStyles.buttonPrimary]}
                labelStyle={styles.buttonLabel}
              >
                Login as Doctor
              </Button>
              
              <Button
                mode="contained"
                onPress={() => handleLogin('caregiver')}
                loading={loading}
                disabled={loading}
                style={[sharedStyles.button, sharedStyles.buttonSecondary]}
                labelStyle={styles.buttonLabel}
              >
                Login as Caregiver
              </Button>
            </View>
          </Card.Content>
        </Card>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
            Register here
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
  loginCard: {
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
  buttonContainer: {
    marginTop: spacing.md,
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

export default LoginScreen;
