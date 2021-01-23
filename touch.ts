namespace RainbowSparkleUnicorn.Touch {

    let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]

    /**
     * Do something when a touch sensor is touched or released.
     * @param pin the pin which is the touch button on 
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="when touching on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
    //% pin.fieldOptions.tooltips="false"   
    //% weight=100
    export function onButtonTouched(
        pin: touchPins,
        handler: () => void
    ) {
        control.onEvent(
        RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED,
        pin,
        () => {
            MPR121touched[pin] = true;  

            handler();
        }
        );
    }     

  /**
   * Do something when a touch sensor is released.
   * @param pin the pin which is the touch button on
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Touch"
  //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
  //% pin.fieldOptions.tooltips="false"  
  //% block="when touch stopped on pin | %pin"
  //% weight=90
  export function onButtonReleased(
    pin: touchPins,
    handler: () => void
  ) {
    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
      pin,
      () => {

        MPR121touched[pin] = false;   

        handler();
      }
    );
  }    
}