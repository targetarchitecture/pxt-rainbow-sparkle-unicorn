namespace RainbowSparkleUnicorn {

let ADC1Enabled = false;
let ADC2Enabled = false;
let ADC1value = 0;
let ADC2value = 0;

let Encoder1Enabled = false;
let Encoder2Enabled = false;
let Encoder1value = 0;
let Encoder2value = 0;
let direction1: RotaryDirection;
let direction2: RotaryDirection;

     /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Set dial 1 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    //% weight=65
    export function dial1(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-255
        let mapped = pins.map(voltage, 0, 30, 0, 255)

        sendMessage("X1," + mapped)
    }

   /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Set dial 2 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    //% weight=65
    export function dial2(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-255
        let mapped = pins.map(voltage, 0, 30, 0, 255)

        sendMessage("X2," + mapped)
    }

    /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 46
     */
    //% subcategory="Expert" 
    //% block="Set DAC 2 to $value"
    //% value.min=0 value.max=255
    export function DAC2(value: number) {

        value = Math.clamp(0, 255, value)

        sendMessage("X2," + value)
    }

     /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 194
     */
    //% subcategory="Expert" 
    //% block="Set DAC 1 to $value" 
    //% value.min=0 value.max=255
    export function DAC1(value: number) {

        value = Math.clamp(0, 255, value)

        sendMessage("X1," + value)
    }

     /**
     * Turn slider 1 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Turn Slider 1 $state"
        //% weight=60
    export function turnSlider1(state: OnOff) {
     sendMessage("U1," + state)
    }

     /**
     * Turn slider 2 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Turn Slider 2 $state"
        //% weight=65
    export function turnSlider2(state: OnOff) {
     sendMessage("U2," + state)
    }

     /**
     * Turn spinner 1 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Turn Spinner 1 $state"
    //% weight=70
    export function turnSpinner1(state: OnOff) {
     sendMessage("W1," + state)
    }

     /**
     * Turn spinner 2 on/off.
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Turn Spinner 2 $state"
        //% weight=68
    export function turnSpinner2(state: OnOff) {
     sendMessage("W2," + state)
    }


      /**
   * Do something when a rotary switch is turned.
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Sliders / Dials / Spinners"
  //% block="on Spinner 1 rotating"
  //% weight=65
  export function onRotary1Rotation(
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING,
      MICROBIT_EVT_ANY,
      () => {
       direction1 = control.eventValue();
        handler();
      }
    );
  }



      /**
   * Do something when a rotary switch is turned.
   * @param handler body code to run when the event is raised
   */
  //% subcategory="Sliders / Dials / Spinners"
  //% block="on Spinner 2 rotating"
  //% weight=65
  export function onRotary2Rotation(
    handler: () => void
  ) {

    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING,
      MICROBIT_EVT_ANY,
      () => {
       direction2 = control.eventValue();
        handler();
      }
    );
  }

    /**
     * A function that returns spinner one direction
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Spinner one direction" 
    export function Rotary1Direction(): RotaryDirection {
        return direction1;
    }

    /**
     * A function that returns spinner two direction
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Spinner two direction" 
    export function Rotary2Direction(): RotaryDirection {
        return direction2;
    }


//     export function onTouch2(
//     sensor: TouchSensor,
//     action: TouchAction,
//     handler: () => void
//   ) {

//     control.onEvent(
//       action === RotaryDirection.Touched
//         ? RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED
//         : RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED,
//       sensor === TouchSensor.Any ? EventBusValue.MICROBIT_EVT_ANY : sensor,
//       () => {
//         //touchState.eventValue = control.eventValue();
//         handler();
//       }
//     );
//   }


    /**
     * A function that returns slider one value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Slider one value" 
    export function Slider1(): number {
        return ADC1value;
    }

    /**
     * A function that returns slider two value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% block="Slider two value" 
    export function Slider2(): number {
        return ADC2value;
    }


export const enum RotarySensor {
    //% block="Rotary 1"    
    ROTARY1 = 1,
    //% block="Rotary 2"  
    ROTARY2 = 2
}

export const enum RotaryDirection {
     //% block="left"
     Left = 666,
     //% block="right"
     Right = 999
 }

}

enum OnOff {
    //% block="On"
    ON = 1,
    //% block="Off"
    OFF = 0
}
