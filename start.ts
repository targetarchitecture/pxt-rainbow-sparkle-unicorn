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

        pins.digitalWritePin(DigitalPin.P8, 0);

        basic.pause(1);

        //_readyToReadQueue = true;

        //make sure stuff has stopped
        //IoT.stopWifi();
        //Sound.pause();

        // Movement.stopServo(Servo.P0);
        // Movement.stopServo(Servo.P1);
        // Movement.stopServo(Servo.P2);
        // Movement.stopServo(Servo.P3);
        // Movement.stopServo(Servo.P4);
        // Movement.stopServo(Servo.P5);
        // Movement.stopServo(Servo.P6);
        // Movement.stopServo(Servo.P7);
        // Movement.stopServo(Servo.P8);
        // Movement.stopServo(Servo.P9);
        // Movement.stopServo(Servo.P10);
        // Movement.stopServo(Servo.P11);
        // Movement.stopServo(Servo.P12);
        // Movement.stopServo(Servo.P13);
        // Movement.stopServo(Servo.P14);
        // Movement.stopServo(Servo.P15);

        // Controls.turnSlider1(OnOff.OFF);
        // Controls.turnSlider2(OnOff.OFF);
        //  Controls.turnSpinner1(OnOff.OFF);
        //  Controls.turnSpinner2(OnOff.OFF);

        //Switch.updateSwitchState();

        // Light.turnAllOff();

        // basic.pause(200);
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