import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
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
  const toggleBuzzerOn = async () => {
    try {
      const response = await fetch('http://192.168.238.82/Buzzer/on');
      const result = await response.text();
      if (result === 'Buzzer on' || result === 'Buzzer off') {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };
  const toggleBuzzerOff = async () => {
    try {
      const response = await fetch('http://192.168.238.82/Buzzer/off');
      const result = await response.text();
      if (result === 'Buzzer on' || result === 'Buzzer off') {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>
        Eind Challenge
      </Text>


        <View style={styles.buttonsLed}>
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
      
        <View style={styles.buttonsBuzzer}>
          <TouchableOpacity style={styles.button} title="Toggle Buzzer on" onPress={toggleBuzzerOn} >
              <Text style={styles.buttonText}>
                buzzer ON
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} title="Toggle Buzzer off" onPress={toggleBuzzerOff} >
              <Text style={styles.buttonText}>
                buzzer off
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
    maxWidth: Dimensions.get("window").width,
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
    buttonsLed: {
    marginTop: 200,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    buttonsBuzzer: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});