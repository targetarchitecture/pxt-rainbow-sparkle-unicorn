
namespace RainbowSparkleUnicorn.Spinner {

    //let pinOffset = 1000;

    export declare const enum Spinners {
        //% block="Rotary 1"    
        Spinner1 = 0,
        //% block="Rotary 2"  
        Spinner2 = 1
    }

    let Encoder1value = 0;
    let Encoder2value = 0;

    /**
    * Get the spiner value
    */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Get spinner %spinner value"
    //% weight=65
    export function Value(spinner: Spinners): number {

        if (spinner == Spinners.Spinner1) {
            return Encoder1value;
        }
        else {
            return Encoder2value;
        }
    }

    /**
    * Do something when a rotary switch is turned.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Spinners"
    //% block="When spinner %spinner| is rotating"
    //% weight=65
    export function onRotation(
        spinner: Spinners,
        handler: (pin: number) => void
    ) {
        if (spinner == Spinners.Spinner1) {

            control.onEvent(
                RAINBOW_SPARKLE_UNICORN_SPINNER_1,
                EventBusValue.MICROBIT_EVT_ANY,
                () => {
                    Encoder1value = control.eventValue() - pinOffset;
                    handler(control.eventValue() - pinOffset);
                }
            );
        } else {
            control.onEvent(
                RAINBOW_SPARKLE_UNICORN_SPINNER_2,
                EventBusValue.MICROBIT_EVT_ANY,
                () => {
                    Encoder2value = control.eventValue() - pinOffset;
                    handler(control.eventValue() - pinOffset);
                }
            );
        }
    }



    /**
    * Request the spinner value.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Spinners"
    //% block="Request spinner %spinner value"
    //% weight=65
    export function RequestSpinnerValue(
        spinner: Spinners
    ) {
        if (spinner == Spinners.Spinner1) {
            _sendMessage("ROTARY1");
        } else {
            _sendMessage("ROTARY2");
        }
    }
}
