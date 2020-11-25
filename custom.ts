
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum Servo {
    //% block="Servo 0"
    S0 = 0,
    //% block="Servo 1"
    S1 = 1,
    //% block="Servo 2"
    S2 = 2,
    //% block="Servo 3"
    S3 = 3,
    //% block="Servo 4"
    S4 = 4,
    //% block="Servo 5"
    S5 = 5,
    //% block="Servo 6"
    S6 = 6,
    //% block="Servo 7"
    S7 = 7,
    //% block="Servo 8"
    S8 = 8,
    //% block="Servo 9"
    S9 = 9,
    //% block="Servo 10"
    S10 = 10,
    //% block="Servo 11"
    S11 = 11,
    //% block="Servo 12"
    S12 = 12,
    //% block="Servo 13"
    S13 = 13,
    //% block="Servo 14"
    S14 = 14,
    //% block="Servo 15"
    S15 = 15
}

const enum TouchSensor {
    T1 = 1,
    T2 = 2,
    T3 = 3,
    T4 = 4,
    T5 = 5,
    T6 = 6,
    T7 = 7,
    T8 = 8,
    T9 = 9,
    T10 = 10,
    T11 = 11,
    T12 = 12,
    //% block="any"
    Any = 1 << 30
}

const enum TouchAction {  
    //% block="touched"
    Touched = 0,
    //% block="released"
    Released = 1,
}

let MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ID = 2148
let MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ID = 2149
let MICROBIT_EVT_ANY = 0  // MICROBIT_EVT_ANY

const enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace RainbowSparkleUnicorn {

    let initialized = false
    let serialNumber: string

    /**
     * Add into the start function to initialise the board.
     * @param SN The serial number of the Rainbox Sparkle Unicorn board, eg: "SN4"
     */
    //% block="Start Rainbow Sparkle Unicorn $SN"
    //% weight=65
    export function start(SN: string): void {

        serial.redirect(
            SerialPin.P1,
            SerialPin.P2,
            BaudRate.BaudRate115200
        )

        serialNumber = SN        
        initialized = true

        basic.showIcon(IconNames.Heart)
    }

    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }



        /**
     * Do something when a touch sensor is touched or released.
     * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
     * @param action the trigger action
     * @param handler body code to run when the event is raised
     */
    //% blockId=makerbit_touch_on_touch_sensor
    //% block="on touch sensor | %sensor | %action"
    //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
    //% sensor.fieldOptions.tooltips="false"
    //% weight=65
    export function onTouch(
        sensor: TouchSensor,
        action: TouchAction,
        handler: () => void
    ) {

        // initTouchController();

        control.onEvent(
            action === TouchAction.Touched
                ? MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ID
                : MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ID,
            sensor === TouchSensor.Any ? MICROBIT_EVT_ANY : sensor,
            () => {    

                //basic.showString(control.eventValue());
  
                // touchState.eventValue = control.eventValue();
                handler();
            }
        );
    }

    /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% block="Set ADC 1 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function ADC1(voltage: number) {
 
        voltage = Math.clamp( 0, 30,voltage)

        //Need to resolve 0-30 to 0-254
        let mapped = pins.map(voltage, 0, 30, 0, 254)

        sendMessage("X1," + mapped)
    }

    /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% block="Set ADC 2 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function ADC2(voltage: number) {
 
        voltage = Math.clamp( 0, 30,voltage)
        
        //Need to resolve 0-30 to 0-254
        let mapped = pins.map(voltage, 0, 30, 0, 254)
        
        sendMessage("X2," + mapped)
    }

let sendQueue = [""];

  function sendMessage(message: string): void {    
    sendQueue.push(message); 
    }


    basic.forever(function () {        
        while(sendQueue.length > 0) {
       serial.writeLine( sendQueue.pop())  ;   
   
         basic.pause(10);
        }
     basic.pause(10);
    })

        //% block="set $servo pulse to %micros μs"
        //% micros.min=0 micros.max=4096
        //% micros.defl=250
     export function setPulse(servo: Servo, micros: number) {
            micros = micros | 0;
            micros = Math.clamp(0, 4096, micros);       

            sendMessage("V4," + servo + "," + micros);
        }


     export function setVolume (num: number) {
    let   cmd = "Z1," + num
    serial.writeLine(cmd)
}

  export function blink (pin: number, timeOn: number, timeOff: number) {
     let  cmd = "Y1," + pin + "," + timeOn + "," + timeOff
    serial.writeLine(cmd)
}

  export function playTrack (num: number) {
   let cmd = "Z4," + num
    serial.writeLine(cmd)
}

  export function breathe (pin: number, timeOn: number, timeOff: number, rise: number, fall: number) {
     let  cmd = "Y2," + pin + "," + timeOn + "," + rise + "," + fall
    serial.writeLine(cmd)
}
// input.onButtonPressed(Button.B, function () {
//     breathe(6, 1000, 1000, 500, 500)
// })

serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    basic.showString(serial.readUntil(serial.delimiters(Delimiters.Hash)))
})


}
