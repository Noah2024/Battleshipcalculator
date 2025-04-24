import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import {gameSpace} from './script.js';

let probArrayCompoenents = [];

function print(){
  console.log("Hello World");
}

gameInfo = new gameSpace(10, 10);

export default function App() {
  const indexToLetter = Object.fromEntries([...Array(26)].map((_, i) => [i, String.fromCharCode(65 + i)]));
  const [heatMapState, setHeatMapState] = useState();
  const [buttonStates, setButtonStates] = useState(
    Array(10).fill(null).map(() => Array(10).fill(styles.button)) // 10x10 grid of default styles
  );

  function updateheatMapState(){
    console.log(gameInfo.getProbArray());

    // setHeatMapState(prevState => {
    //   console.log(gameInfo.getProbArray());
    //   const newState = [...prevState]; // Create a copy of the previous state
    // })
  }

  function createNewBoxComponent(x, y){
    return (
      <TouchableOpacity
          key={`${x}-${y}`}
          style={buttonStates[x][y]}
          onPress={() => componetSelection(x, y)}
        >
          <Text>{`(${indexToLetter[y]}, ${x+1})`}</Text>
        </TouchableOpacity>
    );
}

probArrayCompoenents = [];//TO DO, Need to make sure this lines up with the X and Y of status array

function genProbArrayCompoenents() {
  return gameInfo.getStatusArray().map((row, x) => (
    <View key={`row-${x}`} style={styles.probArrayRow}>
      {row.split("").map((_, y) => {
          return createNewBoxComponent(x, y);
        })}
    </View>
  ));
}

  function componetSelection(x, y){//Signifcant help of Github Copilot
    setButtonStates(prevStates => {
      const newStates = [...prevStates]; // Create a copy of the previous state
      const currentStatus = newStates[x][y]; // Get the current status of the button
      if (currentStatus === styles.button) {
        newStates[x][y] = styles.missedButton; // Change to missed button style
        gameInfo.setStatusArray(x, y, "1"); // Update gameInfo status array to "1"
      } else if (currentStatus === styles.missedButton) {
        newStates[x][y] = styles.hitButton; // Change to hit button style
        gameInfo.setStatusArray(x, y, "2"); // Update gameInfo status array to "2"
      } else if (currentStatus === styles.hitButton) {
        newStates[x][y] = styles.button; // Change back to default button style
        gameInfo.setStatusArray(x, y, "0"); // Update gameInfo status array to "0"
      }
      updateheatMapState();
      return newStates; // Return the updated state
    })
    
  }

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

      <View> {genProbArrayCompoenents()} </View>
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
  hitButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  missedButton: {
    backgroundColor: '#F2F3F5',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

