namespace RainbowSparkleUnicorn.Spinner {

    export declare const enum Spinners {
        //% block="Rotary 1"    
        Spinner1 = 0,
        //% block="Rotary 2"  
        Spinner2 = 1
    }

    export declare const enum Rotation {
        //% block="left"
        Left = 0,
        //% block="right"
        Right = 1
    }

    let Encoder1value = 0;
    let Encoder2value = 0;
    let direction1: Rotation;
    let direction2: Rotation;

    let spinner_left: Action[] = [
        () => { },
        () => { },
    ];

    let spinner_right: Action[] = [
        () => { },
        () => { },
    ];

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
     * A function that returns spinner one direction
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Get spinner %spinner direction" 
    export function Direction(spinner: Spinners): Rotation {
        if (spinner == Spinners.Spinner1) {
            return direction1;
        }
        else {
            return direction2;
        }
    }

    /**
    * Do something when a rotary switch is turned.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Spinners"
    //% block="When spinner %spinner| is rotating %direction"
    //% weight=65
    export function on(spinner: Spinners, direction: Rotation, handler: Action) {

        if (spinner == Spinners.Spinner1 && direction == Rotation.Left) {
            spinner_left[Spinners.Spinner1] = handler;
        }
        else if (spinner == Spinners.Spinner1 && direction == Rotation.Right) {
            spinner_right[Spinners.Spinner1] = handler;
        }
        else if (spinner == Spinners.Spinner2 && direction == Rotation.Left) {
            spinner_left[Spinners.Spinner2] = handler;
        }
        else if (spinner == Spinners.Spinner2 && direction == Rotation.Right) {
            spinner_right[Spinners.Spinner2] = handler;
        }
    }

    export function _dealWithSpinner1Message(value: number) {

        if (value < Encoder1value) {
            direction1 = Rotation.Left;
            Encoder1value = value;
            spinnerHandler(Spinners.Spinner1, Rotation.Left)
        } else {
            direction1 = Rotation.Right;
            Encoder1value = value;
            spinnerHandler(Spinners.Spinner1, Rotation.Right)
        }
    }

    export function _dealWithSpinner2Message(value: number) {

        if (value < Encoder2value) {
            direction2 = Rotation.Left;
            Encoder2value = value;
            spinnerHandler(Spinners.Spinner2, Rotation.Left)
        } else {
            direction2 = Rotation.Right;
            Encoder2value = value;
            spinnerHandler(Spinners.Spinner2, Rotation.Right)
        }
    }

    function spinnerHandler(spinner: Spinners, direction: Rotation) {

        //serial.writeLine("fn triggerHandler")
        //serial.writeString(pin.toString())

        switch (direction) {
            case Rotation.Left:
                spinner_left[spinner]();
                break;
            case Rotation.Right:
                spinner_right[spinner]();
                break;
        }
    }




}
