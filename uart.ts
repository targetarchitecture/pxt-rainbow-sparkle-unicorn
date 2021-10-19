namespace RainbowSparkleUnicorn {

    let SBUSY: string[] = [];
    let ROTARY1: string[] = [];
    let ROTARY2: string[] = [];
    let SLIDER1: string[] = [];
    let SLIDER2: string[] = [];
    let SUPDATE: string[] = [];
    let TUPDATE: string[] = [];

    export function _sendMessage(message: string): void {
        serial.writeLine(message);
    }

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {

        let msg = serial.readUntil(serial.delimiters(Delimiters.NewLine));

        let msgParts = msg.trim().split(":");

        //check for something to pop on array
        if (msgParts[1].length > 0) {

            if (msgParts[0] == "SBUSY") {
                SBUSY.push(msgParts[1]);
            }

            if (msgParts[0] == "SUPDATE") {
                SUPDATE.push(msgParts[1]);
            }
        }


    })

    export function _readMessage(message: string, topic: string): string {

        //send first
        _sendMessage(message);

        let queuedMessage = "";

        if (topic == "SBUSY") {
            queuedMessage = SBUSY.pop();
        }

        if (topic == "SUPDATE") {
            queuedMessage = SUPDATE.pop();
        }

        return queuedMessage;
    }



}
