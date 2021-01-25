namespace RainbowSparkleUnicorn.IoT {

    let MQTTIPAddress: string = "0.0.0.0";

     /**
     * Setup MQTT 
     * Example connectToInterWeb("152 2.4GHz","derwenthorpe","broker.shiftr.io","914bc336","9c0279e562dd0e1e","SN4")
     */
    //% subcategory="IoT" 
    //% weight=100
    //% WiFiName.defl="SSID"
    //% WiFiPassword.defl="Network Password"
    //% MQTTServer.defl="xxx.cloud.shiftr.io"
    //% MQTTKey.defl="MQTT Key"
    //% MQTTPassword.defl="MQTT Password"
    //% MQTTClient.defl="My Microbit"
    //% block="Connect to MQTT server $WiFiName,$WiFiPassword,$MQTTServer,$MQTTKey,$MQTTPassword,$MQTTClient"
    export function connectToInterWeb(WiFiName: string, WiFiPassword: string,MQTTServer: string,MQTTKey: string,MQTTPassword: string,MQTTClient: string) {

        _sendMessage("T1," + WiFiName);
        _sendMessage("T2," + WiFiPassword);
        _sendMessage("T3");

        control.waitForEvent(RAINBOW_SPARKLE_UNICORN_IP_RECEIVED, 1);

        // for (let index = 0; index < 11; index++) {
        //     basic.pause(1000);

        //     if (MQTTIPAddress.indexOf("0.0.0.0") == -1){
        //         break;
        //     }
        // } 

        //connect to MQTT server
        _sendMessage("T4," + MQTTServer);
        _sendMessage("T5," + MQTTClient);
        _sendMessage("T6," + MQTTKey); 
        _sendMessage("T7," + MQTTPassword);
        _sendMessage("T8"); 

        control.waitForEvent(RAINBOW_SPARKLE_UNICORN_MQTT_CONNECTED, EventBusValue.MICROBIT_EVT_ANY);      
    }
    
    //% subcategory="IoT" 
    //% weight=90
    //% topic.defl="Topic"
    //% message.defl="Hello World"   
    //% block="Send MQTT message $topic, $message"
    export function sendMQTTMessage(topic: string, message: string) {

        _sendMessage("T9," + topic + "," + message);
    }

    //% subcategory="IoT" 
    //% weight=80
    //% topic.defl="Topic"
    //% message.defl="1234567890"   
    //% block="Send MQTT number $topic, $message"
    export function sendMQTTNumber(topic: string, message: number) {
        _sendMessage("T9," + topic + "," + message);
    }   


    //% subcategory="IoT" 
    //% weight=70
    //% block="Start receiving messages on topic $topic"
    export function startReceivingMessages(topic: string) {
        _sendMessage("T10," + topic);
    }   


    //% subcategory="IoT" 
    //% weight=60
    //% block="Stop receiving messages on topic $topic"
    export function stopReceivingMessages(topic: string) {
        _sendMessage("T11," + topic);
    }   


     /**
     * Returns the current IP address
     */
    //% subcategory="IoT"
    //% weight=10 
    //% block="current IP address"
    export function IPAddress(): string {
        return MQTTIPAddress;
    }   

    export function _setIPAddress(IP: string)  {
         MQTTIPAddress = IP;
    }   
}
