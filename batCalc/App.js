import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import {gameSpace} from './script.js';

let probArrayCompoenents = [];
const indexToLetter = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function print(){
  console.log("Hello World");
}

function createHeatBox(x, y, text){
  const [infoVisible, setInfoVisible] = useState(false);

  const showInfo = () => {
    setInfoVisible(true);
  }
  const hideInfo = () => {
    setInfoVisible(false);
  }
  // Remove this view later, its not needed
  return (
    <View key={`heat${x}-${y}`} style={styles.button}> 
      <TouchableOpacity
        style={[styles.button]}
        onMouseEnter={Platform.OS === 'web' ? showInfo : undefined}
        onMouseLeave={Platform.OS === 'web' ? hideInfo : undefined}
        onPressIn={Platform.OS !== 'web' ? showInfo : undefined}
        onPressOut={Platform.OS !== 'web' ? hideInfo : undefined}
      >
        <Text style={styles.boxText}>{text}</Text>
      </TouchableOpacity>
      {infoVisible ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{`(${x}, ${y})`}</Text>
        </View>
        ) : null}
    </View>
  );
}

function createNewBoxComponent(x, y){//TO DO: need to do some testing with setting to hits, becuas hits may not work
  const [buttonStatus, setButtonStatus] = useState(styles.button);
  
  const handlePress = () => {
    console.log("Hanlding Pressed",x, y);
    setButtonStatus((prevStyle) => {
      if (prevStyle === styles.button) {
        gameInfo.setStatusArray(x, y, "1"); // Update gameInfo status array to missed
        return styles.missedButton; // Change to missed button style
      } else if (prevStyle === styles.missedButton) {
        gameInfo.setStatusArray(x, y, "2"); // Update gameInfo status array to hit
        return styles.hitButton; // Change to hit button style
      } else if (prevStyle === styles.hitButton) {
        gameInfo.setStatusArray(x, y, "0"); // Update gameInfo status array to null, or non
        return styles.button; // Change back to default button style
      }
      return prevStyle; // Fallback (shouldn't happen)
    });
  };

  return (
    <TouchableOpacity
        key={`${x}-${y}`}
        style={buttonStatus}
        onPress={() => handlePress()}
      >
        <Text>{`(${indexToLetter[y]}, ${x+1})`}</Text>
      </TouchableOpacity>
  );
}

function toDynamicPercentage(num) {
  if (num === 0) return "0%";

  // Convert the number to a percentage
  const percentage = num * 100;

  // Dynamically determine the number of decimal places
  let decimalPlaces;
  if (percentage >= 10) {
    decimalPlaces = 0; // No decimals for percentages >= 10
  } else if (percentage >= 1) {
    decimalPlaces = 1; // 1 decimal place for percentages between 1 and 10
  } else {
    decimalPlaces = 2; // 2 decimal places for percentages < 1
  }

  // Format the percentage with the determined decimal places
  return `${percentage.toFixed(decimalPlaces)}%`;
}

gameInfo = new gameSpace(10, 10);

export default function App() {
  
  function updateheatMapState(){
    const probArray = gameInfo.getProbArray();
    //const newState = [...prevState]; // Create a copy of the previous state
      return gameInfo.getProbArray().map((row, x) => {
        return (<View key={`heatRow-${x}`} style={styles.probArrayRow}>
          {row.map((val, y) => {
          return createHeatBox(x, y, toDynamicPercentage(val));
        })}
        </View>)
      })
  }

  

probArrayCompoenents = [];//TO DO, Need to make sure this lines up with the X and Y of status array

function genProbArrayCompoenents() {
  return gameInfo.getStatusArray().map((row, x) => (
    <View key={`inputRow-${x}`} style={styles.probArrayRow}>
      {row.split("").map((_, y) => {
          return createNewBoxComponent(x, y);
        })}
    </View>
  ));
  return null
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
      
      {/* <StatusBar style="auto" /> Why is this here? */}

      <View> {genProbArrayCompoenents() || null} </View>
      <Text> {"--------------------------------------"} </Text>
      <View> {updateheatMapState()} </View>
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
  infoBox: {
    position: 'absolute', // Position the info box absolutely
    top: -10, // Adjust to position the box above the main box
    right: -10, // Align with the right edge of the box
    backgroundColor: '#F2F3F5',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    width: 50,
    height: 30,
    borderColor: '#CCCCCC',
    zIndex: 10, // Ensure it appears above other elements
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android
  },
  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
});