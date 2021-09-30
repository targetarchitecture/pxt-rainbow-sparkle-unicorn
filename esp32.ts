
    let Encoder1value = 0;
    let Encoder2value = 0;
    let direction1: RotaryDirection;
    let direction2: RotaryDirection;

    /**
     * Get the rotary encoder value
    */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Get spinner 2 value"
    //% weight=65
    export function encoder2value(): number {

        const value = parseInt(_readMessage("ROTARY2"));

        if (value < Encoder2value){
            direction2 = RotaryDirection.Left;
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Left)
        }
        if (value > Encoder2value) {
            direction2 = RotaryDirection.Right;
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Right)
        }

        Encoder2value=value;

        return Encoder2value;
    }

    /**
 * Get the rotary encoder value
*/
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Get spinner 1 value"
    //% weight=65
    export function encoder1value(): number {

        const value = parseInt(_readMessage("ROTARY1"));

        if (value < Encoder1value) {
            direction1 = RotaryDirection.Left;
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING, RotaryDirection.Left)
        }
        if (value > Encoder1value) {
            direction1 = RotaryDirection.Right;
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING, RotaryDirection.Right)
        }

        Encoder1value = value;

        return Encoder1value;
    }


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
        _sendMessage("DIAL1," + Math.clamp(0, 255, value))
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
        _sendMessage("DIAL2," + Math.clamp(0, 255, value))
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
        return parseInt(_readMessage("SLIDER1"));
    }

    /**
     * A function that returns slider two value
     */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Sliders" 
    //% block="Slider two value" 
    export function Slider2(): number {
        return parseInt(_readMessage("SLIDER2"));
    }
}
