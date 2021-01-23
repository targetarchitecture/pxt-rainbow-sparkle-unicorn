namespace RainbowSparkleUnicorn.Switch {
    //export let SX1509state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  /**
   * Do something when a switch is pushed.
   * @param sensor the switch pin to be checked, eg: switchPins.Pin11
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="on switch pressed on | %sensor"
  //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=100
 export function onSwitchPressed(
    sensor: switchPins,
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED,
      sensor === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : sensor,
      () => {
        //  SX1509state[]
       // touchState.eventValue = control.eventValue();
        handler();
      }
    );
  }

   /**
   * Do something when a switch is released.
   * @param sensor the pin to be checked, eg: switchPins.Pin5
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="on switch released on | %sensor"
  //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=90
  export function onSwitchReleased(
    sensor: switchPins,
    handler: () => void
  ) {

  control.onEvent(
      RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED,
      sensor === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : sensor,
      () => {
        //  SX1509state[]
       // touchState.eventValue = control.eventValue();
        handler();
      }
    );
  }    
}