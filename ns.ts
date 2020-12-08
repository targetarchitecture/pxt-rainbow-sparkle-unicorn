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

        basic.pause(50);

        RainbowSparkleUnicorn.sendMessage("START");
        RainbowSparkleUnicorn.turnSlider1(OnOff.OFF);
        RainbowSparkleUnicorn.turnSlider2(OnOff.OFF);
        RainbowSparkleUnicorn.turnSpinner1(OnOff.OFF);
        RainbowSparkleUnicorn.turnSpinner2(OnOff.OFF);
        RainbowSparkleUnicorn.setVolume(0);        

        //basic.showIcon(IconNames.Heart)
    }
}