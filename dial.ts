
namespace RainbowSparkleUnicorn.Dial {

    export declare const enum Dials {
        //% block="Dial 1"    
        Dial1 = 0,
        //% block="Dial 2"
        Dial2 = 1
    }

    /**
    * Set the analog dial to a certain voltage.
    * @param voltage the touch sensor to be checked, eg: 15
    */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Dials"
    //% block="Set dial %dial to $value"
    //% value.min=0 value.max=255
    //% weight=65
    export function value(dial: Dials, value: number) {

        value = Math.round(value);
        //value = Math.clamp(0, 255, value);

        if (dial == Dials.Dial1) {
            _sendMessage("DIAL1," + value)
        }
        else {
            _sendMessage("DIAL2," + value)
        }
    }
}
