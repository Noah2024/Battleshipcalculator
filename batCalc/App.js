import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

function print(){
  console.log("Hello World");
}

export default function App() {
  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}> BattleShip Calculator</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity style={styles.button} onPress={print}> 
        <Text>Click Me!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  }
});
