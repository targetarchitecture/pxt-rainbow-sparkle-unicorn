namespace RainbowSparkleUnicorn.Switch {
    //export let SX1509state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  /**
   * Do something when a switch is pushed.
   * @param pin the switch pin to be checked
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="on switch pressed on | %pin"
  //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
  //% pin.fieldOptions.tooltips="false"
  //% weight=100
 export function onSwitchPressed(
    pin: switchPins,
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED,
      pin === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
      () => {
        //  SX1509state[]
       // touchState.eventValue = control.eventValue();
        handler();
      }
    );
  }

   /**
   * Do something when a switch is released.
   * @param pin the pin to be checked
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="on switch released on | %pin"
  //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
  //% pin.fieldOptions.tooltips="false"
  //% weight=90
  export function onSwitchReleased(
    pin: switchPins,
    handler: () => void
  ) {

  control.onEvent(
      RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED,
      pin === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
      () => {
        //  SX1509state[]
       // touchState.eventValue = control.eventValue();
        handler();
      }
    );
  }    
}