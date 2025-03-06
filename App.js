//Necessary components from React Native and Expo
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Main app component
export default function App() {
  return (
    //Def needs to be changd, but the linear gradient for the background (why is it only half?)
    <LinearGradient
      colors={['#0021A5', '#FA4616']} // Gator Blue to Gator Orange gradient
      style={styles.background}  // This now correctly references styles
    >
      <View style={styles.container}> 
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", color: "white" }}>
          ChompCourse: Bite into the Best Classes!
        </Text>
      </View>
      <StatusBar style="auto" />
    </LinearGradient> // All things related to text for the title above
  );
}

//Define styles for the components
const styles = StyleSheet.create({
  background: {  // Ensures the gradient covers the whole screen
    flex: 1, //Allows gradient to take up the full screen
    justifyContent: "center", //Centers the text vertically
    alignItems: "center", //Centers the content horizontally
  },
  // Container: styled view component that holds app content (in this case, text)
  container: {
    flex: 1, //Makes the container fill the entire screen
    justifyContent: "center", //Centers the text vertically
    alignItems: "center", //Centers the text horizontally
    padding: 20, //spacing inside the container
  },
});
