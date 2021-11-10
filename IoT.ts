namespace RainbowSparkleUnicorn.IoT {
    export function _dealWithMQTTMessage(message: string) {
        if (MQTTChange != null) {

            let parts = message.split("','");

            let topic = parts[0];
            let content = parts[1];

            MQTTChange(topic, content);
        }
    }

    let MQTTChange: (topic: string, message: string) => void = null

    /**
    * Use the Internet of Things (IoT) to control your projects
    */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="on IoT message arriving"
    //% weight=65
    export function onNewMQTTMessage(handler: (topic: string, message: string) => void): void {
        MQTTChange = handler;
    }

    /**
     * Listen (subscribe) to IoT messages on a topic
     * @param topic 
     */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="subscribe to topic $topic"   
    export function listen(topic: string) {
        _sendMessage("SUBSCRIBE," + topic)
    }

    /**
     * Publish an IoT messages on a topic
     * @param topic 
     * @param message
     */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="publish an IoT message to topic $topic with content $message"   
    export function publish(topic: string, message: string) {
        _sendMessage("PUBLISH," + topic + "|" + message);
    }
}


