namespace RainbowSparkleUnicorn.Touch {

let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]

   /**
   * Do something when a touch sensor is touched or released.
   * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
   * @param action the trigger action
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Touch"
  //% block="when touching on pin %pin"
  //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=65
  export function onButtonTouched(
    pin: TouchPin,
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
   * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
   * @param action the trigger action
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Touch"
  //% block="when touch stopped on pin | %pin"
  //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=65
  export function onButtonReleased(
    pin: TouchPin,
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