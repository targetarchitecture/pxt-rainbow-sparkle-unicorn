//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    export let _initialised = false;
    export let _printDebugMsgs = false;

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(): void {

        pins.digitalWritePin(DigitalPin.P8, 0);

        _initialised = true;
        basic.pause(100);

        _sendMessage("STARTING");

        Controls.turnSlider1(OnOff.OFF);
        Controls.turnSlider2(OnOff.OFF);
        Controls.turnSpinner1(OnOff.OFF);
        Controls.turnSpinner2(OnOff.OFF);

        Light.turnAllOff();

        IoT.stopWifi();

        basic.pause(100);

        Switch.updateSwitchState();

        basic.pause(100);
    }

    /**
     * Print debug messages
     */
    //% subcategory="Expert" 
    //% group="Debug"   
    //% block="Print debug messages"
    export function printDebugMessages(): void {
        _printDebugMsgs = true;
    }
}