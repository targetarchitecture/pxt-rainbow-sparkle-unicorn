
namespace RainbowSparkleUnicorn.Light {

    export declare const enum Pins {
        //% block="Pin 0"
        P0 = 0,
        //% block="Pin 1"
        P1 = 1,
        //% block="Pin 2"
        P2 = 2,
        //% block="Pin 3"
        P3 = 3,
        //% block="Pin 4"
        P4 = 4,
        //% block="Pin 5"
        P5 = 5,
        //% block="Pin 6"
        P6 = 6,
        //% block="Pin 7"
        P7 = 7,
        //% block="Pin 8"
        P8 = 8,
        //% block="Pin 9"
        P9 = 9,
        //% block="Pin 10"
        P10 = 10,
        //% block="Pin 11"
        P11 = 11,
        //% block="Pin 12"
        P12 = 12,
        //% block="Pin 13"
        P13 = 13,
        //% block="Pin 14"
        P14 = 14,
        //% block="Pin 15"
        P15 = 15
    }

    /**
     * Blink light for the specified time in milliseconds
     * @param timeOn how long to turn on for, eg: 100, 200, 500, 1000, 2000
     * @param timeOff how long to turn off for, eg: 100, 200, 500, 1000, 2000
     */
    //% subcategory="Light" 
    //% block="blink light on pin $pin, on (ms) $timeOn, off (ms) $timeOff"   
    //% timeOn.defl=1000
    //% timeOff.defl=1000
    export function blink(pin: Pins, timeOn: number, timeOff: number) {
        _sendMessage("LBLINK," + pin + "," + timeOn + "," + timeOff)
    }

    /**
     * Blink light for the specified time in milliseconds
     * @param timeOn how long to turn on for, eg: 100, 200, 500, 1000, 2000
     * @param timeOff how long to turn off for, eg: 100, 200, 500, 1000, 2000
     * @param rise how long to rise for, eg: 100, 200, 500, 1000, 2000
     * @param fall how long to fall for, eg: 100, 200, 500, 1000, 2000 
     */
    //% subcategory="Light" 
    //% block="breathe light on pin $pin, on (ms) $timeOn, off (ms) $timeOff, rise (ms) $rise, fall (ms) $fall"
    //% timeOn.defl=1000
    //% timeOff.defl=1000
    //% rise.defl=500
    //% fall.defl=500        
    export function breathe(pin: Pins, timeOn: number, timeOff: number, rise: number, fall: number) {
        _sendMessage("LBREATHE," + pin + "," + timeOn + "," + timeOff + "," + rise + "," + fall)
    }

    //% subcategory="Light" 
    //% block="turn off light on pin $pin"
    export function turnOff(pin: Pins) {
        _sendMessage("LLEDONOFF," + pin + ",0")
    }

    //% subcategory="Light" 
    //% block="turn on light on pin $pin"
    export function turnOn(pin: Pins) {
        _sendMessage("LLEDONOFF," + pin + ",1")
    }

    //% subcategory="Light" 
    //% block="turn on light on pin $pin with brightness $brightness"
    //% brightness.min=0 brightness.max=255
    export function turnOnWithBrightness(pin: Pins, brightness: number) {

        brightness=   Math.clamp(0, 255, brightness);

        _sendMessage("LLEDINTENSITY," + pin + "," + brightness);
    }

    /**
      turn off all lights
    **/
    //% subcategory="Light" 
    //% block="turn off all lights"
    export function turnAllOff() {
        _sendMessage("LLEDALLOFF");
    }

    /**
        turn on all lights
    **/
    //% subcategory="Light" 
    //% block="turn on all lights"
    export function turnAllOn() {
        _sendMessage("LLEDALLON");
    }
}
