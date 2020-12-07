namespace RainbowSparkleUnicorn {
    export let SX1509state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

   /**
   * Do something when a switch is pressed or released.
   * @param sensor the pin to be checked, eg: switchPins.SP8
   * @param action the switch action
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="Switch Pressed on pin | %switchPin"
  //% sensor.fieldEditor="gridpicker" switchPin.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=65
  export function onSwitchPressed(
    switchPin: switchPins,
    handler: () => void
  ) {

    control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED,
      switchPin === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : switchPin,
      () => {

        if (switchPin != switchPins.Any){
                SX1509state[switchPin] = switchState.pressed;   
        }

        handler();
      }
    );
  }    


   /**
   * Do something when a switch is released.
   * @param sensor the pin to be checked, eg: switchPins.SP8
   * @param action the switch action
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Switch"
  //% block="Switch Released on pin | %switchPin"
  //% sensor.fieldEditor="gridpicker" switchPin.fieldOptions.columns=6
  //% sensor.fieldOptions.tooltips="false"
  //% weight=65
  export function onSwitchReleased(
    switchPin: switchPins,
    handler: () => void
  ) {

    control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED,
      switchPin === switchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : switchPin,
      () => {

        if (switchPin != switchPins.Any){
                SX1509state[switchPin] = switchState.released;   
        }

        handler();
      }
    );
  }    


export enum switchState {
    //% block="pressed"
    pressed = 1,
    //% block="released"
    released = 0
}    

export const enum switchPins {
    //% block="1"    
    SP1 = 1,
    //% block="2"    
    SP2 = 2,
    //% block="3" 
    SP3 = 3,
    //% block="4" 
    SP4 = 4,
    //% block="5" 
    SP5 = 5,
    //% block="6" 
    SP6 = 6,
    //% block="7" 
    SP7 = 7,
    //% block="8" 
    SP8 = 8,
    //% block="9" 
    SP9 = 9,
    //% block="10" 
    SP10 = 10,
    //% block="11" 
    SP11 = 11,
    //% block="12"     
    SP12 = 12,
    //% block="any"
    Any = 1 << 30
}



}