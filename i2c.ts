namespace RainbowSparkleUnicorn {

    const ESP32_I2C_ADDR = 4;
    const readBufferLength = 128; //40; //32;

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

    export function _readMessage(message: string): string {

        pins.digitalWritePin(DigitalPin.P8, 1);
        basic.pause(1);

        //send first
        sendMessage(message);

        pins.digitalWritePin(DigitalPin.P8, 0);
        basic.pause(1);

        let msg = "";

        while (true) {
            
            let i2cBuffer = pins.i2cReadBuffer(ESP32_I2C_ADDR, 1, false);

            if (i2cBuffer[0] != 255 && i2cBuffer[0] != 0) {
                currentRecievedMessage = currentRecievedMessage + String.fromCharCode(i2cBuffer[0]);
            }

            //serial.writeLine("currentRecievedMessage (0):" + currentRecievedMessage);

            if (currentRecievedMessage.includes("@@") == true && currentRecievedMessage.includes("##") == true) {

                //serial.writeLine("currentRecievedMessage (1):" + currentRecievedMessage);

                let msgsToReturn = currentRecievedMessage.split("##");
                msg = msgsToReturn[0].trim();
                let headerPos = msg.indexOf("@@");

                //serial.writeLine("headerPos:" + headerPos);

                msg = msgsToReturn[0].substr(headerPos + 2).trim();

                //serial.writeLine("msg:" + msg);

                //remove any leading characters
                if (headerPos > 0){

                    //serial.writeLine("headerPos:" + headerPos);

                    currentRecievedMessage = currentRecievedMessage.substr(headerPos);
                }

                //serial.writeLine("currentRecievedMessage (2):" + currentRecievedMessage);

                currentRecievedMessage = currentRecievedMessage.replace("@@" + msg + "##", "");

                //serial.writeLine("currentRecievedMessage (3):" + currentRecievedMessage);

                if (msg.trim().length > 0) {
                    break;
                }
            }
        }

        //serial.writeLine("ReadMessage TX:" + message + " RX:" + msg);

        return msg;
    }
}