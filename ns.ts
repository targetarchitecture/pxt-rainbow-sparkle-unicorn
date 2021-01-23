//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    export let initialised = false;

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(): void {

        pins.digitalWritePin(DigitalPin.P8, 0);

        initialised = true;
        basic.pause(50);

        _sendMessage("STARTING");

        Controls.turnSlider1(OnOff.OFF);
        Controls.turnSlider2(OnOff.OFF);
        Controls.turnSpinner1(OnOff.OFF);
        Controls.turnSpinner2(OnOff.OFF);

        Light.turnAllOff();
    }

    /**
     * Restart the ESP32 processor on the board
     */
    //% subcategory="Expert" 
    //% block=Restart ESP32
    export function restartESP32(): void {
        _sendMessage("RESTART");
    }

    /**
     * Write a comment
     * @param theComment eg:'write comment here'
     */
    //% subcategory="Expert" 
    //% block=comment|%theComment
    export function comment(theComment: string): void {
        // do nothing
    }
}