
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
    S3 = 3
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

  function sendMessage(message: string): void {
        serial.writeLine(message)
    }

        //% block="set $servo pulse to %micros μs"
        //% micros.min=0 micros.max=4096
        //% micros.defl=250
     export function   setPulse(servo: Servo, micros: number) {
            micros = micros | 0;
            micros = Math.clamp(0, 4096, micros);       

            sendMessage("V4," + servo + "," + micros);
        }


        

}
