namespace RainbowSparkleUnicorn {

    let printReceivedMsgs = false;

    /**
     * Print received messages
     */
    //% subcategory="Expert" 
    //% group="Debug"   
    //% block="Print received messages"
    export function printReceivedMessages(): void {
        printReceivedMsgs = true;
    }

    export function _parseRecievedMessage(message: string) {
        try {
                if (printReceivedMsgs == true){
                    serial.writeLine(message);
                }

                if (_readyToReadQueue == false){
                    if (_printDebugMsgs == false){
                        serial.writeLine("NOT READING: " + message);
                    }
                    return;
                }

                // if (message.indexOf("A1") == 0) {
                //     const value = parseInt(message.split(",")[1]);
                
                //     if (value == 1){
                //         Sound._dfplayerBusy = false;
                //     } else {
                //         Sound._dfplayerBusy = true;
                //     };

                //     control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
                // }
                
                // else if (message.indexOf("A2") == 0) {
                //     const volume = parseInt(message.split(",")[1]);
                //     control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_VOLUME, volume)
                // } 
                
                // else if (message.indexOf("A3") == 0) {
                //     const track = parseInt(message.split(",")[1]);
                //     control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_TRACK, track)
                // } 
                // else if (message.indexOf("B1") == 0) {
                //     const pin = parseInt(message.split(",")[1]);
                //     //serial.writeLine("~" + pin);
                //     control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, pin)
                // }
                // else if (message.indexOf("B2") == 0) {
                //     const pin = parseInt(message.split(",")[1]);

                //     control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, pin)
                // }

                else if (message.indexOf("B3") == 0) {
                    RainbowSparkleUnicorn.Touch._onStateChange( message.split(",")[1]);
                }                

                else if (message.indexOf("C1") == 0) {
                    const ADC = parseInt(message.split(",")[1]);
                    RainbowSparkleUnicorn.Controls._Slider1 = ADC;

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_ONE, ADC);
                }
                else if (message.indexOf("C2") == 0) {
                    const ADC = parseInt(message.split(",")[1]);
                    RainbowSparkleUnicorn.Controls._Slider2 = ADC;

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, ADC);
                }
                else if (message.indexOf("D1") == 0) {

                    if (message.split(",")[1] == "+") {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING, RotaryDirection.Right)
                    } else {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_ONE_ROTATING, RotaryDirection.Left)
                    }
                }
                else if (message.indexOf("D2") == 0) {

                    if (message.split(",")[1] == "+") {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Right)
                    } else {
                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, RotaryDirection.Left)
                    }
                }
                // else if (message.indexOf("E1") == 0) {

                //     const pin = parseInt(message.split(",")[1]);
                //     const state = parseInt(message.split(",")[2]);
                //     const loopTime = message.split(",")[3];                   

                //     //update pin state array
                //    Switch.switchStates.set(pin, state);

                //    console.log(pin + "=" + state);

                //     if (state == 1) { 
                //         //console.log("RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED");             
                //         control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, pin)
                //      } else {
                //         //console.log("RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED");
                //         control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, pin)
                //     }
                // }
                // else if (message.indexOf("E2") == 0) {
                //     Switch._setSwitchStates(message);
                // }
                else if (message.indexOf("E3") == 0) {

                    RainbowSparkleUnicorn.Switch._onStateChange(message.split(",")[1]);
                    
                }
                else if (message.indexOf("F1") == 0) {

                    const pin = parseInt(message.split(",")[1]);

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MOTION_STOPPED,pin);
                } 
                else if (message.indexOf("F2") == 0) {

                        const pin = parseInt(message.split(",")[1]);

                        control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MOTION_HALTED,pin);
                } 
            else if (message.indexOf("F3") == 0) {

                    const pin = parseInt(message.split(",")[1]);

                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MOTION_STARTED,pin);
            }             
            else if (message.indexOf("G1") == 0) {
                    //store ip address
                    const IP = message.split(",")[1];

                    IoT._setIPAddress(IP);

                    //control.raiseEvent(RAINBOW_SPARKLE_UNICORN_IP_RECEIVED,1);            
            } 
            else if (message.indexOf("G2") == 0) {

                    IoT._MQTTConnected = parseInt(message.split(",")[1]);

                    //control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MQTT_STATE,IoT._MQTTConnected);            
            }
            else if (message.indexOf("G3") == 0) {

                const topic = message.replaceAll("'","").split(",")[1];
                const payload = message.replaceAll("'","").split(",")[2];

               // IoT.MQTTmessages.push(topic + "," + payload);

                let myObj = {topic: topic, payload: payload};

                IoT.MQTTmessages.push(myObj);

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_I2C_EVENT,1); 

                //IoT.mqttmessage(topic, payload);
            }
        }  catch(err) {   
            serial.writeLine(err.message)
        }   
    }
    

}