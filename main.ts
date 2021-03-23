RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P15, function () {
    basic.showIcon(IconNames.SmallHeart)
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P1, function () {
    basic.showIcon(IconNames.Angry)
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P0, function () {
    basic.showIcon(IconNames.Yes)
})
RainbowSparkleUnicorn.start()
serial.writeNumber(999)
basic.showIcon(IconNames.Heart)
