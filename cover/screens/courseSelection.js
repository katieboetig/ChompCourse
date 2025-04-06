import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

const mockCourseArr = [
  ['IDS1307', 'Writing Life: Humanities & You', '3'],
  ['COP3502C', 'Programming Fundamentals 1', '4'],
  ['CHM2045', 'General Chemistry', '3'],
  ['MAC2311', 'Analytical Geom and Calc 1', '4'],
];

const groupedBySemester = {
  'Semester one': mockCourseArr,
  'Semester two': mockCourseArr,
  'Semester three': mockCourseArr,
  'Semester four': mockCourseArr,
  'Semester five': mockCourseArr,
};

export default function CourseSelectScreen() {
  const [selectedCourses, setSelectedCourses] = useState({});

  const toggleCourse = (code) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Choose the classes you’ve already taken</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {Object.entries(groupedBySemester).map(([semester, courses]) => (
          <View key={semester} style={styles.semesterBlock}>
            <Text style={styles.semesterTitle}>{semester}</Text>
            {courses.map(([code, name]) => (
              <View key={`${semester}-${code}`} style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.code}>{code}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{name}</Text>
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
