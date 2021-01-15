namespace RainbowSparkleUnicorn {

  export function parseRecievedMessage(message: string) {
        try {
            if (message.indexOf("A1") == 0) {
                const value = parseInt(message.split(",")[1]);
            
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
            }
            else if (message.indexOf("A2") == 0) {
                const volume = parseInt(message.split(",")[1]);
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_VOLUME, volume)
            }  
            
            else if (message.indexOf("A3") == 0) {
                const track = parseInt(message.split(",")[1]);
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_TRACK, track)
            } 

            else if (message.indexOf("B1") == 0) {
                const pin = parseInt(message.split(",")[1]);
            
            led.toggle(1,3)

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, pin)
            }

            else if (message.indexOf("B2") == 0) {
                const pin = parseInt(message.split(",")[1]);
                
            led.toggle(1,2)

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, pin)
            }
            else if (message.indexOf("C1") == 0) {
            const ADC = parseInt(message.split(",")[1]);
            
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_ONE, ADC)
            }

            else if (message.indexOf("C2") == 0) {
            const ADC = parseInt(message.split(",")[1]);

            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, ADC)
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

            else if (message.indexOf("E") == 0) {

                const state = parseInt(message.split(",")[1]);
                const pin = parseInt(message[0].slice(1));

                if (state == 0) {
                    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, pin)
                } else {
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

        else if (message.indexOf("G1") == 0) {
                //store ip address
                const IP = message.split(",")[1];
                setIPAddress(IP);

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_IP_RECEIVED,1);            
        } 

        else if (message.indexOf("G2") == 0) {

                const connected = parseInt(message[1]);

                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MQTT_CONNECTED,connected);            
        }
        }  catch(err) {   
            sendMessage(err.message)
        }   
    }
    
}