namespace RainbowSparkleUnicorn {

export let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]


      /**
   * Do something when a touch sensor is touched or released.
   * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
   * @param action the trigger action
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Touch"
  //% blockId=makerbit_touch_on_touch_sensor
  //% block="touch sensor | %sensor | %action"
  //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=65
  export function onTouch(
    sensor: TouchSensor,
    action: TouchAction,
    handler: () => void
  ) {

    control.onEvent(
      action === TouchAction.Touched
        ? RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED
        : RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
      sensor === TouchSensor.Any ? EventBusValue.MICROBIT_EVT_ANY : sensor,
      () => {
        //touchState.eventValue = control.eventValue();
        handler();
      }
    );
  }


const enum TouchSensor {
    T1 = 1,
    T2 = 2,
    T3 = 3,
    T4 = 4,
    T5 = 5,
    T6 = 6,
    T7 = 7,
    T8 = 8,
    T9 = 9,
    T10 = 10,
    T11 = 11,
    T12 = 12,
    //% block="any"
    Any = 1 << 30
}

const enum TouchAction {
    //% block="touched"
    Touched = 0,
    //% block="released"
    Released = 1,
}

}