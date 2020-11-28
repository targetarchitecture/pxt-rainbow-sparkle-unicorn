namespace RainbowSparkleUnicorn {

    basic.forever(function () {
        if (sendQueue.length > 0) {
            serial.writeLine(sendQueue.pop());
        }
        basic.pause(10);
    })

 let sendQueue = [""];

    export function sendMessage(message: string): void {
        sendQueue.push(message);
    }

    serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
        let msg = serial.readUntil(serial.delimiters(Delimiters.Hash));

        parseRecievedMessage(msg);
    })

    function parseRecievedMessage(message: string) {
        if (message.indexOf("A1") == 0) {
            const value = parseInt(message.split(",")[1]);
           
            control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, value)
        }
        else if (message.indexOf("B1") == 0) {
            const value = parseInt(message.split(",")[1]);

            MPR121touched[value] = true

            //raise touch flag EventBusSource              
       control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, value)
        }
        else if (message.indexOf("B2") == 0) {
            const value = parseInt(message.split(",")[1]);

            MPR121touched[value] = false

            //raise touch flag EventBusSource              
    control.raiseEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_RELEASED, value)
        }

        else if (message.indexOf("C1") == 0) {
            const value = parseInt(message.split(",")[1]);

            //raise touch flag EventBusSource              
control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_ONE, value)
        }

        else if (message.indexOf("C2") == 0) {
            const value = parseInt(message.split(",")[1]);

            //raise touch flag EventBusSource              
       control.raiseEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, value)
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

            const state = message.split(",")[1];
            const pin = parseInt(message[0].slice(1));

            if (state == "H") {
                SX1509state[pin] = 1;
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, pin)
            } else {
                SX1509state[pin] = 0;
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
    }   

}