//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    //export let _readyToUseI2C = false;
    //export let _readyToReadQueue = false;
    //export let _printDebugMsgs = false;

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(): void {

        serial.redirect(SerialPin.P15, SerialPin.P16, 115200)

        _sendMessage("STARTING");

        // let x = control.millis();

        // while (true) {
        //     if (control.millis() - x > 100) {
        //         break;
        //     }
        // }
    }

    /**
     * Print debug messages
     */
    //% subcategory="Expert" 
    //% group="Debug"   
    //% block="Print debug messages"
    // export function printDebugMessages(): void {
    //     _printDebugMsgs = true;
    // }

    /**
     * Write a comment
     * @param theComment eg:'write comment here'
     */
    //% subcategory="Expert" 
    //% group="Debug"       
    //% block=comment|%theComment
    export function comment(theComment: string): void {
        // do nothing
    }
}