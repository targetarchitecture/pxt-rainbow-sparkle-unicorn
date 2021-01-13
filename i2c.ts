namespace RainbowSparkleUnicorn {

export let msg = ""
let a4 = 0
let a3 = 0
let startIndex = 0
let a1 = 0
let asr_txt = ""
let num = 0
let a2 = 0
let I2C_ADDR = 4
let DELAY = 150
pins.digitalWritePin(DigitalPin.P8, 0)


if (initialised == true){
}

   export function sendMessage(message: string): void {
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.pause(1)
        asr_txt = message
        num = asr_txt.length
        let buf2 = pins.createBuffer(num+4);
        let crcbuf = pins.createBuffer(num);
        buf2[0] = 2
        buf2[1] = num + 4
        for (let j = 0; j <= num - 1; j++) {
            buf2[j + 2] = asr_txt.charCodeAt(j)
            crcbuf[j] = asr_txt.charCodeAt(j)
        }
        buf2[num + 2] = calcCRC8(crcbuf,num)
        buf2[num + 3] = 4
        pins.i2cWriteBuffer(I2C_ADDR, buf2, false);
        let i2cBuffer = pins.i2cReadBuffer(I2C_ADDR, 32, false);
        for (let k = 0; k <= 32; k++) {
            // find packet start
            if (i2cBuffer[k] == 2) {
                startIndex = k
            }
        }
        readMsgV2(i2cBuffer,startIndex);
        pins.digitalWritePin(DigitalPin.P8, 0)
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

    function readMsgV2 (rxBuf: Buffer,startIndex:number ) {
        a1 = rxBuf[startIndex];
        let contentLength = rxBuf[startIndex+1]-4;

        if (contentLength > 0){

        msg = ""

            for (let l = 0; l < contentLength ; l++) {
                a2 =  rxBuf[l+2] ;

                if (a2 != 255 && a2 != 0){
                    msg = msg + String.fromCharCode(a2);
                }
            }

            msg = msg.trim();

        if (msg.length > 0){
            control.raiseEvent(1001, msg.length);
        }}
    }


    control.inBackground(function () {
        while (true) {
            sendMessage("00," + input.runningTime())
            basic.pause(50)
        }
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

    control.onEvent(1001, EventBusValue.MICROBIT_EVT_ANY, function () {

       // serial.writeLine(msg);
        parseRecievedMessage(msg);
        led.toggle(0, 0);
    })

}