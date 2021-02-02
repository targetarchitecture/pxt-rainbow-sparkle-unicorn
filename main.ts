RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P9, function () {
    led.unplot(2, 0)
})
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P1, function () {
    led.unplot(1, 0)
})
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P0, function () {
    led.unplot(0, 0)
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P9, function () {
    led.plot(2, 0)
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P1, function () {
    led.plot(1, 0)
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P0, function () {
    led.plot(0, 0)
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printDebugMessages()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.Controls.dial1(20)
