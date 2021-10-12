namespace RainbowSparkleUnicorn {

    const ESP32_I2C_ADDR = 4;
    const readBufferLength = 40; // 256; // 1024; // 128; //40; //32;
    //export const i2cReadInterval = 10;

    let SBUSY: string[] = [];
    let ROTARY1: string[] = [];
    let ROTARY2: string[] = [];
    let SLIDER1: string[] = [];
    let SLIDER2: string[] = [];
    let SUPDATE: string[] = [];
    let TUPDATE: string[] = [];

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

        for (let j = 0; j <= num - 1; j++) {
            txBuf[j] = message.charCodeAt(j)
        }

        pins.i2cWriteBuffer(ESP32_I2C_ADDR, txBuf, false);
    }

    let currentRecievedMessage = "";

    export function _readMessage(message: string, topic: string): string {

        pins.digitalWritePin(DigitalPin.P8, 1);
        basic.pause(1);

        //send first
        sendMessage(message);

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);

        let queuedMessage = "";

        if (topic == "SBUSY") {
            queuedMessage = SBUSY.pop();
        }

        if (topic == "SUPDATE") {
            queuedMessage = SUPDATE.pop();
        }

        //serial.writeLine("ReadMessage TX:" + message + " RX:" + queuedMessage);

        return queuedMessage;
    }

    export function readi2c() {

        let i2cBuffer = pins.i2cReadBuffer(ESP32_I2C_ADDR, readBufferLength, false);

        for (let i = 0; i < i2cBuffer.length; i++) {
            if (i2cBuffer[i] != 255 && i2cBuffer[i] != 0) {
                currentRecievedMessage = currentRecievedMessage + String.fromCharCode(i2cBuffer[i]);
            }
        }

        //serial.writeLine("currentRecievedMessage (0):" + currentRecievedMessage);

        if (currentRecievedMessage.includes("@@") == true && currentRecievedMessage.includes("##") == true) {

            //serial.writeLine("currentRecievedMessage (1):" + currentRecievedMessage);

            let msgsToReturn = currentRecievedMessage.split("##");
            let msg = msgsToReturn[0].trim();
            let headerPos = msg.indexOf("@@");

            //serial.writeLine("headerPos:" + headerPos);

            msg = msgsToReturn[0].substr(headerPos + 2).trim();

            //serial.writeLine("msg:" + msg);

            //remove any leading characters
            if (headerPos > 0) {

                //serial.writeLine("headerPos:" + headerPos);

                currentRecievedMessage = currentRecievedMessage.substr(headerPos);
            }

            //serial.writeLine("currentRecievedMessage (2):" + currentRecievedMessage);

            currentRecievedMessage = currentRecievedMessage.replace("@@" + msg + "##", "");

            //serial.writeLine("currentRecievedMessage (3):" + currentRecievedMessage);
            //serial.writeLine("msg:" + msg);

            let msgParts = msg.trim().split(":");

                //check for something to pop on array
                if (msgParts[1].length > 0) {

                    if (msgParts[0] == "SBUSY") {
                        SBUSY.push(msgParts[1]);
                    }

                    if (msgParts[0] == "SUPDATE") {
                        SUPDATE.push(msgParts[1]);
                    }
                }
         }
    }
}