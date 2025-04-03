import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function MajorSelectionScreen({ navigation }) {
    const [major, setMajor] = useState(' ');

    const handleSubmit = () => {
        console.log('Selected Major:', major);
        //Navigates to next screen, need to save the data
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Your Major</Text>
            <TextInput
                style={styles.input}
                placeholder="Major"
                value={major}
                onChangeText={setMajor}
                autoCapitalize="none"
            />
            <Button title="Submit" onPress={handleSubmit} />
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
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      width: '90%',
      marginBottom: 20,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
  });