namespace RainbowSparkleUnicorn.IoT {
   export function _dealWithMQTTMessage(message: string) {
        if (MQTTChange != null) {
            MQTTChange(message)
        }
    }

    let MQTTChange: (message: string) => void = null

    /**
    * Use the Internet of Things (IoT) to control your projects
    */
    //% subcategory="IoT" 
    //% group="Messaging"
    //% block="on IoT message arriving"
    //% weight=65
    export function onNewMQTTMessage(handler: (message: string) => void): void {
        MQTTChange = handler;
    }
}

// basic.showIcon(IconNames.Heart)
// namespace RainbowSparkleUnicorn.PS2 {
//     RainbowSparkleUnicorn.IoT.onBusyChange(function (message) {
//         basic.showString(message);
//     })
// }
