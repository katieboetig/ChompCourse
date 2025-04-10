import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';

// 📦 Load course data from JSON file. static file
const courseMap = require('../../assets/courses_by_semester.json');

// 🗂️ Use courseMap directly
const groupedBySemester = courseMap;


// react state hook tracking the courses the user has selected
export default function CourseSelectScreen() {
  const navigation = useNavigation(); // ✅ navigation hook
  // updated when the user checks or unchecks a box
  const [selectedCourses, setSelectedCourses] = useState({});

  const toggleCourse = (code) => {
    setSelectedCourses((prev) => ({ //selectedCourses is an object with course codes as keys and boolean values indicating whether the course is selected or not
      ...prev,
      [code]: !prev[code], //flips the selection status of the course, true or false
    }));
  };

  const handleContinue = () => { //grabs the unselected courses
    const unselectedCourses = Object.entries(groupedBySemester) //turns it into an array of key-value pairs
      .flatMap(([semester, courses]) => //goes through each semester and collects all the courses that were not selected
        courses.filter(([code]) => !selectedCourses[code])
      );
      //unselectedCourses is a flat array of courses that the user has not checked off

    console.log("✅ Unselected Courses:", unselectedCourses);

    //navigates to the SummaryScreen, passes two values as route parameters: takenCourses (the object of courses the user checked), remainingCourses (the flat list of unchecked courses)
    navigation.navigate('ScheduleSummary'), {
      takenCourses: selectedCourses,
      remainingCourses: unselectedCourses, //what I'm using
    };
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
