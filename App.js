//Necessary components from React Native and Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Main app component
export default function App() {
  return (
    <LinearGradient
      colors={['#0021A5', '#FA4616']} // Gator Blue to Gator Orange gradient
      style={styles.background} 
    >
      <View style={styles.container}> 
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color: "white", marginBottom: 40 }}>
          ChompCourse: Bite into the Best Classes!
        </Text>

        <TouchableOpacity 
          style={styles.createAccountButton}
          onPress={() => Alert.alert("Account creation process started!")}
        >
          <Text style={styles.buttonText}>
            Create new account
          </Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

//Define styles for the components
const styles = StyleSheet.create({
  background: {  
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
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
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: "800",
  },
});
