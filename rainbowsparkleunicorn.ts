//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    /**
      * Add into the start function to initialise the board.
      */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(TransmissionMs: number = 10, InputInterval: number = 100, CommandInterval: number = 500): void {

        serial.redirect(SerialPin.P2, SerialPin.P1, BaudRate.BaudRate115200);
        serial.setTxBufferSize(128)
        serial.setRxBufferSize(128)

        //add 1s for UART ready to support Micro:bit V2
        basic.pause(1000)

        //add the serial data recieve handler
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            let msg = serial.readLine()

            _readMessage(msg);
        });

        //set-up UART transmission loop
        control.inBackground(function () {
            loops.everyInterval(TransmissionMs, function () {

                let msg: string

                //send if array is not empty
                if (typeof (msg = _MSGTOSEND.shift()) !== 'undefined') {
                    serial.writeString(msg + String.fromCharCode(Delimiters.CarriageReturn));
                }
            })
        })

        //set up updates for events
        control.inBackground(function () {
            loops.everyInterval(InputInterval, function () {
                _sendMessage("TUPDATE");
                _sendMessage("SUPDATE");
            })
        })

        control.inBackground(function () {
            loops.everyInterval(CommandInterval, function () {
                _sendMessage("SLIDER1");
                _sendMessage("SLIDER2");
                _sendMessage("SBUSY");
                _sendMessage("ROTARY1");
                _sendMessage("ROTARY2");
            })
        })
    }

    let _MSGTOSEND: string[] = [];

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
            Switch._dealWithSwitchMessage(message.split(":")[1]);
        }
        else if (topic == "TUPDATE") {
            Touch._dealWithTouchMessage(message.split(":")[1]);
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
