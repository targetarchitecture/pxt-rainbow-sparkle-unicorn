namespace RainbowSparkleUnicorn {

    const ESP32_I2C_ADDR = 4;
    const readBufferLength = 128; //40; //32;

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

        sendMessage(message);

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);
    }

    function sendMessage(message: string): void {

        //add the leader and trailer
        message = "@@" + message + "##";

        let num = 0;
        num = message.length;
        let txBuf = pins.createBuffer(num);

        // let buf2 = pins.createBuffer(num + 4);
        // let crcbuf = pins.createBuffer(num);
        // buf2[0] = 2
        // buf2[1] = num + 4
        // for (let j = 0; j <= num - 1; j++) {
        //     buf2[j + 2] = message.charCodeAt(j)
        //     crcbuf[j] = message.charCodeAt(j)
        // }
        // buf2[num + 2] = calcCRC8(crcbuf, num)
        // buf2[num + 3] = 4

        for (let j = 0; j <= num - 1; j++) {
            txBuf[j] = message.charCodeAt(j)
            //crcbuf[j] = message.charCodeAt(j)
        }

        pins.i2cWriteBuffer(ESP32_I2C_ADDR, txBuf, false);
    }

    export function _readMessage(message: string): string {

        pins.digitalWritePin(DigitalPin.P8, 1);
        basic.pause(1);

        //send first
        sendMessage(message);

        let i2cBuffer = pins.i2cReadBuffer(ESP32_I2C_ADDR, readBufferLength, false);

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);

        let currentRecievedMessage = "";

        for (let k = 0; k <= readBufferLength; k++) {

            if (i2cBuffer[k] != 255 && i2cBuffer[k] != 0) {
                currentRecievedMessage = currentRecievedMessage + String.fromCharCode(i2cBuffer[k]);
            }
        }

        if (currentRecievedMessage.substr(0, 2) == "@@" &&
            currentRecievedMessage.substr(-2, 2) == "##") {
            currentRecievedMessage = currentRecievedMessage.replace("@@", "").replace("##", "");
        } else {
            currentRecievedMessage = "";
        }

        serial.writeLine("currentRecievedMessage:" + currentRecievedMessage);

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

    // function calcCRC8(data: Buffer, length: number): number {
    //     let crc = 0;
    //     let extract;
    //     let sum;

    //     for (let n = 0; n < length; n++) {
    //         extract = data[n];

    //         for (let o = 8; o; o--) {
    //             sum = (crc ^ extract) & 0x01;
    //             crc >>= 1;
    //             if (sum) {
    //                 crc ^= 0x8C;
    //             }
    //             extract >>= 1;
    //         }
    //     }

    //     return crc;
    // }
}