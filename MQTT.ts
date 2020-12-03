namespace RainbowSparkleUnicorn {

     /**
     * Setup MQTT 
     * Example connectToInterWeb("152 2.4GHz","derwenthorpe","broker.shiftr.io","914bc336","9c0279e562dd0e1e","SN4")
     */
    //% subcategory="MQTT" 
    //% block="Connect to MQTT server $WiFiName,$WiFiPassword,$MQTTServer,$MQTTKey,$MQTTPassword,$MQTTClient"
    export function connectToInterWeb(WiFiName: string, WiFiPassword: string,MQTTServer: string,MQTTKey: string,MQTTPassword: string,MQTTClient: string) {

        //TODO: improve this!
        WiFiName = WiFiName.split(' ').join('PPP');
        WiFiPassword = WiFiPassword.split(' ').join('PPP');        

        sendMessage("T1," + WiFiName);
        sendMessage("T2," + WiFiPassword);
        sendMessage("T3");
        basic.pause(1000);
        sendMessage("T4," + MQTTServer);
        sendMessage("T5," + MQTTClient);
        sendMessage("T6," + MQTTKey); 
        sendMessage("T7," + MQTTPassword);
        sendMessage("T8");

          for (let index = 0; index < 11; index++) {
            basic.pause(1000);

            if (IPAddress() != "0.0.0.0"){
                break;
            }
          }        
    }
    
    //% subcategory="MQTT" 
    //% block="Send MQTT message $topic, $message"
    export function sendMQTTMessage(topic: string, message: string) {

        //TODO: improve this!
        //topic = topic.split(' ').join('PPP');
        //message = message.split(' ').join('PPP');

        sendMessage("T9," + topic + "," + message);
    }

    //% subcategory="MQTT" 
    //% block="Send MQTT number $topic, $message"
    export function sendMQTTNumber(topic: string, message: number) {

        //TODO: improve this!
        //topic = topic.split(' ').join('PPP');
        //message = message.split(' ').join('PPP');

        sendMessage("T9," + topic + "," + message);
    }   

     /**
     * Returns the current IP address
     */
    //% subcategory="MQTT" 
    //% block="current IP address"
    export function IPAddress(): string {
        return MQTTIPAddress;
    }   


   /**
   * Do something when your connected to MQTT
   * @param handler body code to run when event is raised
   */
    //% subcategory="MQTT"
    //% block="on connected"
    export function onMQTTConnected(handler: () => void) {
        control.onEvent(
           RAINBOW_SPARKLE_UNICORN_IP_ADDRESS,
            MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }

}
