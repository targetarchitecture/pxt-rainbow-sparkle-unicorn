namespace RainbowSparkleUnicorn {

    //% subcategory="Light" 
    //% block="blink light on pin $pin, time on $timeOn, time off $timeoff"    
    export function blink(pin: Blinkable, timeOn: number, timeOff: number) {
       sendMessage("Y1," + pin + "," + timeOn + "," + timeOff)
    }

    //% subcategory="Light" 
    //% block="breathe light on pin $pin, time on $timeOn, time off $timeOff, rise time $rise, fall time $fall"
    export function breathe(pin: Breathable, timeOn: number, timeOff: number, rise: number, fall: number) {
      sendMessage("Y2," + pin + "," + timeOn + "," + rise + "," + fall)
    }

    //% subcategory="Light" 
    //% block="turn off light on pin $pin"
    export function turnOff(pin: Breathable) {
      sendMessage("Y3,0")
    } 

    //% subcategory="Light" 
    //% block="turn on light on pin $pin"
    export function turnOn(pin: Breathable) {
      sendMessage("Y3,1")
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