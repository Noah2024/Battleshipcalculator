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
  const [buttonState, setButtonStyle] = useState(styles.button)
  const [btnStatus, setBtnStatus] = useState("0"); // State to manage button status
  
  function createNewBoxComponent(x, y){
    return (
      <TouchableOpacity
          key={`${x}-${y}`}
          style={buttonState}
          onPress={() => componetSelection(x, y)}
        >
          <Text>{`(${indexToLetter[y]}, ${x+1})`}</Text>
        </TouchableOpacity>
    );
}

probArrayCompoenents = [];//TO DO, Need to make sure this lines up with the X and Y of status array
// console.log(row);
//Github Gen
const indexToLetter = Object.fromEntries([...Array(26)].map((_, i) => [i, String.fromCharCode(65 + i)]));

function addToArray(x, row){
  const compArray = row.split("").map((_, y) => (createNewBoxComponent(x, y)));
  probArrayCompoenents.push(compArray);
  return compArray
}

function genProbArrayCompoenents() {
  return gameInfo.getStatusArray().map((row, x) => (
    <View key={`row-${x}`} style={styles.probArrayRow}>
      {addToArray(x, row)}
    </View>
  ));
}

  function componetSelection(x, y){
    btnElement = probArrayCompoenents[x][y];
    if (btnStatus == "0") {
      setBtnStatus("1");
      gameInfo.setStatusArray(x, y, "1");
      setButtonStyle(styles.missedButton);
    } else if (btnStatus == "1") {
      setBtnStatus("2");
      gameInfo.setStatusArray(x, y, "2");
      setButtonStyle(styles.hitButton);
    } else if (btnStatus == "2") {
      setBtnStatus(0);
      gameInfo.setStatusArray(x, y, "0")
      setButtonStyle(styles.button);
    }
    console.log(x, y, btnStatus);
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

