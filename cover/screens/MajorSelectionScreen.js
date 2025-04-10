import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MajorSelectionScreen({ navigation }) {
    const [major, setMajor] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Computer Science', value: 'computer_science' },
        { label: 'Business Administration', value: 'business_admin' },
        { label: 'Psychology', value: 'psychology' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Biology', value: 'biology' },
        { label: 'English', value: 'english' },
        { label: 'Mathematics', value: 'mathematics' },
        { label: 'Economics', value: 'economics' },
        { label: 'Political Science', value: 'political_science' },
        { label: 'Chemistry', value: 'chemistry' }
    ]);

    const handleSubmit = async () => {
        if (!major) {
            Alert.alert("Please select a major before continuing.");
            return;
        }

        console.log('Selected Major:', major);

        try {
            const response = await fetch("http://10.2.11.156:5001/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    major: major,
                }),
            });

            const data = await response.json();
            console.log("🧠 Scrape response:", data);

            if (response.ok) {
                navigation.navigate("CourseSelection", {
                    selectedMajor: major,
                    recommendationData: data,
                });
            } else {
                Alert.alert("Scrape failed", data.error || "Unknown error from server.");
            }
        } catch (error) {
            console.error("Network error:", error);
            Alert.alert("Network error", "Could not connect to the server.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select your major</Text>

            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={major}
                    items={items}
                    setOpen={setOpen}
                    setValue={setMajor}
                    setItems={setItems}
                    placeholder="Select a major"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownList}
                />
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dropdownContainer: {
        width: '90%',
        marginBottom: 20,
        zIndex: 1000,
    },
    dropdown: {
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    dropdownList: {
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    continueButton: {
        backgroundColor: '#FA4616',
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
