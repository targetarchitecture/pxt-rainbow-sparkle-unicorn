
namespace RainbowSparkleUnicorn {

enum ServoType {
    //% block="Normal"
    Normal = 0,
    //% block="Rotating"
    Rotating = 1
}       
let servoList = [
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0",
"100,500,0"];

    //% subcategory="Expert" 
    //% block="set $servo pulse to %micros μs"
    //% micros.min=0 micros.max=4096
    export function setServoPulse(servo: Servo, micros: number) {
        micros = Math.clamp(0, 4096, micros);

        sendMessage("V6," + servo + "," + micros);
    }

    //% subcategory="Movement" 
    //% block="set $servo range from %minimumPulse to %maximumPulse"
    //% minimumPulse.min=0 minimumPulse.max=4096
    //% maximumPulse.min=0 maximumPulse.max=4096
    export function setServoRange(servo: Servo, minimumPulse: number, maximumPulse: number) {
        minimumPulse = Math.clamp(0, 4096, minimumPulse);
        maximumPulse = Math.clamp(0, 4096, maximumPulse);

        //make sure they are right way around
        let msg = servoList[servo].split(",");
        msg[0] = Math.min(minimumPulse,maximumPulse).toString();
        msg[1] = Math.max(minimumPulse,maximumPulse).toString();

        servoList[servo] = msg[0] + "," + msg[1] + "," + msg[2];
    }    

    //% subcategory="Movement" 
    //% block="set $servo type $servoType"
    export function setServoType(servo: Servo, sType: ServoType) {

        let msg = servoList[servo].split(",");
        msg[2] = sType.toString();

        servoList[servo] = msg[0] + "," + msg[1] + "," + msg[2];
    }        

    //% subcategory="Movement" 
    //% block="set $servo angle to %angle"
    //% angle.min=0 angle.max=180
    export function setServoAngle(servo: Servo, angle=90) {
        angle = Math.clamp(0, 180, angle);

        let msg = servoList[servo].split(",");

        const minP = msg[0];
        const maxP = msg[1];

        sendMessage("V2," + servo + "," + angle + "," + minP + "," + maxP);
    }
 
    //% subcategory="Movement" 
    //% block="move $servo linear from %fromAngle to %toAngle in %duration seconds"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoLinear(servo: Servo, fromAngle: number, toAngle: number, duration: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);

        if (duration < 0){ duration = 0; }
 
        let msg = servoList[servo].split(",");

        const minP = msg[0];
        const maxP = msg[1];

        sendMessage("V3," + servo + "," + fromAngle + "," + toAngle +"," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% block="move $servo bouncy from %fromAngle to %toAngle in %duration seconds"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoBouncy(servo: Servo, fromAngle: number, toAngle: number, duration: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        if (duration < 0){ duration = 0; }

        let msg = servoList[servo].split(",");

        const minP = msg[0];
        const maxP = msg[1];
        
       // basic.showString(minP);

      sendMessage("V4," + servo + "," + fromAngle + "," + toAngle + "," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% block="move $servo smoothly from %fromAngle to %toAngle in %duration seconds"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoSmoothly(servo: Servo, fromAngle: number, toAngle: number, duration:number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        if (duration < 0){ duration = 0; }

        let msg = servoList[servo].split(",");

        const minP = msg[0];
        const maxP = msg[1];

       sendMessage("V5," + servo + "," + fromAngle + "," + toAngle +"," + duration + "," + minP + "," + maxP);
    }
}

enum Servo {
    //% block="Servo 0"
    S0 = 0,
    //% block="Servo 1"
    S1 = 1,
    //% block="Servo 2"
    S2 = 2,
    //% block="Servo 3"
    S3 = 3,
    //% block="Servo 4"
    S4 = 4,
    //% block="Servo 5"
    S5 = 5,
    //% block="Servo 6"
    S6 = 6,
    //% block="Servo 7"
    S7 = 7,
    //% block="Servo 8"
    S8 = 8,
    //% block="Servo 9"
    S9 = 9,
    //% block="Servo 10"
    S10 = 10,
    //% block="Servo 11"
    S11 = 11,
    //% block="Servo 12"
    S12 = 12,
    //% block="Servo 13"
    S13 = 13,
    //% block="Servo 14"
    S14 = 14,
    //% block="Servo 15"
    S15 = 15
}
