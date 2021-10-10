namespace RainbowSparkleUnicorn.Light {

    /**
     * Blink light for the specified time in milliseconds
     * @param timeOn how long to turn on for, eg: 100, 200, 500, 1000, 2000
     * @param timeOff how long to turn off for, eg: 100, 200, 500, 1000, 2000
     */
    //% subcategory="Light" 
    //% block="blink light on pin $pin, on (ms) $timeOn, off (ms) $timeOff"   
    //% timeOn.defl=1000
    //% timeOff.defl=1000
    export function blink(pin: lightPins, timeOn: number, timeOff: number) {
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
    export function breathe(pin: lightPins, timeOn: number, timeOff: number, rise: number, fall: number) {
      _sendMessage("LBREATHE," + pin + "," + timeOn + "," + timeOff + ","  + rise + "," + fall)
    }

    //% subcategory="Light" 
    //% block="turn off light on pin $pin"
    export function turnOff(pin: lightPins) {
      _sendMessage("LLEDONOFF," + pin + ",0")
    } 

    //% subcategory="Light" 
    //% block="turn on light on pin $pin"
    export function turnOn(pin: lightPins) {
        _sendMessage("LLEDONOFF," + pin + ",1")

    }          

    /**
      turn off all lights
  **/
    //% subcategory="Light" 
    //% block="turn off all lights"
    export function turnAllOff() {

        //see if the pause is needed as sometime the LEDs don't come on when powered up
        basic.pause(50);

        _sendMessage("LLEDALLOFF");

        //see if the pause is needed as sometime the LEDs don't come on when powered up
        basic.pause(50);
    } 


/**
    turn on all lights
**/
    //% subcategory="Light" 
    //% block="turn on all lights"
    export function turnAllOn() {

        //see if the pause is needed as sometime the LEDs don't come on when powered up
        basic.pause(50);

        _sendMessage("LLEDALLON");

        //see if the pause is needed as sometime the LEDs don't come on when powered up
        basic.pause(50);
    } 
}

