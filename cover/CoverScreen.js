import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function CoverScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0021A5', '#FA4616']} // Gator Blue to Gator Orange gradient
      style={styles.background} 
    >
      <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color: "white", marginBottom: 40 }}>
          ChompCourse: Bite into the Best Classes!
        </Text>

      
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
  },
  space: {
    height: 20,
  },
  createAccountButton: {
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 200,
  },
  loginButton: {
    backgroundColor: '#F8B195',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 200,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "800",
  },
});
