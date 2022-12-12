import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';

function App(){
  const [isLedOn, setIsLedOn] = useState(false);

  const toggleLedOn = async () => {
    try {
      const response = await fetch('http://192.168.238.82/led/on');
      const result = await response.text();
      if (result === 'LED turned on' || result === 'LED turned on') {
        setIsLedOn(!isLedOn);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };
  const toggleLedOff = async () => {
    try {
      const response = await fetch('http://192.168.238.82/led/off');
      const result = await response.text();
      if (result === 'LED turned on' || result === 'LED turned off') {
        setIsLedOn(!isLedOn);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>
        Turn LED on or off {isLedOn ? "On" : "Off"}
      </Text>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} title="Toggle LED on" onPress={toggleLedOn} >
            <Text style={styles.buttonText}>
              ON
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Toggle LED off" onPress={toggleLedOff} >
            <Text style={styles.buttonText}>
              OFF
            </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
    button: {
    marginTop: "20%",
    marginHorizontal: "5%",
    height: 50,
    width: 150,
    backgroundColor: '#28b4ee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
    buttonText: {
    fontWeight: 'regular',
    fontSize: 22,
    color: '#fff',
  },  
    title: {
    fontStyle: "bold",
    fontSize: 22,
  },
    buttons: {
    marginTop: 200,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});