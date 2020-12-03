
namespace RainbowSparkleUnicorn {

    //% subcategory="Expert" 
    //% block="set $servo pulse to %micros μs"
    //% micros.min=0 micros.max=4096
    export function setServoPulse(servo: Servo, micros: number) {
        micros = Math.clamp(0, 4096, micros);

        sendMessage("V6," + servo + "," + micros);
    }

    //% subcategory="Movement" 
    //% block="set $servo angle to %angle between %minPulse and %maxPulse %%"
    //% angle.min=0 angle.max=180
    export function setServoAngle(servo: Servo, angle: number,minPulse: number, maxPulse: number) {
        angle = Math.clamp(0, 180, angle);
        minPulse = Math.clamp(0, 4096, minPulse);
        maxPulse = Math.clamp(0, 4096, maxPulse);

        sendMessage("V2," + servo + "," + angle + "," + minPulse + "," + maxPulse);
    }
 
        //% subcategory="Movement" 
    //% block="move $servo linear from %fromAngle to %toAngle in %duration seconds (%minPulse and %maxPulse)"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoLinear(servo: Servo, fromAngle: number, toAngle: number, duration:number, minPulse: number, maxPulse: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        duration = Math.min(0, duration);
        minPulse = Math.clamp(0, 4096, minPulse);
        maxPulse = Math.clamp(0, 4096, maxPulse);

        sendMessage("V3," + servo + "," + fromAngle + "," + toAngle +"," + duration +"," + minPulse + "," + maxPulse);
    }

        //% subcategory="Movement" 
    //% block="move $servo bouncy from %fromAngle to %toAngle in %duration seconds (%minPulse and %maxPulse)"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoBouncy(servo: Servo, fromAngle: number, toAngle: number, duration:number, minPulse: number, maxPulse: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        duration = Math.min(0, duration);
        minPulse = Math.clamp(0, 4096, minPulse);
        maxPulse = Math.clamp(0, 4096, maxPulse);

        sendMessage("V4," + servo + "," + fromAngle + "," + toAngle +"," + duration +"," + minPulse + "," + maxPulse);
    }

            //% subcategory="Movement" 
    //% block="move $servo smoothly from %fromAngle to %toAngle in %duration seconds (%minPulse and %maxPulse)"
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoSmoothly(servo: Servo, fromAngle: number, toAngle: number, duration:number, minPulse: number, maxPulse: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        duration = Math.min(0, duration);
        minPulse = Math.clamp(0, 4096, minPulse);
        maxPulse = Math.clamp(0, 4096, maxPulse);

        sendMessage("V5," + servo + "," + fromAngle + "," + toAngle +"," + duration +"," + minPulse + "," + maxPulse);
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
