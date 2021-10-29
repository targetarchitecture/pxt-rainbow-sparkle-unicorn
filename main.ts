RainbowSparkleUnicorn.start()

// RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P0, function (pin) {
//   basic.showNumber(pin)
// })

// RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P1,function (pin) {
//     basic.showNumber(pin)
// })

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P0, function (pin) {
    basic.clearScreen()
})

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P1, function () {
    basic.clearScreen()
})

RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.Any, function (pin) {
    basic.showNumber(pin)
})
