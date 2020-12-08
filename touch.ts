namespace RainbowSparkleUnicorn {

let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]


      /**
   * Do something when a touch sensor is touched or released.
   * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
   * @param action the trigger action
   * @param handler body code to run when the event is raised
   */
//   //% subcategory="Touch"
//   //% block="touch pin | %sensor | %action"
//   //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
//   //% sensor.fieldOptions.tooltips="false"
//   //% weight=65
//   export function onTouch(
//     sensor: TouchSensor,
//     action: TouchAction,
//     handler: () => void
//   ) {

//     control.onEvent(
//       action === TouchAction.Touched
//         ? RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED
//         : RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
//       sensor === TouchSensor.Any ? EventBusValue.MICROBIT_EVT_ANY : sensor,
//       () => {
//         //touchState.eventValue = control.eventValue();
//         handler();
//       }
//     );
//   }    

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
    pin: TouchSensor,
    handler: () => void
  ) {
    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED,
      pin === TouchSensor.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
      () => {
        //touchState.eventValue = control.eventValue();
        //MPR121touched[pin] = true

        if (pin != TouchSensor.Any){
            MPR121touched[pin] = true;   
        }

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
    pin: TouchSensor,
    handler: () => void
  ) {
    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
      pin === TouchSensor.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
      () => {

        if (pin != TouchSensor.Any){
            MPR121touched[pin] = false;   
        }

        handler();
      }
    );
  }     


export const enum TouchSensor {
    //% block="1"    
    T1 = 1,
    //% block="2"    
    T2 = 2,
    //% block="3" 
    T3 = 3,
    //% block="4" 
    T4 = 4,
    //% block="5" 
    T5 = 5,
    //% block="6" 
    T6 = 6,
    //% block="7" 
    T7 = 7,
    //% block="8" 
    T8 = 8,
    //% block="9" 
    T9 = 9,
    //% block="10" 
    T10 = 10,
    //% block="11" 
    T11 = 11,
    //% block="12"     
    T12 = 12,
    //% block="any"
    Any = 1 << 30
}

export const enum TouchAction {
    //% block="touched"
    Touched = 0,
    //% block="released"
    Released = 1
}

}