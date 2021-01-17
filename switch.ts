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
//   export function onSwitchPressed(
//     switchPin: switchPins,
//     handler: () => void
//   ) {
//     control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPin,  () => {

//     serial.writeLine("RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED");
  
//         SX1509state[switchPin] = switchState.pressed;   

//         handler();
//       }
//     );
//   }    


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
//   export function onSwitchReleased(
//     switchPin: switchPins,
//     handler: () => void
//   ) {
//     control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPin , () => {

//       serial.writeLine("RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED");
  

//         SX1509state[switchPin] = switchState.released;   

//         handler();
//       }
//     );
//   }    


export const enum switchState {
    //% block="pressed"
    pressed = 1,
    //% block="released"
    released = 0
}    

export const enum switchPins {
    //% block="Pin 0"
    Switch0 = 0,      
    //% block="Pin 1"
    Switch1 = 1,
    //% block="Pin 2"
    Switch2 = 2,
    //% block="Pin 3"
    Switch3 = 3,  
    //% block="Pin 4"
    Switch4 = 4,
    //% block="Pin 5"
    Switch5 = 5,
    //% block="Pin 6"
    Switch6 = 6,
    //% block="Pin 7"
    Switch7 = 7,
    //% block="Pin 8"
    Switch8 = 8,
    //% block="Pin 9"
    Switch9 = 9,
    //% block="Pin 10"
    Switch10 = 10,
    //% block="Pin 11"
    Switch11 = 11,
    //% block="Pin 12"
    Switch12 = 12,
    //% block="Pin 13"
    Switch13 = 13,
    //% block="Pin 14"
    Switch14 = 14,
    //% block="Pin 15"
    Switch15 = 15
}



}