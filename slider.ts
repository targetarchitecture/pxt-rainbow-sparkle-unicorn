
namespace RainbowSparkleUnicorn.Slider {

    export declare const enum Sliders {
        //% block="Slider 1"    
        Slider1 = 0,
        //% block="Slider 2"
        Slider2 = 1
    }

    export let _Slider1: number = 0;
    export let _Slider2: number = 0;

    /**
     * A function that returns slider one value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Get slider %slider value" 
    export function value(slider: Sliders): number {

        if (slider == Sliders.Slider1) {
            return _Slider1;
        } else {
            return _Slider2;
        }
    }

}
// Add your code here
