
namespace RainbowSparkleUnicorn.Touch {

    //export let _previousTouchStates = "000000000000";
    let pinOffset = 1000;

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
        P11 = 11
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


    export function _dealWithReleasedUpdateMessage(pin: number) {
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED + pin, pin + pinOffset,)
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY, pin + pinOffset)
        //basic.showIcon(IconNames.Yes)
    }

    export function _dealWithTouchedUpdateMessage(pin: number) {
        // basic.showNumber(pin)
        //RainbowSparkleUnicorn.Expert.SendDebugMessage(control.millis().toString());

        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED + pin, pin + pinOffset)
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY, pin + pinOffset)
        //RainbowSparkleUnicorn.Expert.SendDebugMessage(control.millis().toString());

    }

    /**
     * Do something when a pin is touched.
     * @param pin the touch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="on pin %pin | touched"
    //% weight=65
    export function onTouched(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );

    }
    /**
     * Do something when a pin is released.
     * @param pin the touch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="on %pin | released"
    //% weight=65
    export function onReleased(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
 * Do something when any pin is touched.
 * @param handler body code to run when the event is raised
 */
    //% subcategory="Touch"
    //% block="on any pin touched"
    //% weight=65
    export function onAnyTouched(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }



    /**
  * Do something when any pin is released.
  * @param handler body code to run when the event is raised
  */
    //% subcategory="Touch"
    //% block="on any pin released"
    //% weight=65
    export function onAnyReleased(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }


}