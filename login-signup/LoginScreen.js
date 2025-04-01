import React, { useState } from 'react';  
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {doSignInWithEmailandPassword } from '../firebase/auth';


export default function LoginScreen({ navigation }) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => { //updated by katie
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigation.navigate('MajorSelection');
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert('Login failed', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 20,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 15,
      borderRadius: 8,
  },
});

