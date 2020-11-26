namespace RainbowSparkleUnicorn {

 
    export function blink(pin: number, timeOn: number, timeOff: number) {
        let cmd = "Y1," + pin + "," + timeOn + "," + timeOff
        serial.writeLine(cmd)
    }


        export function breathe(pin: number, timeOn: number, timeOff: number, rise: number, fall: number) {
        let cmd = "Y2," + pin + "," + timeOn + "," + rise + "," + fall
        serial.writeLine(cmd)
    }

}
