import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const handleCreateAccount = () => {
    router.push('/create-account');
  };

  return (
    <LinearGradient
      colors={['#0021A5', '#FA4616']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          ChompCourse: Bite into the Best Classes!
        </Text>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>Create new account</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 40,
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
