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

        //check for header and trailer
        if (currentRecievedMessage.substr(0, 2) == "@@" &&
            currentRecievedMessage.substr(-2, 2) == "##") {
            currentRecievedMessage = currentRecievedMessage.substr(2, currentRecievedMessage.length - 4);
        } else {
            currentRecievedMessage = "";
        }

        //serial.writeLine("RX:" + currentRecievedMessage);

        return currentRecievedMessage;

    }

}