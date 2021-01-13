namespace RainbowSparkleUnicorn {

if (initialised == true){
}

   export function sendMessage(message: string): void {
        serial.writeString(message + "\r\n");
        //led.toggle(0,0)
     }

    function checkMessage(message: string): boolean
     {
        if (message.isEmpty() == true){
            return false;
        }

        if (message.length < 3) {
            return false;
        }

        let X = message.split(",");
        let Y = X.length;

         if (Y < 2){
            return false;
        }

        return true;
     }


}