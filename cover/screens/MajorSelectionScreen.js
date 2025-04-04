import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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

    const handleSubmit = () => {
        console.log('Selected Major:', major);
        // Navigates to next screen, need to save the data
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Major</Text>
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
            
            <Button 
                title="Submit" 
                onPress={handleSubmit} 
                color="#007AFF"
                disabled={!major} 
            />
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
        fontSize: 24,
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
    }
});