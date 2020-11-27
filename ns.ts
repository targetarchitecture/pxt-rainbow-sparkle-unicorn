
//% groups="['PID', `Filters', 'Behaviors']"




let MICROBIT_EVT_ANY = 0  // MICROBIT_EVT_ANY
let RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED = 2108
let RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED = 2109
let RAINBOW_SPARKLE_UNICORN_SOUND_BUSY = 2150  

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
      let msg = serial.readUntil(serial.delimiters(Delimiters.Hash));
      
      parseRecievedMessage(msg);
    })



    function parseRecievedMessage(message: string){
            if (message.indexOf("A1") == 0) {
               const value = parseInt( message.split(",")[1]);

               //raise busy flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
            }
           else if (message.indexOf("B1") == 0) {
            const value = parseInt( message.split(",")[1]);

               //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, value)
            }
           else if (message.indexOf("B2") == 0) {
            const value = parseInt( message.split(",")[1]);

               //raise touch flag EventBusSource              
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, value)
            }
    }


export let A1 : boolean
let A2
let A3
let B1
let B2
let C1
let C2
let D1
let D2
let E1
let E2
let E3
let E4
let E5
let E6
let E7
let E8
let E9
let E10
let E11
let E12
let E13
let E14
let E15
let E16
let F1
let F2


}