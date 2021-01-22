namespace RainbowSparkleUnicorn {

    //hold a value to know if we've sent a command
    let sentLightCommand = false;

    //% subcategory="Light" 
    //% block="blink light on pin $pin, time on $timeOn, time off $timeOff"    
    export function blink(pin: Blinkable, timeOn: number, timeOff: number) {
       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

       sendMessage("Y1," + pin + "," + timeOn + "," + timeOff)
    }

    //% subcategory="Light" 
    //% block="breathe light on pin $pin, time on $timeOn, time off $timeOff, rise time $rise, fall time $fall"
    export function breathe(pin: Breathable, timeOn: number, timeOff: number, rise: number, fall: number) {
      if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      sendMessage("Y2," + pin + "," + timeOn + "," + timeOff + ","  + rise + "," + fall)
    }

    //% subcategory="Light" 
    //% block="turn off light on pin $pin"
    export function turnOff(pin: Blinkable) {
       
       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      sendMessage("Y3," + pin + ",0")
    } 

    //% subcategory="Light" 
    //% block="turn on light on pin $pin"
    export function turnOn(pin: Blinkable) {

       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      sendMessage("Y3," + pin + ",1")
    }          
    
    //% subcategory="Light" 
    //% block="turn off all lights"
    export function turnAllOff() {
        sentLightCommand = true;
        resetSX1509();
    } 

    function resetSX1509(){
        sendMessage("Y4")     
    }

/**
    turn on all lights
    Turn off all lights must be called before.
**/
    //% subcategory="Expert" 
    //% block="turn on all lights"
    export function turnAllOn() {
        basic.pause(10)
        sendMessage("Y3,0,1")    
        basic.pause(10)    
        sendMessage("Y3,1,1")
        basic.pause(10)
        sendMessage("Y3,2,1")
        basic.pause(10)
        sendMessage("Y3,3,1")
        basic.pause(10)
        sendMessage("Y3,4,1")
        basic.pause(10)
        sendMessage("Y3,5,1")
        basic.pause(10)
        sendMessage("Y3,6,1")
        basic.pause(10)
        sendMessage("Y3,7,1")
        basic.pause(10)
        sendMessage("Y3,8,1")
        basic.pause(10)
        sendMessage("Y3,9,1")
        basic.pause(10)
        sendMessage("Y3,10,1")
        basic.pause(10)
        sendMessage("Y3,11,1")
        basic.pause(10)                
        sendMessage("Y3,12,1")
        basic.pause(10)
        sendMessage("Y3,13,1")  
        basic.pause(10)  
        sendMessage("Y3,14,1")
        basic.pause(10)
        sendMessage("Y3,15,1")            
        basic.pause(10)
    } 


}

enum Breathable {
    //% block="Pin 4"
    Breathable4 = 4,
    //% block="Pin 5"
    Breathable5 = 5,
    //% block="Pin 6"
    Breathable6 = 6,
    //% block="Pin 7"
    Breathable7 = 7,
    //% block="Pin 12"
    Breathable12 = 12,
    //% block="Pin 13"
    Breathable13 = 13,
    //% block="Pin 14"
    Breathable14 = 14,
    //% block="Pin 15"
    Breathable15 = 15
}

enum Blinkable {
    //% block="Pin 0"
    Blinkable0 = 0,      
    //% block="Pin 1"
    Blinkable1 = 1,
    //% block="Pin 2"
    Blinkable2 = 2,
    //% block="Pin 3"
    Blinkable3 = 3,  
    //% block="Pin 4"
    Blinkable4 = 4,
    //% block="Pin 5"
    Blinkable5 = 5,
    //% block="Pin 6"
    Blinkable6 = 6,
    //% block="Pin 7"
    Blinkable7 = 7,
    //% block="Pin 8"
    Blinkable8 = 8,
    //% block="Pin 9"
    Blinkable9 = 9,
    //% block="Pin 10"
    Blinkable10 = 10,
    //% block="Pin 11"
    Blinkable11 = 11,
    //% block="Pin 12"
    Blinkable12 = 12,
    //% block="Pin 13"
    Blinkable13 = 13,
    //% block="Pin 14"
    Blinkable14 = 14,
    //% block="Pin 15"
    Blinkable15 = 15
}