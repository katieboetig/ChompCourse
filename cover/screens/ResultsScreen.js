import React from 'react';
import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResultsScreen() {
  const route = useRoute();
  const schedule = route.params?.schedule;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Ideal Schedule:</Text>

      {schedule && typeof schedule === 'object' ? (
        Object.entries(schedule).map(([semester, courses]) => (
          <View key={semester} style={styles.semesterBlock}>
            <Text style={styles.semesterTitle}>{semester}</Text>
            {Array.isArray(courses) && courses.length > 0 ? (
              courses.map(([code, name, credits], index) => (
                <Text key={index} style={styles.courseText}>
                  • {code} - {name} ({credits} credits)
                </Text>
              ))
            ) : (
              <Text style={styles.courseText}>No courses listed.</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 16, marginTop: 10 }}>
          No schedule found or invalid data.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  semesterBlock: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  semesterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
