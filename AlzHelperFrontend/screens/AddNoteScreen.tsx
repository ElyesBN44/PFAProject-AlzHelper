import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, Card, Chip } from 'react-native-paper';
import { addNoteToReport } from '../api/reports';

interface Report {
  _id: string;
  symptoms: Array<{ name: string; severity: string }>;
  createdAt: string;
  caregiver?: {
    first_name: string;
    last_name: string;
  };
}

interface AddNoteScreenProps {
  navigation: any;
  route: {
    params: {
      report: Report;
    };
  };
}

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ navigation, route }) => {
  const { report } = route.params;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      // TODO: Show error message
      return;
    }

    setLoading(true);
    try {
      await addNoteToReport(report._id, comment.trim());
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
        <Appbar.Content title="Add Note" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Report Details</Text>
        
        <Card style={styles.reportCard}>
          <Card.Content>
            <View style={styles.reportHeader}>
              <Text style={styles.reportDate}>
                {new Date(report.createdAt).toLocaleDateString()}
              </Text>
              {report.caregiver && (
                <Text style={styles.caregiverName}>
                  By: {report.caregiver.first_name} {report.caregiver.last_name}
                </Text>
              )}
            </View>
            
            <Text style={styles.symptomsTitle}>Symptoms:</Text>
            <View style={styles.symptomsList}>
              {report.symptoms.map((symptom, index) => (
                <Chip
                  key={index}
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
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Add Your Note</Text>
        
        <TextInput
          label="Doctor's Note"
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={6}
          style={styles.noteInput}
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
  reportCard: {
    marginBottom: 24,
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
  noteInput: {
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    marginTop: 16,
  },
});

export default AddNoteScreen; 