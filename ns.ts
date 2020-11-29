//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace RainbowSparkleUnicorn {

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    //% weight=65
    export function start(): void {

        serial.redirect(
            SerialPin.P1,
            SerialPin.P2,
            BaudRate.BaudRate115200
        )

        basic.showIcon(IconNames.Heart)
    }
}