namespace RainbowSparkleUnicorn.Controls {

    let ADC1Enabled = false;
    let ADC2Enabled = false;
    let ADC1value = 0;
    let ADC2value = 0;

    //store previous value so it's only sending changes
    let previousDAC1value = 0;
    let previousDAC2value = 0;

    let Encoder1Enabled = false;
    let Encoder2Enabled = false;
    let Encoder1value = 0;
    let Encoder2value = 0;
    let direction1: RotaryDirection;
    let direction2: RotaryDirection;

     /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Dials"
    //% block="Set dial 1 to $value"
    //% value.min=0 value.max=255
    //% weight=65
    export function dial1(value: number) {

        value = Math.clamp(0, 255, value)

        //Need to resolve 0-30 to 0-255
        //let mapped = pins.map(value, 0, 30, 0, 255)

        if (value != previousDAC1value){
            _sendMessage("X2," + value)
        }

        //remember previous value
        previousDAC1value = value
    }

   /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Dials"
    //% block="Set dial 2 to $value"
    //% value.min=0 value.max=255
    //% weight=65
    export function dial2(value: number) {

        value = Math.clamp(0, 255, value)

        //Need to resolve 0-30 to 0-255
        //let mapped = pins.map(value, 0, 30, 0, 255)

        if (value != previousDAC2value){
            _sendMessage("X1," + value)
        }

        //remember previous value
        previousDAC2value = value
    }



     /**
     * Turn slider 1 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Turn Slider 1 $state"
    //% weight=60
    export function turnSlider1(state: OnOff) {
     _sendMessage("U1," + state)
    }

     /**
     * Turn slider 2 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Turn Slider 2 $state"
    //% weight=65
    export function turnSlider2(state: OnOff) {
     _sendMessage("U2," + state)
    }

     /**
     * Turn spinner 1 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Turn Spinner 1 $state"
    //% weight=70
    export function turnSpinner1(state: OnOff) {
     _sendMessage("W1," + state)
    }

     /**
     * Turn spinner 2 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Turn Spinner 2 $state"
        //% weight=68
    export function turnSpinner2(state: OnOff) {
     _sendMessage("W2," + state)
    }


      /**
   * Do something when a rotary switch is turned.
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Sliders / Dials / Spinners"
  //% group="Spinners"
  //% block="on Spinner 1 rotating"
  //% weight=65
  export function onRotary1Rotation(
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING,
      EventBusValue.MICROBIT_EVT_ANY,
      () => {
       direction1 = control.eventValue();
        handler();
      }
    );
  }




      /**
   * Do something when a rotary switch is turned.
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Sliders / Dials / Spinners"
  //% group="Spinners"
  //% block="on Spinner 2 rotating"
  //% weight=65
  export function onRotary2Rotation(
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING,
      EventBusValue.MICROBIT_EVT_ANY,
      () => {
       direction2 = control.eventValue();
        handler();
      }
    );
  }

    /**
     * A function that returns spinner one direction
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Spinner one direction" 
    export function Rotary1Direction(): RotaryDirection {
        return direction1;
    }

    /**
     * A function that returns spinner two direction
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Spinner two direction" 
    export function Rotary2Direction(): RotaryDirection {
        return direction2;
    }


    /**
     * A function that returns slider one value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Slider one value" 
    export function Slider1(): number {
        return ADC1value;
    }

    /**
     * A function that returns slider two value
     */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Sliders" 
    //% block="Slider two value" 
    export function Slider2(): number {
        return ADC2value;
    }

}

namespace RainbowSparkleUnicorn.Expert {
    /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 46
     */
    //% subcategory="Expert" 
      //% group="Dials"      
    //% block="Set DAC 2 to $value"
    //% value.min=0 value.max=255
    export function DAC2(value: number) {

        value = Math.clamp(0, 255, value)

        _sendMessage("X2," + value)
    }

     /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 194
     */
    //% subcategory="Expert" 
     //% group="Dials"   
    //% block="Set DAC 1 to $value" 
    //% value.min=0 value.max=255
    export function DAC1(value: number) {

        value = Math.clamp(0, 255, value)

        _sendMessage("X1," + value)
    }
}