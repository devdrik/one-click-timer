#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <WS2812FX.h>

#define NUM_LEDS 3
#define LATCH_PIN 13
#define LED_PIN 14

HTTPClient http;
WiFiClient client;

String host = "http://nuc01:8085";

WS2812FX ws2812fx = WS2812FX(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);


  
void initPins();
void initLEDs();
String sendRequest(String request);
void setColor(uint8_t r, uint8_t g, uint8_t b);
void connectWiFi();
boolean hasWifiConnection();
void sendRequest();
void turnOffESP();

void setup()
{
  initPins();
  initLEDs();

  connectWiFi();

  sendRequest();
}

void loop() {
  ws2812fx.service();
}

void initPins()
{
  pinMode(LATCH_PIN, OUTPUT);
  digitalWrite(LATCH_PIN, HIGH);
}

void initLEDs() {
  ws2812fx.init();
  ws2812fx.setBrightness(100);
  ws2812fx.setSpeed(1000);
  ws2812fx.setColor(ws2812fx.Color(0,0,100));
  ws2812fx.setMode(FX_MODE_BREATH);
  ws2812fx.start();
  ws2812fx.service();
}

void setColor(uint8_t r, uint8_t g, uint8_t b) {
  ws2812fx.setColor(ws2812fx.Color(r,g,b));
};

void connectWiFi()
{
  // WiFi.begin("ssid","pw");
  // Once the ESP ist connected it keeps the credentials in its EEPROM
  // and we do not need to pass them to WiFi.begin()
  WiFi.begin();
  while(!hasWifiConnection()) {
    ws2812fx.service();
  }
}

boolean hasWifiConnection() {
  return WiFi.status() == WL_CONNECTED;
}

String sendRequest(String request)
{
  http.begin(client, host + "/" + request);
  http.GET();
  String payload = http.getString();
  http.end();
  return payload;
}

void sendRequest() {
  String res = sendRequest("toggle");

  if (res.indexOf("on") >= 0) {
    setColor(0,100,0);
  } else {
    setColor(100,10,0);
  }

  ws2812fx.setMode(FX_MODE_STATIC);
  ws2812fx.service();
  delay(500);
  turnOffESP();
}

void turnOffESP() {
  digitalWrite(LATCH_PIN, LOW);
}
