namespace RainbowSparkleUnicorn {

    /**
     * Do something when a touch sensor is touched or released.
     * @param sensor the touch sensor to be checked, eg: TouchSensor.T5
     * @param action the trigger action
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"   
    //% blockId=makerbit_touch_on_touch_sensor
    //% block="on touch sensor | %sensor | %action"
    //% sensor.fieldEditor="gridpicker" sensor.fieldOptions.columns=6
    //% sensor.fieldOptions.tooltips="false"
    //% weight=65
    export function onTouch(
        sensor: TouchSensor,
        action: TouchAction,
        handler: () => void
    ) {

        control.onEvent(
            action === TouchAction.Touched
                ? MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ID
                : MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ID,
            sensor === TouchSensor.Any ? MICROBIT_EVT_ANY : sensor,
            () => {

                //basic.showString(control.eventValue());

                // touchState.eventValue = control.eventValue();
                handler();
            }
        );
    }


    

}
