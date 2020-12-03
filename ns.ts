//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace RainbowSparkleUnicorn {

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(): void {

        serial.redirect(
            SerialPin.P1,
            SerialPin.P2,
            BaudRate.BaudRate115200
        )

        basic.pause(10);

        //TODO: keeps crashing...I suspect due to chaos on the UART
        //sendMessage("START");

        //   for (let index = 0; index < 11; index++) {
        //     basic.pause(100);
        //   }   

        basic.showIcon(IconNames.Heart)
    }
}