#include <Arduino.h>
#include <ESP8266WiFi.h>

const char* ssid = "FRITZ!Box 7530 WT";
const char* password = "89580715389315208415";

WiFiServer server(80);

int buzzerPin = D2;
int btnOutput1;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D5, OUTPUT);

  WiFi.begin(ssid, password);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  server.begin();
  Serial.println("Server started");
  Serial.println(WiFi.localIP());
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New client connected");
    String result = client.readStringUntil('\r');
    client.flush();
    Serial.println(result);

    if (result.indexOf("GET /led/on") >= 0) {
      digitalWrite(LED_BUILTIN, LOW);
      digitalWrite(D0, HIGH);
      digitalWrite(D1, HIGH);

    } else if (result.indexOf("GET /led/off") >= 0) {
      digitalWrite(LED_BUILTIN, HIGH);
      digitalWrite(D0, LOW);
      digitalWrite(D1, LOW);

    } else if (result.indexOf("GET /Buzzer/on") >= 0) {
      digitalWrite(D5, HIGH);


    } else if (result.indexOf("GET /Buzzer/off") >= 0){
      digitalWrite(D5, LOW);
    } else {

      client.println("HTTP/1.1 400 Bad Request");
      client.println("Content-Type: text/plain");
      client.println();
      client.println("Invalid request");
    }

    client.stop();
    Serial.println("Client disconnected");
  }
}