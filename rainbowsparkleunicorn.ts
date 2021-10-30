//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    let alreadyStarted = false;

    let _MSGTOSEND: string[] = [];

    input.onLogoEvent(TouchButtonEvent.Released, function () {
        serial.redirectToUSB();
        basic.showIcon(IconNames.Yes)
    })

    /**
      * Add into the start function to initialise the board.
      */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(txPin: SerialPin = SerialPin.P2, rxPin: SerialPin = SerialPin.P1, TxBufferSize: number = 128, RxBufferSize: number = 128, TransmissionMs: number = 10): void {

        //prevent running more than once
        if (alreadyStarted == true) {
            return;
        } else {
            alreadyStarted = true;
        }

        serial.redirect(txPin, rxPin, BaudRate.BaudRate115200);
        serial.setTxBufferSize(TxBufferSize);
        serial.setRxBufferSize(RxBufferSize);

        //add 1s for UART ready to support Micro:bit V2
        basic.pause(1000);

        //add the serial data recieve handler
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {

            let msg = serial.readUntil(serial.delimiters(Delimiters.NewLine));

            _readMessage(msg);

            //LED toggle takes two milliseconds - just helps me!
            led.toggle(1, 0);
        });

        //set-up UART transmission loop
        control.inBackground(function () {
            loops.everyInterval(TransmissionMs, function () {

                //send if array is not empty
                if (_MSGTOSEND.length > 0) {

                    serial.writeString(_MSGTOSEND.shift() + String.fromCharCode(Delimiters.CarriageReturn));

                    //LED toggle takes two milliseconds - just helps me!
                    led.toggle(0, 0);
                }
            })
        })
    }

    export function _sendMessage(message: string): void {
        _MSGTOSEND.push(message);
    }

    function _readMessage(message: string): void {

        let topic: string = message.split(":")[0];

        if (topic == "SLIDER1") {
            RainbowSparkleUnicorn.Slider._Slider1 = parseInt(message.split(":")[1]);
        }
        else if (topic == "SLIDER2") {
            RainbowSparkleUnicorn.Slider._Slider2 = parseInt(message.split(":")[1]);
        }
        else if (topic == "ROTARY1") {
            RainbowSparkleUnicorn.Spinner._dealWithSpinner1Message(parseInt(message.split(":")[1]));
        }
        else if (topic == "ROTARY2") {
            RainbowSparkleUnicorn.Spinner._dealWithSpinner2Message(parseInt(message.split(":")[1]));
        }
        else if (topic == "SBUSY") {
            Sound._dealWithMusicMessage(parseInt(message.split(":")[1]));
        }
        else if (topic == "SUPDATE") {
            Switch._dealWithSwitchUpdateMessage(message.split(":")[1]);
        }
        else if (topic == "TUPDATE") {
            Touch._dealWithTouchUpdateMessage(message.split(":")[1]);
        }
    }

    /**
* Write a comment
* @param theComment eg:'write comment here'
*/
    //% subcategory="Expert" 
    //% group="Comments"       
    //% block=comment|%theComment
    export function comment(theComment: string): void {
        // do nothing
    }
}

namespace RainbowSparkleUnicorn.Expert {

    /**
     * Restart the ESP32 processor on the board
     */
    //% subcategory="Expert" 
    //% group="Debug"       
    //% block="Restart ESP32"
    export function restartESP32(): void {
        _sendMessage("RESTART");
    }

}
// Add your code here
