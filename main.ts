RainbowSparkleUnicorn.start()

RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P0, function (pin) {
  basic.showNumber(pin)
})

RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P1,function () {
    basic.showNumber(RainbowSparkleUnicorn.Switch.Pins.P1)
})
