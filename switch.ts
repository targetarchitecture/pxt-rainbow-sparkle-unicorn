namespace RainbowSparkleUnicorn {
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
  //% weight=65
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
  //% weight=70
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


export const enum switchPins {
    //% block="Pin 0"
    Pin0 = 0,      
    //% block="Pin 1"
    Pin1 = 1,
    //% block="Pin 2"
    Pin2 = 2,
    //% block="Pin 3"
    Pin3 = 3,  
    //% block="Pin 4"
    Pin4 = 4,
    //% block="Pin 5"
    Pin5 = 5,
    //% block="Pin 6"
    Pin6 = 6,
    //% block="Pin 7"
    Pin7 = 7,
    //% block="Pin 8"
    Pin8 = 8,
    //% block="Pin 9"
    Pinh9 = 9,
    //% block="Pin 10"
    Pin10 = 10,
    //% block="Pin 11"
    Pin11 = 11,
    //% block="Pin 12"
    Pin12 = 12,
    //% block="Pin 13"
    Pin13 = 13,
    //% block="Pin 14"
    Pin14 = 14,
    //% block="Pin 15"
    Pin15 = 15,
     //% block="Any" 
    Any     
}



}