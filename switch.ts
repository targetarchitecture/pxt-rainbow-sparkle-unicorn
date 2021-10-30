namespace RainbowSparkleUnicorn.Switch {

    export const RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY = 5009;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED = 5010;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY = 5029;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED = 5030;

    let previousSwitchStates = "0000000000000000";
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
        P11 = 11,
        //% block="Pin 12"
        P12 = 12,
        //% block="Pin 13"
        P13 = 13,
        //% block="Pin 14"
        P14 = 14,
        //% block="Pin 15"
        P15 = 15
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

    export function _dealWithSwitchMessage(switchStates: string) {

        if (previousSwitchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 16; pin++) {

                const pinState = switchStates.charAt(pin);
                const previousPinState = previousSwitchStates.charAt(pin);

                if (pinState.compare(previousPinState) != 0) {

                    if (pinState.compare("L") == 0) {

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED + pin, pin + pinOffset)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY, pin + pinOffset)

                    } else if (pinState.compare("H") == 0) {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED + pin, pin + pinOffset)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY, pin + pinOffset)
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
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );

    }
    /**
     * Do something when a switch is released.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="on switch released %pin"
    //% weight=65
    export function onReleased(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
 * Do something when any switch is pushed.
 * @param handler body code to run when the event is raised
 */
    //% subcategory="Switch"
    //% block="on any switch pressed"
    //% weight=65
    export function onAnyPressed(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue()-pinOffset);
            }
        );
    }



    /**
  * Do something when any switch is released.
  * @param handler body code to run when the event is raised
  */
    //% subcategory="Switch"
    //% block="on any switch released"
    //% weight=65
    export function onAnyReleased(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }
}