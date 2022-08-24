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

            //just stop processing if redirected back to USB
            //if (redirectedToUSB == false) {
            _MSGTOACTION.push(msgrecieved);
            //}

            //LED toggle takes two milliseconds - just helps me!
            led.toggle(0, 0);
        });

        //set-up UART transmission loop
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

        //set-up an action loop
        loops.everyInterval(10, function () {

            //send if array is not empty
            if (_MSGTOACTION.length > 0) {

                //LED toggle takes two milliseconds - just helps me!
                led.toggle(1, 0);

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

namespace RainbowSparkleUnicorn.IoT {
    export function _dealWithMQTTMessage(message: string) {
        if (MQTTChange != null) {

            let parts = message.split("','");

            let topic = parts[0];
            let content = parts[1];

            MQTTChange(topic, content);
        }
    }

    let MQTTChange: (topic: string, message: string) => void = null

    /**
    * Use the Internet of Things (IoT) to control your projects
    */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="on IoT message arriving"
    //% weight=65
    export function onNewMQTTMessage(handler: (topic: string, message: string) => void): void {
        MQTTChange = handler;
    }

    /**
     * Listen (subscribe) to IoT messages on a topic
     * @param topic 
     */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="subscribe to topic $topic"   
    export function listen(topic: string) {
        _sendMessage("SUBSCRIBE," + topic)
    }

    /**
     * Publish an IoT messages on a topic
     * @param topic 
     * @param message
     */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="publish an IoT message to topic $topic with content $message"   
    export function publish(topic: string, message: string) {
        _sendMessage("PUBLISH," + topic + "|" + message);
    }

    /**
     * Set Wifi
     * @param ssid
     * @param password
     */
    //% subcategory="IoT" 
    //% group="Credentials"
    //% block="set Wifi credentials with $ssid and $password"   
    export function setWifi(ssid: string, password: string) {
        _sendMessage("NVMSSID," + ssid);
        _sendMessage("NVMPASSWORD," + password);
    }

    /**
     * Set MQTT
     * @param server
     * @param user
     * @param password
     */
    //% subcategory="IoT" 
    //% group="Credentials"
    //% block="set MQTT credentials on $server with $user and $password"   
    export function setMQTT(server: string, user: string, password: string) {
        _sendMessage("NVMMQTTSERVER," + server);
        _sendMessage("NVMMQTTUSER," + user);
        _sendMessage("NVMMQTTPASSWORD," + password);
    }
}

namespace RainbowSparkleUnicorn {

    export const RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY = 5009;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED = 5010;
    //... 16 SWITCHES to 5026 
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY = 5029;
    export const RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED = 5030;
    //... 16 SWITCHES to 5046 

    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY = 5049;
    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED = 5050;
    //... 12 TOUCH to 5062 
    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY = 5069;
    export const RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED = 5070;
    //... 12 TOUCH to 5082

    export const RAINBOW_SPARKLE_UNICORN_SPINNER_1 = 5091;
    export const RAINBOW_SPARKLE_UNICORN_SPINNER_2 = 5092;

    export const RAINBOW_SPARKLE_UNICORN_MUSIC_STOP = 5093;
    export const RAINBOW_SPARKLE_UNICORN_MUSIC_START = 5094;
    export const RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE = 5095;
}



namespace RainbowSparkleUnicorn.Slider {

    export declare const enum Sliders {
        //% block="Slider 1"    
        Slider1 = 0,
        //% block="Slider 2"
        Slider2 = 1
    }

    export let _Slider1: number = 0;
    export let _Slider2: number = 0;

    /**
     * A function that returns slider one value
     */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Sliders"
    //% block="Get slider %slider value" 
    export function Value(slider: Sliders): number {

        if (slider == Sliders.Slider1) {
            return _Slider1;
        } else {
            return _Slider2;
        }
    }

    /**
    * Request the slider value.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Sliders"
    //% block="Request slider %slider value"
    //% weight=65
    export function RequestSliderValue(
        slider: Sliders
    ) {
        if (slider == Sliders.Slider1) {
            _sendMessage("SLIDER1");
        } else {
            _sendMessage("SLIDER2");
        }
    }
}




namespace RainbowSparkleUnicorn.Touch {

    //export let _previousTouchStates = "000000000000";
    let pinOffset = 1000;

    export enum Pins {
        //% block="Pin 0"    
        P0 = 0,
        //% block="Pin 1"    
        P1 = 1,
        //% block="Pin 2"    
        P2 = 2,
        //% block="Pin 3" 
        P3 = 3,
        //% block="Pin 4" 
        P4 = 4,
        //% block="Pin 5" 
        P5 = 5,
        //% block="Pin 6" 
        P6 = 6,
        //% block="Pin 7" 
        P7 = 7,
        //% block="Pin 8" 
        P8 = 8,
        //% block="Pin 9" 
        P9 = 9,
        //% block="Pin 10" 
        P10 = 10,
        //% block="Pin 11" 
        P11 = 11
    }

    export enum Event {
        Touched = 0,
        Released = 1
    }

    /**
     * Set the touch and release thresholds for all 13 channels on the
     * @param touchThreshold the touch threshold value from 0 to 255.
     * @param releaseThreshold the release threshold value from 0 to 255.
     */
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the touch and release thresholds $touchThreshold , $releaseThreshold"
    //% releaseThreshold.min=0 releaseThreshold.max=255 releaseThreshold.defl=6
    //% touchThreshold.min=0 touchThreshold.max=255 touchThreshold.defl=12
    export function setTouchThresholds(touchThreshold: number, releaseThreshold: number) {
        _sendMessage("S1," + touchThreshold + "," + releaseThreshold);
    }

    /**
    * Set the debounce timing
    * @param timing 
    */
    //% subcategory="Expert"     
    //% group="Touch"
    //% block="Set the debounce timing $timing"
    //% timing.min=0 timing.max=100 timing.defl=50
    export function setDebounceDelay(timing: number) {
        _sendMessage("S2," + timing);
    }


    export function _dealWithReleasedUpdateMessage(pin: number) {
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED + pin, pin + pinOffset,)
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY, pin + pinOffset)
        //basic.showIcon(IconNames.Yes)
    }

    export function _dealWithTouchedUpdateMessage(pin: number) {
        // basic.showNumber(pin)
        //RainbowSparkleUnicorn.Expert.SendDebugMessage(control.millis().toString());

        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED + pin, pin + pinOffset)
        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY, pin + pinOffset)
        //RainbowSparkleUnicorn.Expert.SendDebugMessage(control.millis().toString());

    }

    /**
     * Do something when a pin is touched.
     * @param pin the touch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="on pin %pin | touched"
    //% weight=65
    export function onTouched(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );

    }
    /**
     * Do something when a pin is released.
     * @param pin the touch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Touch"
    //% block="on %pin | released"
    //% weight=65
    export function onReleased(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
 * Do something when any pin is touched.
 * @param handler body code to run when the event is raised
 */
    //% subcategory="Touch"
    //% block="on any pin touched"
    //% weight=65
    export function onAnyTouched(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }



    /**
  * Do something when any pin is released.
  * @param handler body code to run when the event is raised
  */
    //% subcategory="Touch"
    //% block="on any pin released"
    //% weight=65
    export function onAnyReleased(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }


}


namespace RainbowSparkleUnicorn.Switch {

    export let _previousSwitchStates = "0000000000000000";
    let pinOffset = 1000;

    export enum Pins {
        //% block="Pin 0"
        P0 = 0,
        //% block="Pin 1"
        P1 = 1,
        //% block="Pin 2"
        P2 = 2,
        //% block="Pin 3"
        P3 = 3,
        //% block="Pin 4"
        P4 = 4,
        //% block="Pin 5"
        P5 = 5,
        //% block="Pin 6"
        P6 = 6,
        //% block="Pin 7"
        P7 = 7,
        //% block="Pin 8"
        P8 = 8,
        //% block="Pin 9"
        P9 = 9,
        //% block="Pin 10"
        P10 = 10,
        //% block="Pin 11"
        P11 = 11,
        //% block="Pin 12"
        P12 = 12,
        //% block="Pin 13"
        P13 = 13,
        //% block="Pin 14"
        P14 = 14,
        //% block="Pin 15"
        P15 = 15
    }

    export enum Event {
        Pressed = 0,
        Released = 1
    }

    /**
     * Get a switch state
     * @param pin 
     */
    //% subcategory="Switch" 
    //% weight=80        
    //% block="Get the switch state on pin $pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=6
    //% pin.fieldOptions.tooltips="false"    
    export function getSwitchState(pin: Pins): Event {
        if (_previousSwitchStates.charAt(pin) == "L") {
            return Event.Pressed;
        } else {
            return Event.Released;
        }
        //return _previousSwitchStates.charAt(pin);
    }

    /**
    * Request the switch states, usefull to set the starting values.
    * waits half a second to get switch states back
    */
    //% subcategory="Switch"
    //% block="Request switch states"
    //% weight=65
    export function RequestSwitchStates(): Array<Event> {
        _sendMessage("SSTATE");
        basic.pause(500);

        let retval: Array<Event> = [];

        for (let i = 0; i < _previousSwitchStates.length; i++) {
            if (_previousSwitchStates.charAt(i) == "L") {
                retval.push(Event.Pressed);
            } else {
                retval.push(Event.Released);
            }
        }

        return retval;

        // return _previousSwitchStates;
    }

    export function _dealWithSwitchUpdateMessage(switchStates: string) {

        if (_previousSwitchStates.charAt(0) != "0") {

            for (let pin = 0; pin < 16; pin++) {

                const pinState = switchStates.charAt(pin);
                const previousPinState = _previousSwitchStates.charAt(pin);

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

        _previousSwitchStates = switchStates;
    }

    /**
     * Do something when a switch is pushed.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="on switch pressed %pin"
    //% weight=65
    export function onPressed(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );

    }
    /**
     * Do something when a switch is released.
     * @param pin the switch pin to be checked
     * @param handler body code to run when the event is raised
     */
    //% subcategory="Switch"
    //% block="on switch released %pin"
    //% weight=65
    export function onReleased(
        pin: Pins,
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED + pin,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
 * Do something when any switch is pushed.
 * @param handler body code to run when the event is raised
 */
    //% subcategory="Switch"
    //% block="on any switch pressed"
    //% weight=65
    export function onAnyPressed(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }



    /**
  * Do something when any switch is released.
  * @param handler body code to run when the event is raised
  */
    //% subcategory="Switch"
    //% block="on any switch released"
    //% weight=65
    export function onAnyReleased(
        handler: (pin: number) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED_ANY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue() - pinOffset);
            }
        );
    }
}


namespace RainbowSparkleUnicorn.Sound {

    let dfplayerpreviousBusy: boolean = false;
    let dfplayerVolume: number = 0;
    let dfplayerTrack: number = 0;
    let Offset: number = 666;

    /**
     * Set the volume
     * @param volume the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sound"     
    //% group="Volume"
    //% weight=100
    //% block="Set volume to $volume"
    //% volume.defl=20
    //% volume.min=0 volume.max=30
    export function setVolume(volume: number) {
        dfplayerVolume = Math.constrain(volume, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }

    /**
     * Play a track
     * @param track the track to play, eg: 1
     */
    //% subcategory="Sound"     
    //% group="Actions"
    //% weight=100   
    //% track.defl=1
    //% block="Play track $track"
    //% track.min=1 track.max=99
    export function playTrack(track: number) {
        dfplayerTrack = track;
        _sendMessage("SPLAY," + track + ",1");
    }

    /**
     * Increase the volume
     */
    //% subcategory="Sound" 
    //% group="Volume"   
    //% weight=90  
    //% block="Increase volume"
    export function increaseVolume() {
        dfplayerVolume = Math.constrain(dfplayerVolume + 1, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }

    /**
     * Decrease the volume
     */
    //% subcategory="Sound"  
    //% group="Volume"    
    //% weight=80
    //% block="Decrease volume"
    export function decreaseVolume() {
        dfplayerVolume = Math.constrain(dfplayerVolume - 1, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }


    //% subcategory="Sound"
    //% group="Actions"
    //% weight=80
    //% block="resume music"
    export function resume() {
        _sendMessage("SRESUME");
    }

    //% subcategory="Sound"
    //% group="Actions"
    //% weight=90
    //% block="pause music"
    export function pause() {
        _sendMessage("SPAUSE");
    }

    //% subcategory="Sound"
    //% group="Actions"
    //% weight=90
    //% block="stop music"
    export function stop() {
        _sendMessage("SSTOP");
    }

    /**
      * Returns the state of the player has started playing a track or stopped.
      * This block intended to be used inside of start stop event handler.
      */
    //% subcategory="Sound"
    //% group="State"
    //% block="sound playing"
    //% weight=39
    export function playingSound(): boolean {
        return dfplayerpreviousBusy;
    }

    export function _dealWithMusicMessage(value: number) {

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
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, Offset + 1);
            } else {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_STOP, 1)
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, Offset + 0);
            }
        }

        //remember for next time
        dfplayerpreviousBusy = busy;
    }

    /**
    * Returns the current volume
    */
    //% subcategory="Sound"
    //% group="Volume"
    //% weight=70
    //% block="current volume"
    export function volume(): number {
        return dfplayerVolume;
    }


    /**
    * Returns the current track
    */
    //% subcategory="Sound"
    //% group="State"
    //% block="current track"
    export function track(): number {
        return dfplayerTrack;
    }

    /**
    * Do something when a sound track starts/stops.
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track starts/stops"
    //% weight=41
    export function onStopStart(
        handler: (busy: boolean) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                if (control.eventValue() - Offset == 1) {
                    handler(true);
                } else {
                    handler(false);
                }
            }
        );
    }

    /**
    * Do something when a sound track starts.
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track starts"
    //% weight=41
    export function onStart(handler: () => void): void {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_START,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
    * Do something when a sound track stops.
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track stop"
    //% weight=41
    export function onStop(handler: () => void): void {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_STOP,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


}

namespace RainbowSparkleUnicorn.Spinner {

    let pinOffset = 1000;

    export declare const enum Spinners {
        //% block="Rotary 1"    
        Spinner1 = 0,
        //% block="Rotary 2"  
        Spinner2 = 1
    }

    let _Encoder1value = 0;
    let _Encoder2value = 0;

    /**
    * Get the spiner value
    */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Spinners"
    //% block="Get spinner %spinner value"
    //% weight=65
    export function Value(spinner: Spinners): number {

        if (spinner == Spinners.Spinner1) {
            return _Encoder1value;
        }
        else {
            return _Encoder2value;
        }
    }

    /**
    * Do something when a rotary switch is turned.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Spinners"
    //% block="When spinner %spinner| is rotating"
    //% weight=65
    export function onRotation(
        spinner: Spinners,
        handler: (pin: number) => void
    ) {
        if (spinner == Spinners.Spinner1) {

            control.onEvent(
                RAINBOW_SPARKLE_UNICORN_SPINNER_1,
                EventBusValue.MICROBIT_EVT_ANY,
                () => {
                    handler(control.eventValue() - pinOffset);
                }
            );
        } else {
            control.onEvent(
                RAINBOW_SPARKLE_UNICORN_SPINNER_2,
                EventBusValue.MICROBIT_EVT_ANY,
                () => {
                    handler(control.eventValue() - pinOffset);
                }
            );
        }
    }

    export function _dealWithSpinner1Message(value: number) {

        if (value != _Encoder1value) {
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_1, value + pinOffset)
        }

        _Encoder1value = value;
    }

    export function _dealWithSpinner2Message(value: number) {
        if (value != _Encoder2value) {
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_2, value + pinOffset)
        }
        _Encoder2value = value;
    }

    /**
    * Request the spinner value.
    */
    //% subcategory="Sliders / Dials / Spinners"
    //% group="Spinners"
    //% block="Request spinner %spinner value"
    //% weight=65
    export function RequestSpinnerValue(
        spinner: Spinners
    ) {
        if (spinner == Spinners.Spinner1) {
            _sendMessage("ROTARY1");
        } else {
            _sendMessage("ROTARY2");
        }
    }
}

namespace RainbowSparkleUnicorn.Dial {

    export declare const enum Dials {
        //% block="Dial 1"    
        Dial1 = 0,
        //% block="Dial 2"
        Dial2 = 1
    }

    /**
    * Set the analog dial to a certain voltage.
    * @param voltage the touch sensor to be checked, eg: 15
    */
    //% subcategory="Sliders / Dials / Spinners" 
    //% group="Dials"
    //% block="Set dial %dial to $value"
    //% value.min=0 value.max=255
    //% weight=65
    export function value(dial: Dials, value: number) {

        value = Math.round(value);

        if (dial == Dials.Dial1) {
            _sendMessage("DIAL1," + Math.clamp(0, 255, value))
        }
        else {
            _sendMessage("DIAL2," + Math.clamp(0, 255, value))
        }
    }
}
