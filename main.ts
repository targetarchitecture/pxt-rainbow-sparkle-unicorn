let switchStates = ""
basic.showIcon(IconNames.No)
RainbowSparkleUnicorn.Sound.setVolume(20)
RainbowSparkleUnicorn.Sound.playTrack(1)
basic.forever(function () {
    RainbowSparkleUnicorn.Controls.dial1(randint(0, 254))
    RainbowSparkleUnicorn.Controls.dial2(randint(0, 254))
    basic.pause(1000)
})
basic.forever(function () {
    switchStates = RainbowSparkleUnicorn.Switch.getSwitchStates()
    RainbowSparkleUnicorn.Light.turnAllOn()
    basic.showIcon(IconNames.Butterfly)
    basic.pause(2000)
    RainbowSparkleUnicorn.Light.turnAllOff()
    basic.showIcon(IconNames.Meh)
    basic.pause(2000)
})
