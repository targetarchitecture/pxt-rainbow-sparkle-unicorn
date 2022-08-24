

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
    export function Value(slider: Sliders): number {

        if (slider == Sliders.Slider1) {
            return _Slider1;
        } else {
            return _Slider2;
        }
    }

    /**
    * Request the slider value.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Sliders"
    //% block="Request slider %slider value"
    //% weight=65
    export function RequestSliderValue(
        slider: Sliders
    ) {
        if (slider == Sliders.Slider1) {
            _sendMessage("SLIDER1");
        } else {
            _sendMessage("SLIDER2");
        }
    }
}


