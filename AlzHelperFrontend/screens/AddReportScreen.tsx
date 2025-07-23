import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, Chip, SegmentedButtons } from 'react-native-paper';
import { createReport } from '../api/reports';

interface Symptom {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

const AddReportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [loading, setLoading] = useState(false);

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, { name: currentSymptom.trim(), severity: currentSeverity }]);
      setCurrentSymptom('');
      setCurrentSeverity('mild');
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (symptoms.length === 0) {
      // TODO: Show error message
      return;
    }

    setLoading(true);
    try {
      await createReport(symptoms);
      // TODO: Show success message
      navigation.goBack();
    } catch (error: any) {
      console.error('Error creating report:', error.message);
      // TODO: Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add New Report" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Add Symptoms</Text>
        
        <View style={styles.inputSection}>
          <TextInput
            label="Symptom"
            value={currentSymptom}
            onChangeText={setCurrentSymptom}
            style={styles.input}
            placeholder="e.g., Memory loss, Disorientation"
          />
          
          <Text style={styles.severityLabel}>Severity:</Text>
          <SegmentedButtons
            value={currentSeverity}
            onValueChange={setCurrentSeverity}
            buttons={[
              { value: 'mild', label: 'Mild' },
              { value: 'moderate', label: 'Moderate' },
              { value: 'severe', label: 'Severe' },
            ]}
            style={styles.severityButtons}
          />
          
          <Button 
            mode="outlined" 
            onPress={addSymptom}
            style={styles.addButton}
            disabled={!currentSymptom.trim()}
          >
            Add Symptom
          </Button>
        </View>

        {symptoms.length > 0 && (
          <View style={styles.symptomsSection}>
            <Text style={styles.sectionTitle}>Added Symptoms</Text>
            <View style={styles.symptomsList}>
              {symptoms.map((symptom, index) => (
                <Chip
                  key={index}
                  mode="outlined"
                  onClose={() => removeSymptom(index)}
                  style={styles.symptomChip}
                >
                  {symptom.name} ({symptom.severity})
                </Chip>
              ))}
            </View>
          </View>
        )}

        <Button 
          mode="contained" 
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || symptoms.length === 0}
          style={[styles.submitButton, { backgroundColor: '#000' }]}
        >
          Submit Report
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
  inputSection: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  severityLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  severityButtons: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 8,
  },
  symptomsSection: {
    marginBottom: 24,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default AddReportScreen; 