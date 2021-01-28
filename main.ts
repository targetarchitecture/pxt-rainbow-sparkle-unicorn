
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.IoT.connectToInterWeb(
"152 2.4GHz",
"derwenthorpe",
"targetarchitecture.cloud.shiftr.io",
"targetarchitecture",
"qdDjMxAzLvQPRk6u",
"BBC Microbit"
)

RainbowSparkleUnicorn.IoT.onMQTTReceived(function () {
  let msg = RainbowSparkleUnicorn.IoT.MQTTmessages.shift();
})

RainbowSparkleUnicorn.IoT.sendMQTTNumber("SN7", control.millis())
RainbowSparkleUnicorn.IoT.startReceivingMessages("Hi")
RainbowSparkleUnicorn.IoT.sendMQTTNumber("Hi", control.millis())

