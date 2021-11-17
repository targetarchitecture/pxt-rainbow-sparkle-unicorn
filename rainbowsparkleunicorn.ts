//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    let alreadyStarted = false;
    let redirectedToUSB = false;

    let _MSGTOSEND: string[] = [];

    //allow quick switch back to normal USB, this is not a problem as the code is so large it only runs on a V2 anyway
    input.onLogoEvent(TouchButtonEvent.Released, function () {
        redirectedToUSB = true;
        serial.redirectToUSB();
        basic.pause(1000);
        basic.showIcon(IconNames.Yes)
    })

    /**
      * Add into the start function to initialise the board.
      */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(TxBufferSize: number = 128, RxBufferSize: number = 128,TransmissionMs: number = 5): void {

        //prevent running more than once
        if (alreadyStarted == true) {
            return;
        } else {
            alreadyStarted = true;
        }

        serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
        serial.setTxBufferSize(TxBufferSize);
        serial.setRxBufferSize(RxBufferSize);

        //add 1s for UART ready to support Micro:bit V2
        basic.pause(1000);

        //reboot ESP32
        serial.writeString("RESTART" + String.fromCharCode(Delimiters.CarriageReturn));

        //was 500,but 1000 seems more stable
        basic.pause(1000);

        //add the serial data recieve handler
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            //RainbowSparkleUnicorn.Expert.SendDebugMessage("A:" + control.millis().toString());

            let msgrecieved = serial.readUntil(serial.delimiters(Delimiters.NewLine));

            //LED toggle takes two milliseconds - just helps me!
            //led.toggle(1, 0);

            //just stop processing if redirectred back to USB
            if (redirectedToUSB == false) {
                _readMessage(msgrecieved);
            }
            //RainbowSparkleUnicorn.Expert.SendDebugMessage("B:" + control.millis().toString());

            //LED toggle takes two milliseconds - just helps me!
            led.toggle(1, 0);
        });

        //set-up UART transmission loop
        control.inBackground(function () {
            loops.everyInterval(TransmissionMs, function () {

                //send if array is not empty
                if (_MSGTOSEND.length > 0) {

                    //LED toggle takes two milliseconds - just helps me!
                    //led.toggle(0, 0);

                    let msgtosend = _MSGTOSEND.shift() + String.fromCharCode(Delimiters.CarriageReturn);

                    //if redirected to USB just shift the message off the loop but don't send
                    if (redirectedToUSB == false) {
                        serial.writeString(msgtosend);
                    }

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

        let messageParts = message.split(":");

        let topic: string = messageParts[0];

        if (topic == "SLIDER1") {
            RainbowSparkleUnicorn.Slider._Slider1 = parseInt(messageParts[1]);
        }
        else if (topic == "SLIDER2") {
            RainbowSparkleUnicorn.Slider._Slider2 = parseInt(messageParts[1]);
        }
        else if (topic == "ROTARY1") {
            RainbowSparkleUnicorn.Spinner._dealWithSpinner1Message(parseInt(messageParts[1]));
        }
        else if (topic == "ROTARY2") {
            RainbowSparkleUnicorn.Spinner._dealWithSpinner2Message(parseInt(messageParts[1]));
        }
        else if (topic == "SBUSY") {
            Sound._dealWithMusicMessage(parseInt(messageParts[1]));
        }
        else if (topic == "SUPDATE") {
            Switch._dealWithSwitchUpdateMessage(messageParts[1]);
        }
        // else if (topic == "TUPDATE") {
        //     Touch._dealWithTouchUpdateMessage(messageParts[1]);
        // }
        else if (topic == "TTOUCHED") {
            //RainbowSparkleUnicorn.Expert.SendDebugMessage("TTOUCHED:" + control.millis().toString());
            Touch._dealWithTouchedUpdateMessage(parseInt(messageParts[1]));
        }
        else if (topic == "TRELEASED") {
            Touch._dealWithReleasedUpdateMessage(parseInt(messageParts[1]));
        }
        else if (topic == "SSTATE") {
            Switch._previousSwitchStates = messageParts[1];
        }
        // else if (topic == "TSTATE") {
        //     Touch._previousTouchStates = messageParts[1];
        // }
        else if (topic == "MQTT") {
            IoT._dealWithMQTTMessage(messageParts[1]);
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

    /**
     * Show a message on the USB of the ESP32, maximum message size is 100 characters
     * @param message the string to send to the ESP32
     */
    //% subcategory="Expert" 
    //% group="Debug"       
    //% block="Send Debug Message $message"
    export function SendDebugMessage(message: string): void {

        message = message.substr(0, 100);

        _sendMessage("DEBUG," + message);
    }
}