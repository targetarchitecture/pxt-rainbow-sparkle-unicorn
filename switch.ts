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
    //console.log("RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED");

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

 //console.log("RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED");

        //  SX1509state[]
       // touchState.eventValue = control.eventValue();

        handler();
      }
    );
  }  

  export let switchStates: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  export function _setSwitchStates(states : string)
  {
      //needs to be offset by one for the identifier
      states = states.replaceAll("E2,", "");

        for (let pin = 0; pin <= 15; pin++) {
            
        const state = parseInt(states.split(",")[pin]); 

        switchStates.set(pin, state);

        //serial.writeLine("pin " + pin + " state " + state);
        }  
  }

     /**
     * Get a switch state
     * @param pin 
     */   
    //% subcategory="Switch" 
    //% weight=80        
    //% block="Get the switch state on pin $pin"
  //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
  //% pin.fieldOptions.tooltips="false"    
    export function getSwitchState(pin: switchPins) {
        return switchStates.get(pin);
    } 


     /**
     * Updates all switch states
     */   
    //% subcategory="Expert" 
    //% group="Switch"     
    //% block="Updates all of the switch states"
    export function updateSwitchState() {
          _sendMessage("R1");
    } 


}