namespace RainbowSparkleUnicorn {

    
    /**
     * Restart the ESP32 processor on the board
     */
    //% subcategory="Expert" 
    //% block=Restart ESP32
    export function restartESP32(): void {
        _sendMessage("RESTART");
    }

    /**
     * Write a comment
     * @param theComment eg:'write comment here'
     */
    //% subcategory="Expert" 
    //% block=comment|%theComment
    export function comment(theComment: string): void {
        // do nothing
    }

}