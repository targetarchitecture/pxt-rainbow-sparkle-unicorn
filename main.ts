RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P1, function () {
    led.plot(2, 2)
})
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P1, function () {
    led.unplot(2, 2)
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printDebugMessages()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.Controls.dial1(Math.random() * 30)
