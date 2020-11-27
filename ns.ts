


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
        let msg = serial.readUntil(serial.delimiters(Delimiters.Hash));

        parseRecievedMessage(msg);
    })

    function parseRecievedMessage(message: string) {
        if (message.indexOf("A1") == 0) {
            const value = parseInt(message.split(",")[1]);

            //raise busy flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
        }
        else if (message.indexOf("B1") == 0) {
            const value = parseInt(message.split(",")[1]);

            MPR121touched[value] = true

            //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, value)
        }
        else if (message.indexOf("B2") == 0) {
            const value = parseInt(message.split(",")[1]);

            MPR121touched[value] = false

            //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, value)
        }

        else if (message.indexOf("C1") == 0) {
            const value = parseInt(message.split(",")[1]);

            //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_ONE, value)
        }

        else if (message.indexOf("C2") == 0) {
            const value = parseInt(message.split(",")[1]);

            //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, value)
        }

        else if (message.indexOf("D1") == 0) {
            let direction: RotaryDirection

            if (message.split(",")[1] == "+") {
                direction = RotaryDirection.Right;
            } else {
                direction = RotaryDirection.Left;
            }

            //raise rotation event             
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING, 21)
        }
        else if (message.indexOf("D2") == 0) {

            if (message.split(",")[1] == "+") {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Right)
            } else {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Left)
            }

            //raise rotation event             
            //control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, 22)
        }
        else if (message.indexOf("E") == 0) {

            const state = message.split(",")[1];
            const pin = parseInt(message[0].slice(1));

            if (state == "H") {
                SX1509state[pin] = 1;
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, pin)
            } else {
                SX1509state[pin] = 0;
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, pin)
            }
        }
        else if (message.indexOf("F1") == 0) {

            const pin = parseInt(message[1]);

            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MOTION_STOPPED,pin);
       } 
      else if (message.indexOf("F2") == 0) {

            const pin = parseInt(message[1]);

            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MOTION_HALTED,pin);
       }       
    }    

    export let MPR121touched = [false, false, false, false, false, false, false, false, false, false, false, false]
    export let SX1509state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    export let A1: boolean
}