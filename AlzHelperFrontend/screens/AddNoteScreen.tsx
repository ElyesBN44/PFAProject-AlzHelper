import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text, Card } from 'react-native-paper';
import { addNoteToReport } from '../api/reports';
import { sharedStyles, colors, typography, spacing, shadows } from '../utils/sharedStyles';

const AddNoteScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { report } = route.params;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('Please enter a comment.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addNoteToReport(report._id, comment.trim());
      setSuccess('Note added successfully!');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Appbar.Header style={sharedStyles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Note" titleStyle={sharedStyles.headerTitle} />
      </Appbar.Header>
      
      <ScrollView style={sharedStyles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Add Medical Note</Text>
          <Text style={styles.subtitle}>Add your observations for this report</Text>
        </View>

        {/* Report Details Card */}
        <Card style={styles.reportCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Report Details</Text>
            <View style={styles.reportInfo}>
              <Text style={styles.reportLabel}>Patient:</Text>
              <Text style={styles.reportValue}>
                {report.patient?.name || 'Unknown Patient'}
              </Text>
            </View>
            <View style={styles.reportInfo}>
              <Text style={styles.reportLabel}>Caregiver:</Text>
              <Text style={styles.reportValue}>
                {report.caregiverId?.first_name} {report.caregiverId?.last_name}
              </Text>
            </View>
            <View style={styles.reportInfo}>
              <Text style={styles.reportLabel}>Date:</Text>
              <Text style={styles.reportValue}>
                {new Date(report.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.symptomsSection}>
              <Text style={styles.symptomsTitle}>Symptoms:</Text>
              {report.symptoms?.map((symptom: any, index: number) => (
                <View key={index} style={styles.symptomItem}>
                  <Text style={styles.symptomName}>• {symptom.name}</Text>
                  <Text style={styles.symptomSeverity}>Severity: {symptom.severity}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Note Form */}
        <Card style={styles.noteCard}>
          <Card.Content>
            <Text style={styles.formTitle}>Your Medical Note</Text>
            <TextInput
              label="Enter your observations, recommendations, or treatment notes"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={6}
              style={styles.noteInput}
              mode="outlined"
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}
            
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={[sharedStyles.button, sharedStyles.buttonPrimary]}
              labelStyle={styles.buttonLabel}
            >
              Add Note
            </Button>
          </Card.Content>
        </Card>
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
  reportCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  reportInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  reportLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  reportValue: {
    fontSize: 14,
    color: colors.text.primary,
  },
  symptomsSection: {
    marginTop: spacing.md,
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 6,
  },
  symptomName: {
    fontSize: 14,
    color: colors.text.primary,
  },
  symptomSeverity: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    ...shadows.sm,
  },
  formTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  noteInput: {
    marginBottom: spacing.md,
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
});

export default AddNoteScreen; 