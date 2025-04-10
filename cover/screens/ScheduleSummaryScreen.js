// ScheduleSummaryScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import getScheduleRequest from '../../AIwrapper.js'; 

export default function ScheduleSummaryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const semesterOptions = ['Fall', 'Spring', 'Summer'];

  const {
    takenCourses = [],
    remainingCourses = [],
    major = '',
  } = route.params || {};

  const [gradSemester, setGradSemester] = useState('');
  const [creditsPerSemester, setCreditsPerSemester] = useState('');
  const [availableSemesters, setAvailableSemesters] = useState([]);

  const handleToggleSemester = (semester) => {
    setAvailableSemesters((prev) =>
      prev.includes(semester)
        ? prev.filter((s) => s !== semester)
        : [...prev, semester]
    );
  };

  const handleGenerateSchedule = async () => {
    console.log("🔘 Generate button pressed");

    if (!gradSemester || !creditsPerSemester || availableSemesters.length === 0) {
      alert('Please complete all fields before generating the schedule.');
      return;
    }

    try {
      const preferences = {
        gradSemester,
        credits: parseInt(creditsPerSemester, 10),
        availableSemesters,
      };

      console.log('📤 Calling OpenAI with:', {
        preferences,
        takenCourses,
        remainingCourses,
      });

      const schedule = await getScheduleRequest(preferences, takenCourses, remainingCourses);

      console.log("✅ Schedule received:", schedule);

      navigation.navigate('ResultsScreen', { schedule });

    } catch (error) {
      console.error('❌ Error generating schedule:', error);
      alert('Failed to generate schedule. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Build Your Ideal Schedule</Text>

      <Text style={styles.label}>Which semester are you graduating?</Text>
      <TextInput
        style={styles.input}
        value={gradSemester}
        onChangeText={setGradSemester}
        placeholder="e.g. Spring 2027"
      />

      <Text style={styles.label}>How many credits do you want to take per semester?</Text>
      <TextInput
        style={styles.input}
        value={creditsPerSemester}
        onChangeText={setCreditsPerSemester}
        placeholder="e.g. 12"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Which semesters are you available for enrollment?</Text>
      {semesterOptions.map((semester) => (
        <TouchableOpacity
          key={semester}
          style={styles.checkboxRow}
          onPress={() => handleToggleSemester(semester)}
        >
          <View style={styles.checkbox}>
            {availableSemesters.includes(semester) && <View style={styles.checkboxSelected} />}
          </View>
          <Text>{semester}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.selected}>
        Selected: {availableSemesters.join(', ') || 'None'}
      </Text>

      <Text style={styles.subheader}>📚 Remaining Courses:</Text>
      {remainingCourses.map(([code, name, credits], index) => (
        <Text key={`${code}-${index}`} style={styles.courseItem}>
          • {code} - {name} ({credits} credits)
        </Text>
      ))}

      <View style={styles.buttonWrapper}>
        <Button title="Generate Schedule" onPress={handleGenerateSchedule} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    height: 12,
    width: 12,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  selected: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  subheader: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseItem: {
    marginVertical: 4,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
