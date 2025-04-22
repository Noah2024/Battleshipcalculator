import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {gameSpace} from './script.js';

let probBoxComponets = [];

function print(){
  console.log("Hello World");
}

gameInfo = new gameSpace(10, 10);

function componetSelection(x, y){
  console.log("Selection Stuff")
}

function createNewBoxComponent(x, y){
    return (
      <TouchableOpacity style={styles.button} onPress={componetSelection(x, y)}> 
        <Text>Click Me!</Text>
      </TouchableOpacity>
    );
}

probBoxComponets = [];//TO DO, Need to make sure this lines up with the X and Y of status array
// console.log(row);
//Github Gen
const indexToLetter = Object.fromEntries([...Array(26)].map((_, i) => [i, String.fromCharCode(65 + i)]));

function probArrayCompoenents() {
  return gameInfo.getStatusArray().map((row, x) => (
    <View key={`row-${x}`} style={styles.probArrayRow}>
      {row.split("").map((_, y) => (
        <TouchableOpacity
          key={`${x}-${y}`}
          style={styles.button}
          onPress={() => componetSelection(x, y)}
        >
          <Text>{`(${indexToLetter[y]}, ${x+1})`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ));
}

function updateVisualProb (){
    const statusArray = gameInfo.getStatusArray();
    for (let i = 0; i < statusArray.length; i++){
        statusArray[i].map()
}
}

export default function App() {
  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View> 
        <Text  style={styles.header}> Welcome to Battleship Calculator! </Text>
        {/* <Text > This is a simple calculator to help you find the best moves during your battleship game! </Text> */}
        <View style={styles.headerOptions}> 
          <TouchableOpacity style={styles.button} onPress={print}> 
            <Text>Reset Board</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={print}> 
            <Text>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <StatusBar style="auto" /> {/* Why is this here?*/}

      <View> {probArrayCompoenents()} </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  probArrayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOptions: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-around', // Add space between buttons
    alignItems: 'center', // Align buttons vertically in the center
    marginVertical: 10, // Add some vertical spacing
  },
});

