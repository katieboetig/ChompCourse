import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

// 📦 Load course data from JSON file
const courseMap = require('../../assets/courses_by_semester.json');

// 🗂️ Use courseMap directly
const groupedBySemester = courseMap;

export default function CourseSelectScreen() {
  const [selectedCourses, setSelectedCourses] = useState({});
  const navigation = useNavigation();

  const toggleCourse = (code) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleContinue = () => {
    const unselectedCourses = Object.entries(groupedBySemester)
      .flatMap(([semester, courses]) =>
        courses
          .filter(
            ([code, name]) =>
              !(code.trim().toLowerCase() === 'credits' && name.toLowerCase().includes('credits'))
          )
          .filter(([code]) => !selectedCourses[code])
      );

    navigation.navigate('ScheduleSummary', {
      takenCourses: selectedCourses,
      remainingCourses: unselectedCourses,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Choose the classes you’ve already taken</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(groupedBySemester).map(([semester, courses]) => (
          <View key={semester} style={styles.semesterBlock}>
            <Text style={styles.semesterTitle}>{semester}</Text>
            {courses
              .filter(([code, name]) => {
                return !(code.trim().toLowerCase() === 'credits' && name.toLowerCase().includes('credits'));
              })
              .map(([code, name, credits], index) => (
                <View key={`${semester}-${code || 'nocode'}-${index}`} style={styles.row}>
                  <View style={styles.cell}>
                    <Text style={styles.code}>{code}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{name} ({credits} credits)</Text>
                  </View>
                  <Checkbox
                    value={!!selectedCourses[code]}
                    onValueChange={() => toggleCourse(code)}
                    color={selectedCourses[code] ? '#333' : undefined}
                  />
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
      <View style={{ paddingVertical: 16 }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  container: {
    padding: 16,
    backgroundColor: '#ccc',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  semesterBlock: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  semesterTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    paddingRight: 8,
  },
  code: {
    fontWeight: '600',
  },
});
