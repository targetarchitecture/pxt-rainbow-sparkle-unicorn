

namespace RainbowSparkleUnicorn.Movement {

    declare const enum Servo {
        //% block="Servo 0"
        P0 = 0,
        //% block="Servo 1"
        P1 = 1,
        //% block="Servo 2"
        P2 = 2,
        //% block="Servo 3"
        P3 = 3,
        //% block="Servo 4"
        P4 = 4,
        //% block="Servo 5"
        P5 = 5,
        //% block="Servo 6"
        P6 = 6,
        //% block="Servo 7"
        P7 = 7,
        //% block="Servo 8"
        P8 = 8,
        //% block="Servo 9"
        P9 = 9,
        //% block="Servo 10"
        P10 = 10,
        //% block="Servo 11"
        P11 = 11,
        //% block="Servo 12"
        P12 = 12,
        //% block="Servo 13"
        P13 = 13,
        //% block="Servo 14"
        P14 = 14,
        //% block="Servo 15"
        P15 = 15
    }

    declare const enum ServoType {
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

    //% subcategory="Movement" 
    //% weight=10
    //% inlineInputMode=inline
    //% block="set $servo range from $minimumPulse to $maximumPulse"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"           
    //% minimumPulse.min=0 minimumPulse.max=4096
    //% maximumPulse.min=0 maximumPulse.max=4096
    export function setServoRange(servo: Servo, minimumPulse: number, maximumPulse: number) {
        minimumPulse = Math.constrain(minimumPulse, 0, 4096);
        maximumPulse = Math.constrain(maximumPulse, 0, 4096);

        //make sure they are right way around
        let servoDetails = servoList[servo].split(",");
        servoDetails[0] = Math.min(minimumPulse, maximumPulse).toString();
        servoDetails[1] = Math.max(minimumPulse, maximumPulse).toString();

        servoList[servo] = servoDetails[0] + "," + servoDetails[1] + "," + servoDetails[2];
    }

    //% subcategory="Movement" 
    //% weight=20    
    //% inlineInputMode=inline
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% block="set $servo type $sType"
    export function setServoType(servo: Servo, sType: ServoType) {

        let servoDetails = servoList[servo].split(",");
        servoDetails[2] = sType.toString();

        servoList[servo] = servoDetails[0] + "," + servoDetails[1] + "," + servoDetails[2];
    }

    //% subcategory="Movement" 
    //% weight=90  
    //% inlineInputMode=inline      
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% block="set $servo angle to $angle"
    //% angle.min=0 angle.max=180    
    export function setServoAngle(servo: Servo, angle = 90) {
        angle = Math.constrain(angle, 0, 180);

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        _sendMessage("MANGLE," + servo + "," + angle + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% weight=80  
    //% inlineInputMode=inline          
    //% block="move|$servo|linear from|$fromAngle|to|$toAngle in|$duration|seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180 toAngle.defl=180
    //% fromAngle.min=0 fromAngle.max=180 fromAngle.defl=0
    //% duration.min=0 
    //% duration.defl=20     
    export function moveServoLinear(servo: Servo, fromAngle: number, toAngle: number, duration: number) {
        fromAngle = Math.constrain(fromAngle, 0, 180);
        toAngle = Math.constrain(toAngle, 0, 180);

        if (duration < 0) { duration = 0; }

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        _sendMessage("MLINEAR," + servo + "," + fromAngle + "," + toAngle + "," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% weight=60   
    //% inlineInputMode=inline         
    //% block="move|$servo|bouncy from|$fromAngle|to|$toAngle in|$duration|seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180 toAngle.defl=180
    //% fromAngle.min=0 fromAngle.max=180 fromAngle.defl=0
    //% duration.min=0 
    //% duration.defl=20         
    export function moveServoBouncy(servo: Servo, fromAngle: number, toAngle: number, duration: number) {

        fromAngle = Math.constrain(fromAngle, 0, 180);
        toAngle = Math.constrain(toAngle, 0, 180);

        if (duration < 0) { duration = 0; }

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        // basic.showString(minP);

        _sendMessage("MBOUNCY," + servo + "," + fromAngle + "," + toAngle + "," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% weight=70      
    //% inlineInputMode=inline      
    //% block="move|$servo|smoothly from|$fromAngle|to|$toAngle in|$duration|seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180 toAngle.defl=180
    //% fromAngle.min=0 fromAngle.max=180 fromAngle.defl=0
    //% duration.min=0 
    //% duration.defl=20         
    export function moveServoSmoothly(servo: Servo, fromAngle: number, toAngle: number, duration: number) {

        fromAngle = Math.constrain(fromAngle, 0, 180);
        toAngle = Math.constrain(toAngle, 0, 180);

        if (duration < 0) { duration = 0; }

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        _sendMessage("MSMOOTH," + servo + "," + fromAngle + "," + toAngle + "," + duration + "," + minP + "," + maxP);
    }

    //% weight=50   
    //% inlineInputMode=inline
    //% subcategory="Movement" 
    //% block="stop $servo"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false" 
    export function stopServo(servo: Servo) {
        _sendMessage("MSTOP," + servo);
    }

    //% subcategory="Expert" 
    //% group="Movement" 
    //% inlineInputMode=inline   
    //% block="set $servo pulse to $micros μs"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"   
    //% micros.min=0 micros.max=4096
    export function setServoPulse(servo: Servo, micros: number) {
        micros = Math.constrain(micros, 0, 4096)
        _sendMessage("MPWM," + servo + "," + micros);
    }
}



