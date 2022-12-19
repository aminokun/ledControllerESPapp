#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <PubSubClient.h>
#include "tds.h"

const char* networkSSID = "NETLAB-OIL010";
const char* networkPassword =  "DesignChallenge";

const char *mqttServer = "192.168.236.132";
const int mqttPort = 1883;

WiFiClient wifiClient;
WiFiClient mqttwifiClient;
PubSubClient mqttClient(mqttwifiClient);
TDS tds;

int deviceId = -1;
bool autoscan = false;
const uint64_t autoScanDelay = 100000;
uint64_t autoScanProgress = 0;



void setupWIFI() {
  delay(4000);   //Delay needed before calling the WiFi.begin
  
  WiFi.begin(networkSSID, networkPassword); 
  
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
}

String postData(String page, String requestData){
  String response = "";
  HTTPClient http;   
  String url = String("http://192.168.236.132/") + page;
  http.begin(wifiClient, url);  //Specify destination for HTTP request
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");             //Specify content-type header
  
  Serial.print("Making POST request to '");
  Serial.print(url);
  Serial.print("' with data '");
  Serial.print(requestData);
  Serial.println("'");

  int httpResponseCode = http.POST(requestData);   //Send the actual POST request
  
  if(httpResponseCode>0){
    response = http.getString(); //Get the response to the request
    Serial.println(httpResponseCode);   //Print return code
    Serial.println(response);           //Print request answer
  
  }else{
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
  }
  http.end();  //Free resources
  return response;
}

int getDeviceId() {
  String response = postData("getid.php", String("UUID=") + String(WiFi.macAddress()));
  Serial.print("Received device id ");
  Serial.println(response);
  return response.toInt();
}

void postScanResult(float result) {
  String resultString = String(result);
  String deviceIdString = String(deviceId);

  String request = "ID=" + deviceIdString + "&RESULT=" + resultString;
  postData("scan.php", request);
}

void callback(char * topic, uint8_t * message, unsigned int length) {
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }

  if(String(topic) == String(WiFi.macAddress()))
  {
    if(messageTemp == "on")
    {
      Serial.println("Turned autoscan on");
      autoscan = true;
    }
    if(messageTemp == "off")
    {
      Serial.println("Turned autoscan off");
      autoscan = false;
    }
    if(messageTemp == "scan")
    {
      Serial.println("Queued scan");
      tds.queueScan();
    }
    if(messageTemp == "ping")
    {
      Serial.println("Recieved ping request");
      mqttClient.publish("app", String(WiFi.macAddress() + "-Reply").c_str());
    }

  }

}

void setupMQTT() {
  mqttClient.setServer(mqttServer, mqttPort);
  // set the callback function
  mqttClient.setCallback(callback);
}

void reconnectMQTT() {
  Serial.println("Connecting to MQTT Broker...");
  while (!mqttClient.connected()) {
      Serial.println("Reconnecting to MQTT Broker..");
      String clientId = String(WiFi.macAddress());
      
      if (mqttClient.connect(clientId.c_str())) {
        Serial.println("Connected.");
        // subscribe to topic
        mqttClient.subscribe(clientId.c_str());
      }
  }
}

void tdsCallback(float result)
{
  Serial.print("TDS value is: ");
  Serial.println(String(result));
  postScanResult(result);
}

void setup() {
  Serial.begin(115200);
  setupWIFI();
  setupMQTT();
  tds.setCallBack(tdsCallback);
  deviceId = getDeviceId();
}

void loop() {
  if(deviceId == -1)
  {
    Serial.println("Invalid deviceId, Retrying...");
    delay(4000);
    deviceId = getDeviceId();
  }
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  
    if (!mqttClient.connected()){
    reconnectMQTT();
    }

    if(autoscan)
    {
      if(autoScanProgress >= autoScanDelay)
      {
        tds.queueScan();
        autoScanProgress = 0;
      }
      autoScanProgress++;
    }
  }
  tds.loop();
  mqttClient.loop();
}