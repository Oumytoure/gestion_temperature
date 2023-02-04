#include "DHT.h" 
#include <IRremote.h>
 
#define DHTPIN 7  
#define DHTTYPE DHT11  

#define ventiloValue 9
#define ledValue 8

int RECV_PIN = 5;
IRrecv IR(RECV_PIN); // le capteur infrarouge est connecté à broche 5 de l’Arduino

DHT dht(DHTPIN, DHTTYPE);      

void setup() {  
  IR.enableIRIn(); // Initialise le recepteur infrarouge
  
  // Initialise la capteur DHT11 
  Serial.begin(9600);   
  dht.begin();

  pinMode(ventiloValue,OUTPUT); 
  pinMode(ledValue,OUTPUT); 
}  

  static char inChar;
  
void loop() {

  if (IR.decode()) {
    IR.resume(); }
    inChar = Serial.read();
   if ((inChar == '1' ) || (IR.decodedIRData.decodedRawData == 3125149440)) {
     digitalWrite(ventiloValue, HIGH);
   }
   if((inChar == '0' ) || (IR.decodedIRData.decodedRawData == 3860463360)) {
     digitalWrite(ventiloValue, LOW);
   }


  int temp = dht.readTemperature();
  int hum = dht.readHumidity();
  Serial.print(temp);  
  Serial.print("/");  
  Serial.println(hum);    
 
  delay(1100);

   if(temp > 30){
     digitalWrite(ventiloValue,HIGH);
     digitalWrite(ledValue,HIGH);
    }
    else{
     digitalWrite(ledValue,LOW);
     digitalWrite(ventiloValue,LOW);
    }

  unsigned char statut = (unsigned char)Serial.read();
  if(statut == '0' ){
    digitalWrite(ventiloValue,LOW);
  }else if(statut == '1'){
    digitalWrite(ventiloValue,HIGH);
  }

  }
