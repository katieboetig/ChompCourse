import React from 'react';
import { useRoute } from "@react-navigation/native";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResultsScreen() {
    const route = useRoute();
    const schedule = route.params?.schedule || "No schedule found.";
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Your Ideal Schedule:</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>{schedule}</Text>
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
