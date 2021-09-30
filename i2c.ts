namespace RainbowSparkleUnicorn {

    const ESP32_I2C_ADDR = 4;
    const readBufferLength = 40; //32;

    //i2c freq=100000
    //let currentRecievedMessage = "";
    //export let messageQueue = ["HELLO"];
    //export let messageQueue: string[] = [];
    //let i2cGapMessageTimeMs = 50;
    //let i2cTXrateMs = 50; 

    /**
     * Set i2c timings
     * @GapMessageTimeMs time to send i2c message if no messages in queue
     * @TXrateMs time between each i2c message being sent
     */
    //% subcategory="Expert" 
    //% group="i2c" 
    //% inlineInputMode=inline
    //% block="set i2c timings: gap message (ms) $GapMessageTimeMs, TX rate (ms) $TXrateMs"   
    //% GapMessageTimeMs.defl=50
    //% TXrateMs.defl=50
    // export function seti2ctimings( GapMessageTimeMs: number, TXrateMs: number) {
    //    i2cGapMessageTimeMs = GapMessageTimeMs;
    //    i2cTXrateMs = TXrateMs;
    // }    

    export function _sendMessage(message: string): void {             

        pins.digitalWritePin(DigitalPin.P8, 1);
        basic.pause(1);

        _sendMessage(message);

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);
   }

     function sendMessage(message: string): void {

         let num = 0;
         num = message.length
         let buf2 = pins.createBuffer(num + 4);
         let crcbuf = pins.createBuffer(num);
         buf2[0] = 2
         buf2[1] = num + 4
         for (let j = 0; j <= num - 1; j++) {
             buf2[j + 2] = message.charCodeAt(j)
             crcbuf[j] = message.charCodeAt(j)
         }
         buf2[num + 2] = calcCRC8(crcbuf, num)
         buf2[num + 3] = 4

         pins.i2cWriteBuffer(ESP32_I2C_ADDR, buf2, false);

    }

    // function checkMessageTOBEREMOVED(message: string): boolean
    //  {
    //     if (message.isEmpty() == true){
    //         return false;
    //     }
    //     if (message.length < 3) {
    //         return false;
    //     }
    //     let X = message.split(",");
    //     let Y = X.length;
    //      if (Y < 2){
    //         return false;
    //     }
    //     return true;
    //  }

    export function _readMessage(message: string): string {   

        pins.digitalWritePin(DigitalPin.P8, 1);
        basic.pause(1);

        //send first
        sendMessage(message);

        //pause
        basic.pause(1);

        let startIndex = 0;
        let i2cBuffer = pins.i2cReadBuffer(ESP32_I2C_ADDR, readBufferLength, false);

        for (let k = 0; k <= readBufferLength; k++) {
            // find packet start
            if (i2cBuffer[k] == 2) {
                startIndex = k
            }
        }

        //let a4 = 0;
        //let a3 = 0;
        let a1 = 0;
        let a2 = 0;

        a1 = i2cBuffer[startIndex];
        let contentLength = i2cBuffer[startIndex+1]-4;

        //serial.writeValue("contentLength", contentLength);

        let currentRecievedMessage = "";

        if (contentLength > 0){

            for (let l = 0; l < contentLength ; l++) {
                a2 =  i2cBuffer[l+2] ;

                if (a2 != 255 && a2 != 0){
                    currentRecievedMessage = currentRecievedMessage + String.fromCharCode(a2);
                }
            }

            currentRecievedMessage = currentRecievedMessage.trim();

        }

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);

        return currentRecievedMessage;
    }

    //this loop takes off the queue (array) and sends it down the i2c line
    // basic.forever(() => {
    //     if (_readyToUseI2C == true)            
    //     {  
    //         if (messageQueue.length > 0){ 
    //             const message = messageQueue.shift();
    //             _sendi2cMessage(message);
    //         }
    //     }
    //     basic.pause(i2cTXrateMs);
    // })

    //this loop just adds a i2c message pull request every 50 milliseconds if not already something in the queue
    // basic.forever(() => {
    //     if (_readyToUseI2C == true)            
    //     {
    //         if (messageQueue.length == 0){
    //             messageQueue.push("00," + input.runningTime());
    //         }    
    //     }
    //     basic.pause(i2cGapMessageTimeMs);
    // })

    function calcCRC8(data :Buffer, length :number) :number {
        let crc = 0;
        let extract;
        let sum;

        for (let n = 0; n < length; n++) {
            extract = data[n];

            for (let o = 8; o; o--) {
                sum = (crc ^ extract) & 0x01;
                crc >>= 1;
                if (sum) {
                    crc ^= 0x8C;
                }
                extract >>= 1;
            }
        }

        return crc;
    }
}