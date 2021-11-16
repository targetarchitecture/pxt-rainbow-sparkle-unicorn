RainbowSparkleUnicorn.Touch.onAnyTouched(function (pin) {
    RainbowSparkleUnicorn.Light.turnAllOn()
})
RainbowSparkleUnicorn.Touch.onAnyReleased(function (pin) {
    RainbowSparkleUnicorn.Light.turnAllOff()
})
RainbowSparkleUnicorn.start()
basic.showIcon(IconNames.Asleep)
