namespace RainbowSparkleUnicorn {

    let currentRecievedMessage = "";
    let ESP32_I2C_ADDR = 4;
    let sendingMessage = false;

   export function _sendMessage(message: string): void {

        sendingMessage = true;

        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(1)

        let num = 0;
        num = message.length
        let buf2 = pins.createBuffer(num+4);
        let crcbuf = pins.createBuffer(num);
        buf2[0] = 2
        buf2[1] = num + 4
        for (let j = 0; j <= num - 1; j++) {
            buf2[j + 2] = message.charCodeAt(j)
            crcbuf[j] = message.charCodeAt(j)
        }
        buf2[num + 2] = calcCRC8(crcbuf,num)
        buf2[num + 3] = 4

        pins.i2cWriteBuffer(ESP32_I2C_ADDR, buf2, false);

        //serial.writeLine(message);

        readI2CMessage();

        pins.digitalWritePin(DigitalPin.P8, 0);

        sendingMessage = false;
    }

    function checkMessage(message: string): boolean
     {
        if (message.isEmpty() == true){
            return false;
        }

        if (message.length < 3) {
            return false;
        }

        let X = message.split(",");
        let Y = X.length;

         if (Y < 2){
            return false;
        }

        return true;
     }

    function readI2CMessage ( ) {

        let startIndex = 0;
        let i2cBuffer = pins.i2cReadBuffer(ESP32_I2C_ADDR, 32, false);

        for (let k = 0; k <= 32; k++) {
            // find packet start
            if (i2cBuffer[k] == 2) {
                startIndex = k
            }
        }

        let a4 = 0;
        let a3 = 0;
        let a1 = 0;
        let a2 = 0;

        a1 = i2cBuffer[startIndex];
        let contentLength = i2cBuffer[startIndex+1]-4;

        //serial.writeValue("contentLength", contentLength);

        if (contentLength > 0){

            currentRecievedMessage = ""

            for (let l = 0; l < contentLength ; l++) {
                a2 =  i2cBuffer[l+2] ;

                if (a2 != 255 && a2 != 0){
                    currentRecievedMessage = currentRecievedMessage + String.fromCharCode(a2);
                }
            }

            currentRecievedMessage = currentRecievedMessage.trim();

        //serial.writeLine(currentRecievedMessage);

        //serial.writeValue("length", currentRecievedMessage.length );


        if (currentRecievedMessage.length > 0){
            _parseRecievedMessage(currentRecievedMessage);
            //serial.writeLine(currentRecievedMessage);
            //control.raiseEvent(RAINBOW_SPARKLE_UNICORN_I2C_EVENT, currentRecievedMessage.length);
        }}
    }

    basic.forever(() => {
            if (initialised == true)            
            {
                if (sendingMessage == false){
                    _sendMessage("00," + input.runningTime());
                }
            }
            basic.pause(50);
    })

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

//TODO: understand if this should be an event or inline
    control.onEvent(RAINBOW_SPARKLE_UNICORN_I2C_EVENT, EventBusValue.MICROBIT_EVT_ANY, function () {

        let msg = currentRecievedMessage;

        //serial.writeLine(msg);

        _parseRecievedMessage(msg);

        //led.toggle(0, 0);
    })

}