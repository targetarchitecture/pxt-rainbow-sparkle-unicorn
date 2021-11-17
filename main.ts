RainbowSparkleUnicorn.Touch.onReleased(RainbowSparkleUnicorn.Touch.Pins.P7, function () {
    RainbowSparkleUnicorn.Light.turnAllOff()
})

RainbowSparkleUnicorn.Touch.onTouched(RainbowSparkleUnicorn.Touch.Pins.P7, function () {
    RainbowSparkleUnicorn.Light.turnAllOn()
})

RainbowSparkleUnicorn.start()
basic.showIcon(IconNames.Asleep)
