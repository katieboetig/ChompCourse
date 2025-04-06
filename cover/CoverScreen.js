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
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color: "white", marginBottom: 20 }}>
          Welcome to ChompCourse
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "", textAlign: "center", color: "white", marginBottom: 10 }}>
          Bite into the best classes!
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
    backgroundColor: '#0021A5',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: 150,
  },
  loginButton: {
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
