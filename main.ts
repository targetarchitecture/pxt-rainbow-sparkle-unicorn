
RainbowSparkleUnicorn.Touch.onTouched(RainbowSparkleUnicorn.Touch.Pins.P5,function () {
    basic.showIcon(IconNames.Heart)
    //RainbowSparkleUnicorn.Light.turnAllOn()
})

RainbowSparkleUnicorn.Touch.onReleased(RainbowSparkleUnicorn.Touch.Pins.P5, function () {
    basic.showIcon(IconNames.SmallHeart)
   // RainbowSparkleUnicorn.Light.turnAllOff()
})

RainbowSparkleUnicorn.start()
basic.showIcon(IconNames.Asleep)
