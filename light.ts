namespace RainbowSparkleUnicorn {

    //% subcategory="Light" 
    //% block="blink light"
    export function blink(pin: number, timeOn: number, timeOff: number) {
        let cmd = "Y1," + pin + "," + timeOn + "," + timeOff
       sendMessage(cmd)
    }

    //% subcategory="Light" 
    //% block="breathe light"
        export function breathe(pin: number, timeOn: number, timeOff: number, rise: number, fall: number) {
        let cmd = "Y2," + pin + "," + timeOn + "," + rise + "," + fall
        sendMessage(cmd)
    }
}

enum Light {
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