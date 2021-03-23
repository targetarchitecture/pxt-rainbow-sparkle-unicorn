namespace RainbowSparkleUnicorn.Switch {

let previousSwitchStates = "HHHHHHHHHHHHHHHH";

export function _onStateChange(switchStates :string){

    //serial.writeLine(switchStates);

    if (switchStates != previousSwitchStates){

        for (let index = 0; index < 16; index++) {

            const pinState = switchStates.charAt(index);
            const previousPinState = previousSwitchStates.charAt(index);

            //serial.writeLine("index: " + index + " pinState: " + pinState + " previousPinState:" + previousPinState);

            if (pinState != previousPinState){
                if (pinState == "L"){
                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, index+1);
                } else if (pinState == "H"){
                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, index+1);
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
        handler();
      }
    );
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
        return previousSwitchStates.charAt(pin);
    } 

}