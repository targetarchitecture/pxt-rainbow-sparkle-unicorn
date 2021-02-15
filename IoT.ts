namespace RainbowSparkleUnicorn.IoT {

    export interface MQTTmessage {
        topic: string;
        payload: string;
    }

    let _IPAddress: string = "0.0.0.0";
    export let _MQTTConnected: number = -1;
    //export let MQTTmessages: string[] = [];
    export let MQTTmessages: MQTTmessage[] = [];

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

      // basic.pause(10)
      // _sendMessage("T1," + WiFiName);
      //  basic.pause(10)     
      // _sendMessage("T2," + WiFiPassword);
      //  basic.pause(10)        

        printDebugMsgs("Connecting to Wifi");

        _sendMessage("T3," + WiFiName + "," + WiFiPassword);

        control.waitForEvent(RAINBOW_SPARKLE_UNICORN_IP_RECEIVED, 1);

        printDebugMsgs("IP:" + _IPAddress);

        //connect to MQTT server
        for (let index = 0; index <= 10; index++) {

            printDebugMsgs("Connecting to MQTT (loop " + index + ")");

            basic.pause(50);
            _sendMessage("T4," + MQTTServer);
            basic.pause(50);
            _sendMessage("T5," + MQTTClient);
            basic.pause(50);
            _sendMessage("T6," + MQTTKey);
            basic.pause(50);         
            _sendMessage("T7," + MQTTPassword);
            basic.pause(50);
            _sendMessage("T8"); 

            printDebugMsgs("Waiting for result");

            //wait a second to see if we have a positive response
            basic.pause(1000);

            if (_MQTTConnected != 1){
                printDebugMsgs("MQTT Connected!");
                break;
            }
        }

        //removed to allow resending of variables
       // control.waitForEvent(_MQTTConnected, EventBusValue.MICROBIT_EVT_ANY);      
    }

    function printDebugMsgs(message: string) {
       if (_printDebugMsgs == true){
        serial.writeLine(message);
       }
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

         //need to add some delay in to get this to be more reliable
        basic.pause(150);  
    }   


    //% subcategory="IoT" 
    //% weight=60
    //% block="Stop receiving messages on topic $topic"
    export function stopReceivingMessages(topic: string) {
        _sendMessage("T11," + topic);

        //need to add some delay in to get this to be more reliable
        basic.pause(150);                
    }   


  /**
   * Do something when an MQTT message is received.
   * @param handler body code to run when the event is raised
   */
  //% subcategory="IoT"
  //% block="on MQTT recieved "
  //% weight=20
 export function onMQTTReceived(
    handler: () => void
  ) {
    control.onEvent(
      RAINBOW_SPARKLE_UNICORN_I2C_EVENT, 1,
      () => {
        handler();
      }
    );
  }


    //% subcategory="IoT" 
    //% weight=10
    //% block="get MQTT message"
    export function getMQTTMessage() : RainbowSparkleUnicorn.IoT.MQTTmessage {

        let msg = RainbowSparkleUnicorn.IoT.MQTTmessages.shift();

        return msg;
    }   

     /**
     * Returns the current IP address
     */
    //% subcategory="IoT"
    //% weight=10 
    //% block="current IP address"
    export function IPAddress(): string {
        return _IPAddress;
    }   

    export function _setIPAddress(IP: string)  {
         _IPAddress = IP;
    }  

     /**
     * Turns off the Wifi on the ESP32
     */
    //% subcategory="Expert" 
    //% group="Wifi"  
    //% block="Stop Wifi"
    export function stopWifi() {
        _sendMessage("T12");
    }  


}