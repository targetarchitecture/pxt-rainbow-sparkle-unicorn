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

    }


/*
    //% block="Any" 
    //Any
*/

    export enum Event {
        pressed = 0,
        released = 1
    }

    let switch_pressed: Action[] = [
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
        () => { },
        () => { },
        () => { },
        () => { },
    ];

    let switch_released: Action[] = [
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
        () => { },
        () => { },
        () => { },
        () => { },
    ];

    /**
     * Do something when a switch is pushed or released.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="When switch on pin %touchpad | is %event"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
    //% pin.fieldOptions.tooltips="false"
    //% weight=100
    export function on(pin: Pins, event: Event, handler: Action) {

        switch (event) {
            case Event.released:
                switch_released[pin] = handler;
                break;
            case Event.pressed:
                switch_pressed[pin] = handler;
                break;
        }
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

    function switchHandler(pin: Pins, event: Event) {

        switch (event) {
            case Event.released:
                switch_released[pin]();
                break;
            case Event.pressed:
                switch_pressed[pin]();
                break;
        }
    }

    export function _dealWithSwitchMessage(switchStates: string) {

        for (let pin = 0; pin < 16; pin++) {

            const pinState = switchStates.charAt(pin);
            const previousPinState = previousSwitchStates.charAt(pin);

            if (pinState.compare(previousPinState) != 0) {

                //serial.writeLine("pin: " + pin + " pinState: " + pinState + " previousPinState:" + previousPinState);

                if (pinState.compare("L") == 0) {
                    switchHandler(pin, Event.released)
                } else if (pinState.compare("H") == 0) {
                    switchHandler(pin, Event.pressed)
                }
            }
        }

        previousSwitchStates = switchStates;

        // if (switchStates.includes("H") == true) {
        //     switchHandler(Pins.Any, Event.pressed);
        // }

        // if (switchStates.includes("L") == true) {
        //     switchHandler(Pins.Any, Event.released);
        // }

   
    }
}