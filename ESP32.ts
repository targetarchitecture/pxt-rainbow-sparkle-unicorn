namespace RainbowSparkleUnicorn {

 /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="ADC / DAC" 
    //% block="Set ADC 1 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function ADC1(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-254
        let mapped = pins.map(voltage, 0, 30, 0, 254)

        sendMessage("X1," + mapped)
    }

   /**
     * Set the analog dial to a certain voltage.
     * @param voltage the touch sensor to be checked, eg: 15
     */
    //% subcategory="ADC / DAC" 
    //% block="Set ADC 2 to $voltage \\volts"
    //% voltage.min=0 voltage.max=30
    export function ADC2(voltage: number) {

        voltage = Math.clamp(0, 30, voltage)

        //Need to resolve 0-30 to 0-254
        let mapped = pins.map(voltage, 0, 30, 0, 254)

        sendMessage("X2," + mapped)
    }



}