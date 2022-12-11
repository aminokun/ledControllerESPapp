import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react';

function App(){
  const [isLedOn, setIsLedOn] = useState(false);

  const toggleLedOn = async () => {
    try {
      const response = await fetch('http://192.168.178.74/led/on');
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
  const toggleLedOff = async () => {
    try {
      const response = await fetch('http://192.168.178.74/led/off');
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
      <Text>LED is {isLedOn ? 'on' : 'off'}</Text>
      <Button title="Toggle LED on" onPress={toggleLedOn} />
      <Button title="Toggle LED off" onPress={toggleLedOff} />
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
  },
});