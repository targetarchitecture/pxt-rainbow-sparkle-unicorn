namespace RainbowSparkleUnicorn {
    
    /**
     * Restart the ESP32 processor on the board
     */
    //% subcategory="Expert" 
     //% group="Debug"       
    //% block="Restart ESP32"
    export function restartESP32(): void {
        _sendMessage("RESTART");
    }

}