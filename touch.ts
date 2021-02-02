namespace RainbowSparkleUnicorn.Touch {

    //let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]

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
        pin,
        () => {
            //MPR121touched[pin] = true;  

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
    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
      pin,
      () => {

        //MPR121touched[pin] = false;   

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
    //% timing.min=0 timing.max=100 timing.defl=50
    export function setDebounceDelay(timing: number) {
        _sendMessage("S2," + timing );
    } 

}