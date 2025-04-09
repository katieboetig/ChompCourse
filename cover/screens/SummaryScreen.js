import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function SummaryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { takenCourses, remainingCourses } = route.params;

  const [preferredCredits, setPreferredCredits] = useState('');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [interests, setInterests] = useState('');

  const handleGenerateSchedule = () => {
    const promptData = {
      preferences: {
        credits: preferredCredits,
        time: preferredTimes,
        interests: interests,
      },
      remainingCourses,
    };

    console.log("📦 Sending to GPT wrapper:", promptData);
    // TODO: Call your GPT wrapper here with fetch() or axios
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Build Your Ideal Schedule</Text>

      <Text style={styles.label}>Preferred credit load:</Text>
      <TextInput
        style={styles.input}
        value={preferredCredits}
        onChangeText={setPreferredCredits}
        placeholder="e.g. 12-14"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Preferred class times:</Text>
      <TextInput
        style={styles.input}
        value={preferredTimes}
        onChangeText={setPreferredTimes}
        placeholder="e.g. mornings, evenings, no preference"
      />

      <Text style={styles.label}>Academic interests / electives:</Text>
      <TextInput
        style={styles.input}
        value={interests}
        onChangeText={setInterests}
        placeholder="e.g. AI, software engineering, databases"
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
