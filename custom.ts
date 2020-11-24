
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

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

const enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

let MICROBIT_EVT_ANY = 0  // MICROBIT_EVT_ANY

/**
 * Custom blocks
 */
//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace custom {

    let initialized = false
    let serialNumber: string

    /**
     * Add into the start function to initialise the board.
     * @param value the serial number of the Rainbox Sparkle Unicorn board
     */
    //% blockId=TargetArchitecture_initwithserialnumber
    //% block="Start Rainbow Sparkle Unicorn $SN"
    //% weight=65
    export function init(SN: string): void {

        serial.redirect(
            SerialPin.P0,
            SerialPin.P1,
            BaudRate.BaudRate115200
        )
        serialNumber = SN

        basic.showIcon(IconNames.Happy)

        initialized = true
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
}
