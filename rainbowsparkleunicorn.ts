//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
//% category="Rainbow Sparkle Unicorn"
//% subcategories='["Touch", "Switch", "Sound", "Light", "Sliders / Dials / Spinners" ,"Movement", "IoT", "Expert"]'
namespace RainbowSparkleUnicorn {

    let alreadyStarted = false;
    let redirectedToUSB = false;

    let _MSGTOSEND: string[] = [];
    let _MSGTOACTION: string[] = [];

    //allow quick switch back to normal USB, this is not a problem as the code is so large it only runs on a V2 anyway
    input.onLogoEvent(TouchButtonEvent.Pressed, function () {
        redirectedToUSB = true;
        serial.redirectToUSB();
        basic.showIcon(IconNames.Yes)
        basic.pause(500);
    })

    /**
      * Add into the start function to initialise the board.
      */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(TransmissionMs: number = 10): void {

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

            //this tiny pause improves the stability soo much
            basic.pause(1);

            _MSGTOACTION.push(msgrecieved);

            //LED toggle takes two milliseconds - just helps me!
            //led.toggle(0, 0);
        });

        //set-up UART transmission loop
        loops.everyInterval(TransmissionMs, function () {

            //send if array is not empty
            if (_MSGTOSEND.length > 0) {

                //LED toggle takes two milliseconds - just helps me!
                //led.toggle(2, 0);

                let msgtosend = _MSGTOSEND.shift() + String.fromCharCode(Delimiters.CarriageReturn);

                serial.writeString(msgtosend);
            }
        })

        //set-up an action loop
        loops.everyInterval(10, function () {

            //send if array is not empty
            if (_MSGTOACTION.length > 0) {

                //LED toggle takes two milliseconds - just helps me!
                //led.toggle(1, 0);

                let msgtoaction = _MSGTOACTION.shift();

                _readMessage(msgtoaction);
            }
        })
    }

    export function _sendMessage(message: string): void {
        _MSGTOSEND.push(message);
    }

    function _readMessage(message: string): void {

        let messageParts = message.split(":");

        let topic: string = messageParts[0];

        switch (topic) {
            case "SLIDER1":
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SLIDER_1, parseInt(messageParts[1]) + pinOffset);
                // RainbowSparkleUnicorn.Slider._Slider1 = parseInt(messageParts[1]);
                break;
            case "SLIDER2":
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SLIDER_2, parseInt(messageParts[1]) + pinOffset);

                //  RainbowSparkleUnicorn.Slider._Slider2 = parseInt(messageParts[1]);
                break;
            case "ROTARY1":
                dealWithSpinner1Message(parseInt(messageParts[1]));
                break;
            case "ROTARY2":
                dealWithSpinner2Message(parseInt(messageParts[1]));
                break;
            case "SBUSY":
                dealWithMusicMessage(parseInt(messageParts[1]));
                break;
            case "SUPDATE":
                 dealWithSwitchUpdateMessage(messageParts[1]);
                break;
            case "TTOUCHED":

                let pinTouched = parseInt(messageParts[1]);

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED + pinTouched, pinTouched + pinOffset)
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY, pinTouched + pinOffset)

                //Touch._dealWithTouchedUpdateMessage(parseInt(messageParts[1]));
                break;
            case "TRELEASED":
                //Touch._dealWithReleasedUpdateMessage(parseInt(messageParts[1]));

                let pinReleased = parseInt(messageParts[1]);

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED + pinReleased, pinReleased + pinOffset,)
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY, pinReleased + pinOffset)

                break;
            case "SSTATE":
                Switch._previousSwitchStates = messageParts[1];
                break;
            case "MQTT":
                    IoT._dealWithMQTTMessage(messageParts[1]);
                break;
        }
    }

    let _Encoder1value=0;
    let _Encoder2value = 0;

     function dealWithSpinner1Message(value: number) {

         if (value != _Encoder1value) {
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_1, value + pinOffset)
        }

        // RainbowSparkleUnicorn.Spinner._Encoder1value = value;
    }

     function dealWithSpinner2Message(value: number) {
         if (value != _Encoder2value) {
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_2, value + pinOffset)
        }
         //RainbowSparkleUnicorn.Spinner_Encoder2value = value;
    }

    function dealWithSwitchUpdateMessage(switchStates: string) {

        if (RainbowSparkleUnicorn.Switch._previousSwitchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 16; pin++) {

                const pinState = switchStates.charAt(pin);
                const previousPinState = RainbowSparkleUnicorn.Switch._previousSwitchStates.charAt(pin);

                if (pinState.compare(previousPinState) != 0) {

                    if (pinState.compare("L") == 0) {

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED + pin, pin + pinOffset)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY, pin + pinOffset)

                    } else if (pinState.compare("H") == 0) {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED + pin, pin + pinOffset)
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY, pin + pinOffset)
                    }
                }
            }
        }

        RainbowSparkleUnicorn.Switch._previousSwitchStates = switchStates;
    }

    let dfplayerpreviousBusy: boolean = false;

     function dealWithMusicMessage(value: number) {

        //basic.showNumber(value);

        let busy: boolean;

        if (value == 1) {
            busy = true;
        } else {
            busy = false;
        }

         if (dfplayerpreviousBusy != busy) {

            if (busy == true) {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_START, 1)
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, pinOffset + 1);
            } else {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_STOP, 1)
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, pinOffset + 0);
            }
        }

        //remember for next time
        dfplayerpreviousBusy = busy;
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
