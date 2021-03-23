namespace RainbowSparkleUnicorn.Touch {

    //let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]

 //export let _touchStates = "";
 let previousTouchStates = "";

export function _onStateChange(touchStates :string){

    if (touchStates != previousTouchStates){

        for (let index = 0; index < 12; index++) {

            const pinState = touchStates.charAt(index);
            const previousPinState = previousTouchStates.charAt(index);

            if (pinState != previousPinState){
                if (pinState == "H"){
                    if (index == 0){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P0);}
                    if (index == 1){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P1);}
                    if (index == 2){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P2);}
                    if (index == 3){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P3);}
                    if (index == 4){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P4);}
                    if (index == 5){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P5);}
                    if (index == 6){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P6);}
                    if (index == 7){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P7);}
                    if (index == 8){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P8);}
                    if (index == 9){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P9);}
                    if (index == 10){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P10);}
                    if (index == 11){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, touchPins.P11);}              
                }

                if (pinState == "L"){
                    if (index == 0){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P0);}
                    if (index == 1){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P1);}
                    if (index == 2){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P2);}
                    if (index == 3){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P3);}
                    if (index == 4){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P4);}
                    if (index == 5){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P5);}
                    if (index == 6){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P6);}
                    if (index == 7){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P7);}
                    if (index == 8){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P8);}
                    if (index == 9){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P9);}
                    if (index == 10){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P10);}
                    if (index == 11){control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, touchPins.P11);}              
                }         
            }
        }

        previousTouchStates = touchStates;
    }
}


    /**
     * Do something when a touch sensor is touched or released.
     * @param pin the pin which is the touch button on 
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="when touching on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
    //% pin.fieldOptions.tooltips="false"   
    //% weight=100
    export function onButtonTouched(
        pin: touchPins,
        handler: () => void
    ) {
        control.onEvent(
        RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED,
        pin === touchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
        () => {
            handler();
            }
        ); 
    }     

  /**
   * Do something when a touch sensor is released.
   * @param pin the pin which is the touch button on
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Touch"
  //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
  //% pin.fieldOptions.tooltips="false"  
  //% block="when touch stopped on pin | %pin"
  //% weight=90
  export function onButtonReleased(
    pin: touchPins,
    handler: () => void
  ) {
    // control.onEvent(
    //   RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
    //   pin,
    //   () => {
    //     //MPR121touched[pin] = false;   
    //     handler();
    //   }
    // );

         control.onEvent(
        RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
        pin === touchPins.Any ? EventBusValue.MICROBIT_EVT_ANY : pin,
        () => {
            handler();
             }
        );    
  }   



    /**
     * Set the touch and release thresholds for all 13 channels on the
     * @param touchThreshold the touch threshold value from 0 to 255.
     * @param releaseThreshold the release threshold value from 0 to 255.
     */
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the touch and release thresholds $touchThreshold , $releaseThreshold"
    //% releaseThreshold.min=0 releaseThreshold.max=255 releaseThreshold.defl=6
    //% touchThreshold.min=0 touchThreshold.max=255 touchThreshold.defl=12
    export function setTouchThresholds(touchThreshold: number,releaseThreshold: number) {
        _sendMessage("S1," + touchThreshold + "," +releaseThreshold );
    } 
    
     /**
     * Set the debounce timing
     * @param timing 
     */   
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the debounce timing $timing"
    //% timing.min=0 timing.max=100 timing.defl=50
    export function setDebounceDelay(timing: number) {
        _sendMessage("S2," + timing );
    } 

}