namespace RainbowSparkleUnicorn.Switch {

let previousSwitchStates = "HHHHHHHHHHHHHHHH";

export function _onStateChange(switchStates :string){

    //serial.writeLine(switchStates);

    if (switchStates != previousSwitchStates){

        for (let index = 0; index < 16; index++) {

            const pinState = switchStates.charAt(index);
            const previousPinState = previousSwitchStates.charAt(index);

            serial.writeLine("index: " + index + " pinState: " + pinState + " previousPinState:" + previousPinState);

            if (pinState != previousPinState){
                if (pinState == "L"){

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, index+1);

                    // if (index == 0){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P0);}
                    //    if (index == 6){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P6);}
                    //     if (index == 7){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P7);}
                    //     if (index == 8){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P8);}
                    //     if (index == 9){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P9);}
                    //     if (index == 10){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P10);}
                    //     if (index == 11){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P11);}
                    //     if (index == 12){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P12);}
                    //     if (index == 13){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P13);}
                    //     if (index == 14){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P14);}
                    //     if (index == 15){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P15);}
                    //     if (index == 1){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P1);}
                    //     if (index == 2){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P2);}
                    //     if (index == 3){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P3);}
                    //     if (index == 4){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P4);}
                    //     if (index == 5){serial.writeLine("raise event: " + index); control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, switchPins.P5);}
                 } else if (pinState == "H"){

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, index+1);

                    // if (index == 0){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P0);}
                    // if (index == 1){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P1);}
                    // if (index == 2){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P2);}
                    // if (index == 3){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P3);}
                    // if (index == 4){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P4);}
                    // if (index == 5){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P5);}
                    // if (index == 6){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P6);}
                    // if (index == 7){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P7);}
                    // if (index == 8){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P8);}
                    // if (index == 9){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P9);}
                    // if (index == 10){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P10);}
                    // if (index == 11){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P11);}
                    // if (index == 12){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P12);}
                    // if (index == 13){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P13);}
                    // if (index == 14){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P14);}
                    // if (index == 15){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, switchPins.P15);}                    
           
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