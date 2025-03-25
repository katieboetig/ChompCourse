import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CoverScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GatorChomp!</Text>
      <Text style={styles.subtitle}>Choose an option:</Text>

      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={styles.space} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4169e1',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Added color to title
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#ffffff',
  },
  space: {
    height: 20, // Adds space between buttons
  },
});
