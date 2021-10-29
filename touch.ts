
namespace RainbowSparkleUnicorn.Touch {

    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED = 5051;
    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED = 5052;

    let previousTouchStates = "000000000000";

    //console.log(Array(12).fill(0));

    export enum Pins {
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
        //% block="Any"
        Any
    }

    export enum Event {
        Touched = 0,
        Released = 1
    }

    /**
     * Set the touch and release thresholds for all 13 channels on the
     * @param touchThreshold the touch threshold value from 0 to 255.
     * @param releaseThreshold the release threshold value from 0 to 255.
     */
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the touch and release thresholds $touchThreshold , $releaseThreshold"
    //% releaseThreshold.min=0 releaseThreshold.max=255 releaseThreshold.defl=6
    //% touchThreshold.min=0 touchThreshold.max=255 touchThreshold.defl=12
    export function setTouchThresholds(touchThreshold: number, releaseThreshold: number) {
        _sendMessage("S1," + touchThreshold + "," + releaseThreshold);
    }

    /**
    * Set the debounce timing
    * @param timing 
    */
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the debounce timing $timing"
    //% timing.min=0 timing.max=100 timing.defl=50
    export function setDebounceDelay(timing: number) {
        _sendMessage("S2," + timing);
    }

    export function _dealWithTouchMessage(touchStates: string) {

        //this attempts to set-up an initial state of the switches
        if (previousTouchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 12; pin++) {

                const pinState = touchStates.charAt(pin);
                const previousPinState = previousTouchStates.charAt(pin);

                if (pinState.compare(previousPinState) != 0) {
                    if (pinState.compare("H") == 0) {

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, pin)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, Pins.Any)

                    } else if (pinState.compare("L") == 0) {

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, pin)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, Pins.Any)

                    }
                }
            }
        }

        previousTouchStates = touchStates;
    }
}