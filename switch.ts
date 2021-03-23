namespace RainbowSparkleUnicorn.Switch {

 let previousSwitchStates = "";

export function _onStateChange(switchStates :string){

    if (switchStates != previousSwitchStates){

        for (let index2 = 0; index2 <= 12; index2++) {

        const pinState = switchStates.charAt(index2);
        const previousPinState = previousSwitchStates.charAt(index2);

            if (pinState != previousPinState){
                if (pinState == "H"){
                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, index2)
                }

                if (pinState == "L"){
                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, index2)
                }         
            }
        }

        previousSwitchStates = switchStates;
    }
}



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

  //let switchStates: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//   let switchStates = "";

//   function setSwitchStates(states : string)
//   {
//       //needs to be offset by one for the identifier
//       states = states.replaceAll("E2,", "");

//         for (let pin = 0; pin <= 15; pin++) {
            
//         const state = parseInt(states.split(",")[pin]); 

//         switchStates.set(pin, state);

//         //serial.writeLine("pin " + pin + " state " + state);
//         }  
//   }

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
        return previousSwitchStates.charAt(pin);
    } 

}