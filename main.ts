RainbowSparkleUnicorn.start()

// RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P0, function (pin) {
//   basic.showNumber(pin)
// })

// RainbowSparkleUnicorn.Switch.onPressed(RainbowSparkleUnicorn.Switch.Pins.P1,function (pin) {
//     basic.showNumber(pin)
// })

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P0, function () {
    basic.showIcon(IconNames.Heart)
})

RainbowSparkleUnicorn.Switch.onReleased(RainbowSparkleUnicorn.Switch.Pins.P1, function () {
    basic.showIcon(IconNames.SmallHeart)
})

RainbowSparkleUnicorn.Switch.onAnyPressed( function (pin) {
    basic.showNumber(pin)
})
