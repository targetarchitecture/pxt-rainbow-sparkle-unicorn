//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    let alreadyStarted = false;
    let redirectedToUSB = false;

    let _MSGTOSEND: string[] = [];
    let _MSGTOACTION: string[] = [];

    //allow quick switch back to normal USB, this is not a problem as the code is so large it only runs on a V2 anyway
    input.onButtonPressed(Button.AB, function () {
        redirectedToUSB = true;
        serial.redirectToUSB();
        basic.showIcon(IconNames.Yes)
        basic.pause(500);
    })

    /**
      * Add into the start function to initialise the board.
      */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(TransmissionMs: number = 20): void {

        //prevent running more than once
        if (alreadyStarted == true) {
            return;
        } else {
            alreadyStarted = true;
        }

        let TxBufferSize: number = 128;
        let RxBufferSize: number = 128;

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

            let msgrecieved = serial.readUntil(serial.delimiters(Delimiters.NewLine));

            basic.pause(1);

            //just stop processing if redirectred back to USB
            if (redirectedToUSB == false) {
                _MSGTOACTION.push(msgrecieved);
                //_readMessage(msgrecieved);
            }

            //LED toggle takes two milliseconds - just helps me!
            led.toggle(0, 0);
        });

        //set-up UART transmission loop
        control.inBackground(function () {
            loops.everyInterval(TransmissionMs, function () {

                //send if array is not empty
                if (_MSGTOSEND.length > 0) {

                    //LED toggle takes two milliseconds - just helps me!
                    led.toggle(2, 0);

                    let msgtosend = _MSGTOSEND.shift() + String.fromCharCode(Delimiters.CarriageReturn);

                    //if redirected to USB just shift the message off the loop but don't send
                    //if (redirectedToUSB == false) {
                    serial.writeString(msgtosend);
                    //}
                }
            })
        })

        //set-up an action loop
        control.inBackground(function () {
            loops.everyInterval(10, function () {

                //send if array is not empty
                if (_MSGTOACTION.length > 0) {

                    //LED toggle takes two milliseconds - just helps me!
                    led.toggle(1, 0);

                    let msgtoaction = _MSGTOACTION.shift();

                    _readMessage(msgtoaction);
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
        else if (topic == "TTOUCHED") {
            Touch._dealWithTouchedUpdateMessage(parseInt(messageParts[1]));
        }
        else if (topic == "TRELEASED") {
            Touch._dealWithReleasedUpdateMessage(parseInt(messageParts[1]));
        }
        else if (topic == "SSTATE") {
            Switch._previousSwitchStates = messageParts[1];
        }
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