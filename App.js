import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';

const TDS_VALUE_URL = 'http://192.168.178.75/tdsValue';

function App(){
  const [tdsValue, setTdsValue] = useState(0);

  useEffect(() => {
    const fetchTdsValue = async () => {
      try {
        const response = await fetch(TDS_VALUE_URL);
        const tdsValue = await response.text();
        setTdsValue(tdsValue);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTdsValue();
  }, []);
  
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>
        TDS Value: {tdsValue}
      </Text>


        {/* <View style={styles.buttonsLed}>
          <TouchableOpacity style={styles.button} title="Toggle LED on" onPress={toggleLedOn} >
              <Text style={styles.buttonText}>
                ON
              </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="Toggle LED off"
          onPress={toggleLedOff} >
              <Text style={styles.buttonText}>
                OFF
              </Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.buttonsBuzzer}>
        <TouchableOpacity
          style={styles.button}
          title="Toggle Buzzer on"
          onPress={toggleBuzzerOn} >
              <Text style={styles.buttonText}>
                buzzer ON
              </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="Toggle Buzzer off"
          onPress={toggleBuzzerOff} >
              <Text style={styles.buttonText}>
                buzzer off
              </Text>
          </TouchableOpacity>
        </View> */}
      
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