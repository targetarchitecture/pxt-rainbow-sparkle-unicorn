RainbowSparkleUnicorn.IoT.onMQTTReceived(function () {
    msg = RainbowSparkleUnicorn.IoT.MQTTmessages.shift()
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showString("" + (msg.payload))
})
let msg: RainbowSparkleUnicorn.IoT.MQTTmessage;
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printDebugMessages()
RainbowSparkleUnicorn.printReceivedMessages()
basic.showIcon(IconNames.Heart)
RainbowSparkleUnicorn.IoT.connectToInterWeb(
"152 2.4GHz",
"derwenthorpe",
"targetarchitecture.cloud.shiftr.io",
"targetarchitecture",
"qdDjMxAzLvQPRk6u",
"BBC Microbit"
)
basic.showIcon(IconNames.SmallHeart)
RainbowSparkleUnicorn.IoT.sendMQTTNumber("SN7", control.millis())
basic.showIcon(IconNames.Heart)
RainbowSparkleUnicorn.IoT.startReceivingMessages("Hi")
basic.showIcon(IconNames.SmallHeart)
RainbowSparkleUnicorn.IoT.sendMQTTNumber("Hi", control.millis())
basic.showIcon(IconNames.Heart)
