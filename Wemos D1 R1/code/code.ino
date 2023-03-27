#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "";
const char* password = "";

const char* serverName = "http://127.0.0.1:8080/api/check";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void setup() {
  Serial.begin(115200);
  //*******************************************************************************
  pinMode(D12, OUTPUT);
  pinMode(D13, INPUT_PULLUP);
  pinMode(D7, OUTPUT);
  pinMode(D0, OUTPUT);

  digitalWrite(D12, HIGH);

  //*******************************************************************************

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    digitalWrite(D0, HIGH);
    delay(1000);
    digitalWrite(D0, LOW);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

int saveLastOn = 0;

void loop() {
  digitalWrite(D7, HIGH);

  int switchState = digitalRead(D13);
  if (switchState == LOW) {
    digitalWrite(D12, LOW);
    delay(1000);
    digitalWrite(D12, HIGH);
  }
    
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      
      http.begin(client, serverName);
  
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String httpRequestData = "api_key=tPmAT5Ab3j7F9&sensor=BME280&value1=24.25&value2=49.54&value3=1005.14";           
      int httpResponseCode = http.POST(httpRequestData);
      
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      
      if(httpResponseCode == 200){    
        if(saveLastOn == 0){
          digitalWrite(D0, HIGH);
          digitalWrite(D12, LOW);
          delay(1000);
          digitalWrite(D12, HIGH);
          saveLastOn++;
        }
      }
      else {
        digitalWrite(D0, LOW);
        saveLastOn = 0;
      }
        
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }

  delay(1500);
  digitalWrite(D7, LOW);
  delay(500);
}