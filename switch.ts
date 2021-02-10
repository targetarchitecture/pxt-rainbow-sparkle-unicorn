namespace RainbowSparkleUnicorn.Switch {
   
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

  export let switchStates: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  export function _setSwitchStates(states : string){

    for (let pin = 0; pin <= 15; pin++) {
        //needs to be offset by one for the identifier
      const state = parseInt(states.split(",")[pin+1]); 

      switchStates[pin] = state;
    }  
  }

}