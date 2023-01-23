
#include <SimpleDHT.h>
int pinDHT11 = 7;
SimpleDHT11 dht11(pinDHT11);
#include <LiquidCrystal.h>
const int rs = 53, en = 52, d4 = 40, d5 = 41, d6 = 38, d7 = 39;
LiquidCrystal lcd(rs,en,d4,d5,d6,d7);
int ledValue=8;


int ventiloValue=9;
const int bouton1 = 5;
const int bouton2 = 6;


void setup() { 

  Serial.begin( 9600); 
  delay(100);
  pinMode(pinDHT11,INPUT); 
  pinMode(ledValue,OUTPUT); 
  pinMode(pinDHT11,OUTPUT); 
   pinMode(bouton1, INPUT_PULLUP);; // le bouton est une entrée a haut
  pinMode(bouton2, INPUT_PULLUP); // le bouton est une entrée
  lcd.begin(16, 2);
  delay(10); 
  lcd.setCursor(0,0);
  lcd.print("Temperature=");
  lcd.setCursor(0,1);
  lcd.print("humidite=");




  }
void loop() { 
  Serial.println("**********************************");
   Serial.println("Sample DHT11...");

byte temperature = 0;
byte humidity = 0;
int err=SimpleDHTErrSuccess;
if((err = dht11.read(&temperature,
 &humidity, NULL)) !=SimpleDHTErrSuccess){
  Serial.print("Read DHT11 failed, err=");
  Serial.println(err);
  delay(1000);
  return;
}  
Serial.print("Sample OK:");
Serial.print("\n");
Serial.print((int)temperature);
Serial.println(" °C,");
Serial.print("\n");
Serial.print((int)humidity);
Serial.println(" H,");

lcd.setCursor(14,0);
lcd.print(temperature);


lcd.setCursor(10,1);
lcd.print(humidity);
delay(1500);

if((int)temperature>30){
 digitalWrite(ledValue,HIGH);
 digitalWrite(ventiloValue,HIGH);
 //delay(1000);
 //digitalWrite(ledValue,LOW); 

}
else{
 digitalWrite(ledValue,LOW);
 digitalWrite(ventiloValue,LOW);

}
 
   float etatbouton1 =digitalRead(bouton1);
  if(etatbouton1 != HIGH)
  {
   // digitalWrite(ledValue,HIGH);
    digitalWrite(ventiloValue,HIGH);
    


  }
  float etatbouton2 =digitalRead(bouton2);
  if(etatbouton2 != HIGH)
  {
   // digitalWrite(ledValue,LOW);
    digitalWrite(ventiloValue,LOW);

  }

    }
