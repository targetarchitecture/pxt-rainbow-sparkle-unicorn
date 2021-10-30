RainbowSparkleUnicorn.start()

RainbowSparkleUnicorn.Touch.onTouched(RainbowSparkleUnicorn.Touch.Pins.P0, function () {
    basic.showString("T")
})

RainbowSparkleUnicorn.Touch.onAnyTouched( function (pin) {
    basic.showNumber(pin)
})

RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P0, function () {
  basic.showString("A")
})

RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P1,function () {
    basic.showString("B")
})

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P0, function () {
    basic.showIcon(IconNames.Heart)
})

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P1, function () {
    basic.showIcon(IconNames.SmallHeart)
})

RainbowSparkleUnicorn.Switch.onAnyPressed( function (pin) {
    basic.showNumber(pin)
})
