
//% groups="['PID', `Filters', 'Behaviors']"





let MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ID = 2148
let MICROBIT_RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ID = 2149
let MICROBIT_EVT_ANY = 0  // MICROBIT_EVT_ANY

// const enum MyEnum {
//     //% block="one"
//     One,
//     //% block="two"
//     Two
// }

//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace RainbowSparkleUnicorn {

    let initialized = false
    let serialNumber: string

    /**
     * Add into the start function to initialise the board.
     * @param SN The serial number of the Rainbox Sparkle Unicorn board, eg: "SN4"
     */
    //% block="Start Rainbow Sparkle Unicorn $SN"
    //% weight=65
    export function start(SN: string): void {

        serial.redirect(
            SerialPin.P1,
            SerialPin.P2,
            BaudRate.BaudRate115200
        )

        serialNumber = SN
        initialized = true

        basic.showIcon(IconNames.Heart)
    }

    let sendQueue = [""];

   export function sendMessage(message: string): void {
        sendQueue.push(message);
    }


    basic.forever(function () {
        if (sendQueue.length > 0) {
            serial.writeLine(sendQueue.pop());
        }
        basic.pause(10);
    })


        serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.Hash)))
    })

}