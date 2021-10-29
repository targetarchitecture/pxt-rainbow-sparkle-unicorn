

namespace RainbowSparkleUnicorn.Touch {

    let previousTouchStates = "000000000000";

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

/*
        //% block="Any"
        //Any
*/

    export enum Event {
        touched = 0,
        released = 1
    }

    let touch_pressed: Action[] = [
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
    ];

    let touch_released: Action[] = [
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
    ];

    //% subcategory="Touch" 
    //% block="When pin %touchpad| is %event"
    //% weight=100
    export function on(pin: Pins, event: Event, handler: Action) {

        switch (event) {
            case Event.released:
                touch_released[pin] = handler;
                break;
            case Event.touched:
                touch_pressed[pin] = handler;
                break;
        }
    }


    function triggerHandler(pin: Pins, event: Event) {

        //serial.writeLine("fn triggerHandler")
        //serial.writeString(pin.toString())

        switch (event) {
            case Event.released:
                touch_released[pin]();
                break;
            case Event.touched:
                touch_pressed[pin]();
                break;
        }
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

        for (let index = 0; index < 12; index++) {

            const pinState = touchStates.charAt(index);
            const previousPinState = previousTouchStates.charAt(index);

            if (pinState.compare(previousPinState) != 0) {
                if (pinState.compare("H") == 0) {
                    triggerHandler(index, Touch.Event.touched)
                } else if (pinState.compare("L") == 0) {
                    triggerHandler(index, Touch.Event.released)
                }
            }
        }

        // if (touchStates.includes("H") == true) {
        //     triggerHandler(Touch.Pins.Any, Touch.Event.touched);
        // }

        // if (touchStates.includes("L") == true) {
        //     triggerHandler(Touch.Pins.Any, Touch.Event.released);
        // }

        previousTouchStates = touchStates;
    }
}