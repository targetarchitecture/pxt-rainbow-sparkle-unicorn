

namespace RainbowSparkleUnicorn.Slider {

    control.onEvent(RAINBOW_SPARKLE_UNICORN_SLIDER_1, EventBusValue.MICROBIT_EVT_ANY, function () {
        Slider1 = control.eventValue() - pinOffset;
    })

    control.onEvent(RAINBOW_SPARKLE_UNICORN_SLIDER_2, EventBusValue.MICROBIT_EVT_ANY, function () {
        Slider2 = control.eventValue() - pinOffset;
    })

    export declare const enum Sliders {
        //% block="Slider 1"    
        Slider1 = 0,
        //% block="Slider 2"
        Slider2 = 1
    }

    let Slider1: number = 0;
    let Slider2: number = 0;

    /**
     * A function that returns slider one value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Get slider %slider value" 
    export function Value(slider: Sliders): number {

        if (slider == Sliders.Slider1) {
            return Slider1;
        } else {
            return Slider2;
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


