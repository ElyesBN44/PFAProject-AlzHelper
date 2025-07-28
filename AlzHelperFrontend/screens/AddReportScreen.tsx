import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, Card, Chip } from 'react-native-paper';
import { createReport } from '../api/reports';
import { getAllPatients } from '../api/patients';
import { sharedStyles, colors, typography, spacing, shadows } from '../utils/sharedStyles';

const AddReportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [symptoms, setSymptoms] = useState<Array<{ name: string; severity: string }>>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState('mild');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (err: any) {
      setError('Failed to load patients');
    }
  };

  const addSymptom = () => {
    if (!currentSymptom.trim()) {
      setError('Please enter a symptom name.');
      return;
    }
    
    setSymptoms([...symptoms, { name: currentSymptom.trim(), severity: currentSeverity }]);
    setCurrentSymptom('');
    setCurrentSeverity('mild');
    setError('');
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedPatient) {
      setError('Please select a patient.');
      return;
    }
    
    if (symptoms.length === 0) {
      setError('Please add at least one symptom.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createReport({
        patient: selectedPatient,
        symptoms: symptoms
      });
      
      setSuccess('Report submitted successfully!');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Appbar.Header style={sharedStyles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Symptom Report" titleStyle={sharedStyles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView style={sharedStyles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Add Symptom Report</Text>
          <Text style={styles.subtitle}>Report new symptoms for your patient</Text>
        </View>

        {/* Patient Selection */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Select Patient</Text>
            <View style={styles.patientSelector}>
              {patients.map((patient) => (
                <Button
                  key={patient._id}
                  mode={selectedPatient === patient._id ? 'contained' : 'outlined'}
                  onPress={() => setSelectedPatient(patient._id)}
                  style={[
                    styles.patientButton,
                    selectedPatient === patient._id && { backgroundColor: colors.primary }
                  ]}
                  labelStyle={[
                    styles.patientButtonLabel,
                    selectedPatient === patient._id && { color: 'white' }
                  ]}
                >
                  {patient.name} ({patient.age} years)
                </Button>
              ))}
            </View>
            {patients.length === 0 && (
              <Text style={styles.noPatientsText}>No patients available. Please add patients first.</Text>
            )}
          </Card.Content>
        </Card>

        {/* Symptom Input */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Add Symptoms</Text>
            
            <TextInput
              label="Symptom Name"
              value={currentSymptom}
              onChangeText={setCurrentSymptom}
              style={sharedStyles.input}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            <View style={styles.severitySelector}>
              <Text style={styles.severityLabel}>Severity:</Text>
              <View style={styles.severityButtons}>
                {['mild', 'moderate', 'severe'].map((severity) => (
                  <Button
                    key={severity}
                    mode={currentSeverity === severity ? 'contained' : 'outlined'}
                    onPress={() => setCurrentSeverity(severity)}
                    style={[
                      styles.severityButton,
                      currentSeverity === severity && { backgroundColor: colors.secondary }
                    ]}
                    labelStyle={[
                      styles.severityButtonLabel,
                      currentSeverity === severity && { color: 'white' }
                    ]}
                  >
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Button>
                ))}
              </View>
            </View>
            
            <Button
              mode="contained"
              onPress={addSymptom}
              style={[styles.addButton, { backgroundColor: colors.success }]}
              labelStyle={styles.addButtonLabel}
            >
              Add Symptom
            </Button>
          </Card.Content>
        </Card>

        {/* Symptoms List */}
        {symptoms.length > 0 && (
          <Card style={styles.formCard}>
            <Card.Content>
              <Text style={styles.cardTitle}>Added Symptoms</Text>
              <View style={styles.symptomsList}>
                {symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <View style={styles.symptomInfo}>
                      <Text style={styles.symptomName}>{symptom.name}</Text>
                      <Chip
                        mode="outlined"
                        style={[
                          styles.severityChip,
                          {
                            backgroundColor: 
                              symptom.severity === 'severe' ? '#ffebee' :
                              symptom.severity === 'moderate' ? '#fff3e0' : '#f3e5f5'
                          }
                        ]}
                      >
                        {symptom.severity}
                      </Chip>
                    </View>
                    <Button
                      mode="text"
                      onPress={() => removeSymptom(index)}
                      textColor={colors.accent}
                      compact
                    >
                      Remove
                    </Button>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || symptoms.length === 0 || !selectedPatient}
          style={[sharedStyles.button, sharedStyles.buttonPrimary]}
          labelStyle={styles.submitButtonLabel}
        >
          Submit Report
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  patientSelector: {
    gap: spacing.sm,
  },
  patientButton: {
    marginBottom: spacing.sm,
    borderRadius: 8,
  },
  patientButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  noPatientsText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  severitySelector: {
    marginBottom: spacing.md,
  },
  severityLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  severityButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  severityButton: {
    flex: 1,
    borderRadius: 6,
  },
  severityButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    borderRadius: 8,
  },
  addButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  symptomsList: {
    gap: spacing.sm,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  symptomInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  symptomName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  severityChip: {
    height: 24,
  },
  submitButtonLabel: {
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
});

export default AddReportScreen; 