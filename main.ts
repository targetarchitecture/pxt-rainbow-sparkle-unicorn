RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P15, function () {
    music.playTone(187, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P3, function () {
    music.playTone(180, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P9, function () {
    music.playTone(659, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P2, function () {
    music.playTone(200, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P10, function () {
    music.playTone(131, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P1, function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P11, function () {
    music.playTone(147, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P13, function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P0, function () {
    music.playTone(165, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.printDebugMessages()
RainbowSparkleUnicorn.Light.turnOn(lightPins.P0)
basic.showIcon(IconNames.Heart)
