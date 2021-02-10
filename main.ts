input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.restartESP32()
})
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.restartESP32()
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.printDebugMessages()
basic.showIcon(IconNames.Heart)
