#include <Arduino.h>
#include <ESP8266WiFi.h>

const char* ssid = "FRITZ!Box 7530 WT";
const char* password = "89580715389315208415";

WiFiServer server(80);

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
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
    String request = client.readStringUntil('\r');
    client.flush();
    Serial.println(request);

    if (request.indexOf("GET /led/on") >= 0) {
      digitalWrite(LED_BUILTIN, LOW);
      digitalWrite(D0, HIGH);
      digitalWrite(D1, HIGH);
      client.println("HTTP/1.1 200 OK");
      client.println("Content-Type: text/plain");
      client.println();
      client.println("LED turned on");
    } else if (request.indexOf("GET /led/off") >= 0) {
      digitalWrite(LED_BUILTIN, HIGH);
      digitalWrite(D0, LOW);
      digitalWrite(D1, LOW);
      client.println("HTTP/1.1 200 OK");
      client.println("Content-Type: text/plain");
      client.println();
      client.println("LED turned off");
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