namespace RainbowSparkleUnicorn.Movement {

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
    //% block="set $servo range from %minimumPulse to %maximumPulse"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"           
    //% minimumPulse.min=0 minimumPulse.max=4096
    //% maximumPulse.min=0 maximumPulse.max=4096
    export function setServoRange(servo: Servo, minimumPulse: number, maximumPulse: number) {
        minimumPulse = Math.clamp(0, 4096, minimumPulse);
        maximumPulse = Math.clamp(0, 4096, maximumPulse);

        //make sure they are right way around
        let servoDetails = servoList[servo].split(",");
        servoDetails[0] = Math.min(minimumPulse,maximumPulse).toString();
        servoDetails[1] = Math.max(minimumPulse,maximumPulse).toString();

        servoList[servo] = servoDetails[0] + "," + servoDetails[1] + "," + servoDetails[2];
    }    

    //% subcategory="Movement" 
    //% weight=20    
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% block="set $servo type $servoType"
    export function setServoType(servo: Servo, sType: ServoType) {

        let servoDetails = servoList[servo].split(",");
        servoDetails[2] = sType.toString();

        servoList[servo] = servoDetails[0] + "," + servoDetails[1] + "," + servoDetails[2];
    }        

    //% subcategory="Movement" 
    //% weight=90        
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% block="set $servo angle to %angle"
    //% angle.min=0 angle.max=180
    export function setServoAngle(servo: Servo, angle=90) {
        angle = Math.clamp(0, 180, angle);

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        _sendMessage("V2," + servo + "," + angle + "," + minP + "," + maxP);
    }
 
    //% subcategory="Movement" 
    //% weight=80            
    //% block="move $servo linear from %fromAngle to %toAngle in %duration seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoLinear(servo: Servo, fromAngle: number, toAngle: number, duration: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);

        if (duration < 0){ duration = 0; }
 
        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

        _sendMessage("V3," + servo + "," + fromAngle + "," + toAngle +"," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% weight=60            
    //% block="move $servo bouncy from %fromAngle to %toAngle in %duration seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoBouncy(servo: Servo, fromAngle: number, toAngle: number, duration: number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        if (duration < 0){ duration = 0; }

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];
        
       // basic.showString(minP);

      _sendMessage("V4," + servo + "," + fromAngle + "," + toAngle + "," + duration + "," + minP + "," + maxP);
    }

    //% subcategory="Movement" 
    //% weight=70            
    //% block="move $servo smoothly from %fromAngle to %toAngle in %duration seconds"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"       
    //% toAngle.min=0 toAngle.max=180
    //% fromAngle.min=0 fromAngle.max=180
    //% duration.min=0 
    export function moveServoSmoothly(servo: Servo, fromAngle: number, toAngle: number, duration:number) {
        fromAngle = Math.clamp(0, 180, fromAngle);
        toAngle = Math.clamp(0, 180, toAngle);
        if (duration < 0){ duration = 0; }

        let servoDetails = servoList[servo].split(",");

        const minP = servoDetails[0];
        const maxP = servoDetails[1];

       _sendMessage("V5," + servo + "," + fromAngle + "," + toAngle +"," + duration + "," + minP + "," + maxP);
    }

    //% weight=50   
    //% subcategory="Movement" 
    //% block="stop $servo"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false" 
    export function stopServo(servo: Servo) {
        _sendMessage("V1," + servo);
    }        

    //% subcategory="Expert" 
    //% group="Movement"    
    //% block="set $servo pulse to %micros μs"
    //% servo.fieldEditor="gridpicker" servo.fieldOptions.columns=6
    //% servo.fieldOptions.tooltips="false"   
    //% micros.min=0 micros.max=4096
    export function setServoPulse(servo: Servo, micros: number) {
        micros = Math.clamp(0, 4096, micros);

        _sendMessage("V6," + servo + "," + micros);
    }
}
