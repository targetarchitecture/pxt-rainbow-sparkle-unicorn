namespace RainbowSparkleUnicorn.Switch {

    export let _previousSwitchStates = "0000000000000000";
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
    export function getSwitchState(pin: Pins): Event {
        if (_previousSwitchStates.charAt(pin) == "L") {
            return Event.Pressed;
        } else {
            return Event.Released;
        }
        //return _previousSwitchStates.charAt(pin);
    }

    /**
    * Request the switch states, usefull to set the starting values.
    * waits half a second to get switch states back
    */
    //% subcategory="Switch"
    //% block="Request switch states"
    //% weight=65
    export function RequestSwitchStates(): Array<Event> {
        _sendMessage("SSTATE");
        basic.pause(500);

        let retval: Array<Event> = [];

        for (let i = 0; i < _previousSwitchStates.length; i++) {
            if (_previousSwitchStates.charAt(i) == "L") {
                retval.push(Event.Pressed);
            } else {
                retval.push(Event.Released);
            }
        }

        return retval;

        // return _previousSwitchStates;
    }

    export function _dealWithSwitchUpdateMessage(switchStates: string) {

        if (_previousSwitchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 16; pin++) {

                const pinState = switchStates.charAt(pin);
                const previousPinState = _previousSwitchStates.charAt(pin);

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

        _previousSwitchStates = switchStates;
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
                handler(control.eventValue() - pinOffset);
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