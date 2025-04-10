// SummaryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ScheduleSummaryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { takenCourses = [], remainingCourses = [] } = route.params || {};

  const [gradSemester, setGradSemester] = useState('');
  const [creditsPerSemester, setCreditsPerSemester] = useState('');
  const [availableSemesters, setAvailableSemesters] = useState('');

  const handleGenerateSchedule = async () => {
    try {
      const response = await fetch("http://10.132.161.81:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences: {
            gradSemester,
            creditsPerSemester,
            availableSemesters,
          },
          takenCourses,
          remainingCourses,
        }),
      });
  
      const json = await response.json(); // Automatically parses JSON
  
      // Navigate to results screen with schedule
      navigation.navigate("ResultsScreen", {
        schedule: json.schedule
      });
  
    } catch (error) {
      console.error("Error generating schedule:", error);
      alert("Something went wrong while generating the schedule.");
    }
  };
  

 // console.log("🔧 Using fake GPT wrapper response:", fakeResponse);

 // navigation.navigate('ResultsScreen', { schedule: fakeResponse.suggestedSchedule });

return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Build Your Ideal Schedule</Text>

      <Text style={styles.label}>Which semester are you graduating?:</Text>
      <TextInput
        style={styles.input}
        value={gradSemester}
        onChangeText={setGradSemester}
        placeholder="e.g. Spring 2027"
      />

      <Text style={styles.label}>How many credits do you want to take per semester?:</Text>
      <TextInput
        style={styles.input}
        value={creditsPerSemester}
        onChangeText={setCreditsPerSemester}
        placeholder="e.g. 12,13,14"
      />

      <Text style={styles.label}>Which semesters are you available for enrollment?:</Text>
      <TextInput
        style={styles.input}
        value={availableSemesters}
        onChangeText={setAvailableSemesters}
        placeholder="Fall,Spring,Summer"
      />

      <Text style={styles.subheader}>📚 Remaining Courses:</Text>
      {remainingCourses.map(([code, name, credits], index) => (
        <Text key={`${code}-${index}`} style={styles.courseItem}>
          • {code} - {name} ({credits} credits)
        </Text>
      ))}

      <View style={{ marginTop: 24 }}>
        <Button title="Generate Schedule" onPress={handleGenerateSchedule} />
      </View>
    </ScrollView>

    <Button
      title="Generate Schedule"
      onPress={handleGenerateSchedule}
    />
  </View>
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
  subheader: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseItem: {
    marginVertical: 4,
    fontSize: 16,
  },
});
