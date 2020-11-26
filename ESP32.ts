namespace RainbowSparkleUnicorn {

let ADC1Enabled = false;
let ADC2Enabled = false;
let Encoder1Enabled = false;
let Encoder2Enabled = false;
let ADC1value = 0;
let ADC2value  = 0;
let Encoder1value  = 0;
let Encoder2value  = 0;

 /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sliders / Dials" 
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
    //% subcategory="Sliders / Dials" 
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
    //% subcategory="Sliders / Dials" 
    //% block="Turn Slider 1 $state"
        //% weight=60
    export function startSlider1(state: OnOff) {
     sendMessage("U1," + state)
    }

     /**
     * Turn slider 2 on/off.
     */
    //% subcategory="Sliders / Dials" 
    //% block="Turn Slider 2 $state"
        //% weight=65
    export function startSlider2(state: OnOff) {
     sendMessage("U2," + state)
    }

}

enum OnOff {
    //% block="On"
    ON = 1,
    //% block="Off"
    OFF = 0
}
