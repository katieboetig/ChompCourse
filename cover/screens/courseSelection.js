import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const mockCourseArr = [
  ['IDS1307', 'Writing Life: Humanities & You', '3'],
  ['COP3502C', 'Programming Fundamentals 1', '4'],
  ['CHM2045', 'General Chemistry', '3'],
  ['MAC2311', 'Analytical Geom and Calc 1', '4'],
];

const groupedBySemester = {
  'Semester 1': mockCourseArr,
  'Semester 2': mockCourseArr,
  'Semester 3': mockCourseArr,
  'Semester 4': mockCourseArr,
  'Semester 5': mockCourseArr,
};

export default function CourseSelectScreen({ navigation }) {
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
        {Object.entries(groupedBySemester).map(([semester, courses], semesterIndex) => (
          <View key={semester} style={styles.semesterBlock}>
            <Text style={styles.semesterTitle}>{semester}</Text>
            {courses.map(([code, name]) => (
             <View
             key={`${semester}-${code}`}
             style={[
               styles.row,
               { backgroundColor: semesterIndex % 2 === 0 ? '#FFBC5D' : '#5DAEFF' },
             ]}
           >
                <View style={styles.cell}
                >
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
       <TouchableOpacity style={styles.continueButton}>
                                  <Text style={styles.buttonText}>Continue</Text>
                                </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  scrollContent: {
      paddingBottom: 40,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 24,
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
    borderColor: '000',
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
  continueButton: {
    backgroundColor: '#0021A5',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 150,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "800",
  },
});
