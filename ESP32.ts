namespace RainbowSparkleUnicorn {

 /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="ADC / DAC" 
    //% block="Set Dial 1 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function Dial1(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-255
        let mapped = pins.map(voltage, 0, 30, 0, 255)

        sendMessage("X1," + mapped)
    }

   /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="ADC / DAC" 
    //% block="Set Dial 2 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function Dial2(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-255
        let mapped = pins.map(voltage, 0, 30, 0, 255)

        sendMessage("X2," + mapped)
    }

    /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 46
     */
    //% subcategory="ADC / DAC" 
    //% block="Set DAC 2 to $value \\volts"
    //% value.min=0 value.max=255
    export function DAC2(value: number) {

        value = Math.clamp(0, 255, value)

        sendMessage("X2," + value)
    }

       /**
     * Set the DAC to a certain value.
     * @value the value of the DAC output, eg: 194
     */
    //% subcategory="ADC / DAC" 
    //% block="Set DAC 1 to $value \\volts"
    //% value.min=0 value.max=255
    export function DAC1(value: number) {

        value = Math.clamp(0, 255, value)

        sendMessage("X1," + value)
    }


}