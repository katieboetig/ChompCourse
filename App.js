import 'react-native-reanimated';
import React, { useState } from 'react';  // ✅ Add useState
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CoverScreen from './cover/CoverScreen';
import LoginScreen from './login-signup/LoginScreen';
import SignupScreen from './login-signup/SignupScreen';
import MajorSelectionScreen from './cover/screens/MajorSelectionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cover">
        <Stack.Screen name="Cover" component={CoverScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MajorSelection" component={MajorSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
