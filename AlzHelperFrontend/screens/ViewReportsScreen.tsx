import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Appbar, Card, Text, Chip, ActivityIndicator, Button } from 'react-native-paper';
import { getDoctorReports } from '../api/reports';

interface Report {
  _id: string;
  symptoms: Array<{ name: string; severity: string }>;
  createdAt: string;
  caregiver?: {
    first_name: string;
    last_name: string;
  };
  patient?: {
    name: string;
    age: number;
    gender: string;
    contact: string;
  };
}

const ViewReportsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    try {
      setError('');
      const data = await getDoctorReports();
      setReports(data.reports || data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load reports');
      console.error('Error fetching reports:', err);
    }
  };

  useEffect(() => {
    fetchReports().finally(() => setLoading(false));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  const renderReport = ({ item }: { item: Report }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.reportHeader}>
          <Text style={styles.reportDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          {item.caregiver && (
            <Text style={styles.caregiverName}>
              By: {item.caregiver.first_name} {item.caregiver.last_name}
            </Text>
          )}
        </View>
        {item.patient && (
          <View style={styles.patientInfoBox}>
            <Text style={styles.patientInfoTitle}>Patient:</Text>
            <Text style={styles.patientInfoText}>{item.patient.name} (Age: {item.patient.age}, Gender: {item.patient.gender})</Text>
            <Text style={styles.patientInfoText}>Contact: {item.patient.contact}</Text>
          </View>
        )}
        <Text style={styles.symptomsTitle}>Symptoms:</Text>
        <View style={styles.symptomsList}>
          {item.symptoms.map((symptom, index) => (
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
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('AddNoteScreen', { report: item })}
          style={styles.addNoteButton}
        >
          Add Note
        </Button>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="View Reports" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading reports...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="View Reports" titleStyle={{ color: '#000', fontWeight: 'bold' }} />
      </Appbar.Header>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No reports found</Text>
              <Text style={styles.emptySubtext}>
                Reports will appear here when caregivers add symptoms
              </Text>
            </View>
          }
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  addNoteButton: {
    marginTop: 12,
  },
  patientInfoBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  patientInfoTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  patientInfoText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ViewReportsScreen; 