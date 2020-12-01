namespace RainbowSparkleUnicorn {

    export function sendMessage(message: string): void {
        serial.writeLine(message);
     }

    serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
        
        let msg = serial.readUntil(serial.delimiters(Delimiters.Hash));

        parseRecievedMessage(msg);
    })

    function parseRecievedMessage(message: string) {
    try {
        if (message.indexOf("A1") == 0) {
            const value = parseInt(message.split(",")[1]);
           
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
        }
        else if (message.indexOf("B1") == 0) {
            const pin = parseInt(message.split(",")[1]);

            MPR121touched[pin] = true
           
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, pin)
        }
        else if (message.indexOf("B2") == 0) {
            const pin = parseInt(message.split(",")[1]);

            MPR121touched[pin] = false
            
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, pin)
        }
        else if (message.indexOf("C1") == 0) {
            ADC1value = parseInt(message.split(",")[1]);
          
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_ONE, ADC1value)
        }
        else if (message.indexOf("C2") == 0) {
           ADC2value = parseInt(message.split(",")[1]);

           control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, ADC2value)
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
                SX1509state[pin] = switchState.pressed; 
            } else {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, pin)
                SX1509state[pin] = switchState.released; 
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
    }  catch(err) {   
     sendMessage(err.message);
    }   
    }
}