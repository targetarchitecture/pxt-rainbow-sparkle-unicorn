namespace RainbowSparkleUnicorn.Switch {

    let previousSwitchStates = "0000000000000000";

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
        //% block="Pin 12"
        P12 = 12,
        //% block="Pin 13"
        P13 = 13,
        //% block="Pin 14"
        P14 = 14,
        //% block="Pin 15"
        P15 = 15,
        //% block="Any" 
        Any
    }

    export enum Event {
        Pressed = 0,
        Released = 1
    }

    /**
     * Get a switch state
     * @param pin 
     */
    //% subcategory="Switch" 
    //% weight=80        
    //% block="Get the switch state on pin $pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
    //% pin.fieldOptions.tooltips="false"    
    export function getSwitchState(pin: Pins): string {
        return previousSwitchStates.charAt(pin);
    }

    export const RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED = 5058;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED = 5059;

    export function _dealWithSwitchMessage(switchStates: string) {

        if (previousSwitchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 16; pin++) {

                const pinState = switchStates.charAt(pin);
                const previousPinState = previousSwitchStates.charAt(pin);

                if (pinState.compare(previousPinState) != 0) {

                    if (pinState.compare("L") == 0) {

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, pin)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, Pins.Any)

                    } else if (pinState.compare("H") == 0) {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, pin)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, Pins.Any)
                    }
                }
            }
        }

        previousSwitchStates = switchStates;
    }

    /**
     * Do something when a switch is pushed.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="on switch pressed %pin"
    //% weight=65
    export function onPressed(
        pin: Pins,
        handler: (pin: Number) => void
    ) {        
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED,
            pin ,
            () => {
                handler(pin);
            }
        );
    }

    /**
     * Do something when a switch is released.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="on switch pressed %pin"
    //% weight=65
    export function onReleased(
        pin: Pins,
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED,
            pin,
            () => {
                handler(pin);
            }
        );
    }
   
}