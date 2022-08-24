
// namespace RainbowSparkleUnicorn.Expert {

//     /**
//      * Restart the ESP32 processor on the board
//      */
//     //% subcategory="Expert" 
//     //% group="Debug"       
//     //% block="Restart ESP32"
//     export function restartESP32(): void {
//         _sendMessage("RESTART");
//     }

//     /**
//      * Show a message on the USB of the ESP32, maximum message size is 100 characters
//      * @param message the string to send to the ESP32
//      */
//     //% subcategory="Expert" 
//     //% group="Debug"       
//     //% block="Send Debug Message $message"
//     export function SendDebugMessage(message: string): void {

//         message = message.substr(0, 100);

//         _sendMessage("DEBUG," + message);
//     }
// }

