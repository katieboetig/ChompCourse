import React, { useState } from 'react';  // ✅ Add useState
import { StyleSheet, TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert, Button} from 'react-native';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { auth } from '../firebase/firebase';


export default function LoginScreen({ navigation }) {  // ✅ Ensure navigation is in props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }


    try {
      await doSignInWithEmailAndPassword(email, password);
      navigation.replace('MajorSelection');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Failed to log in');
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