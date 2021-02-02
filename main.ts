RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P1, function () {
    serial.writeString("P1? " + control.eventValue())
    led.plot(2, 2)
    RainbowSparkleUnicorn.Controls.dial1(Math.random() * 30)
})
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P1, function () {
    led.unplot(2, 2)
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P0, function () {
    serial.writeString("P0? " + control.eventValue())
    led.plot(0, 0)
    RainbowSparkleUnicorn.Controls.dial1(Math.random() * 30)
})
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P0, function () {
    led.unplot(0, 0)
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.P9, function () {
    serial.writeString("P9? " + control.eventValue())
    led.plot(4, 4)
    RainbowSparkleUnicorn.Controls.dial1(Math.random() * 30)
})
// serial.writeString(control.eventValue() );
RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.P9, function () {
    led.unplot(4, 4)
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printDebugMessages()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.Controls.dial1(Math.random() * 30)
