namespace RainbowSparkleUnicorn.Light {

    //hold a value to know if we've sent a command
    let sentLightCommand = false;

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
       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

       _sendMessage("Y1," + pin + "," + timeOn + "," + timeOff)
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
    export function breathe(pin: breathLightPins, timeOn: number, timeOff: number, rise: number, fall: number) {
      if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      _sendMessage("Y2," + pin + "," + timeOn + "," + timeOff + ","  + rise + "," + fall)
    }

    //% subcategory="Light" 
    //% block="turn off light on pin $pin"
    export function turnOff(pin: lightPins) {
       
       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      _sendMessage("Y3," + pin + ",0")
    } 

    //% subcategory="Light" 
    //% block="turn on light on pin $pin"
    export function turnOn(pin: lightPins) {

       if (sentLightCommand == false){
           sentLightCommand = true;
           resetSX1509();
       } 

      _sendMessage("Y3," + pin + ",1")
    }          
    
    //% subcategory="Light" 
    //% block="turn off all lights"
    export function turnAllOff() {
        sentLightCommand = true;
        resetSX1509();
    } 

    function resetSX1509(){
        _sendMessage("Y4")     
    }

/**
    turn on all lights
    Turn off all lights must be called before.
**/
    //% subcategory="Light" 
    //% block="turn on all lights"
    export function turnAllOn() {

        for(let pin = 0; pin <= 15; pin++) {
            _sendMessage("Y3," + pin + ",1")  
            basic.pause(10)
        }
    } 
}

