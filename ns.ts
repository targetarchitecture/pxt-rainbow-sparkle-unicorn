
//% groups="['PID', `Filters', 'Behaviors']"
//% color=#909090 weight=80 icon="\uf277"
//namespace automation {

//}

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

}