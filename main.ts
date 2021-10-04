let switchStates = ""
let touchStates = ""
let soundPlaying = false
let slider2 = 0
let slider1 = 0
let spinner2 = 0
let spinner1 = 0
basic.showIcon(IconNames.No)
RainbowSparkleUnicorn.Sound.setVolume(20)
RainbowSparkleUnicorn.Sound.playTrack(1)
basic.forever(function () {
    RainbowSparkleUnicorn.Controls.dial1(randint(0, 254))
    RainbowSparkleUnicorn.Controls.dial2(randint(0, 254))
    basic.pause(1000)
    basic.showIcon(IconNames.SmallHeart)
})
basic.forever(function () {
    spinner1 = RainbowSparkleUnicorn.Controls.encoder1value()
    spinner2 = RainbowSparkleUnicorn.Controls.encoder2value()
    slider1 = RainbowSparkleUnicorn.Controls.Slider1()
    slider2 = RainbowSparkleUnicorn.Controls.Slider2()
    soundPlaying = RainbowSparkleUnicorn.Sound.playingSound()
    touchStates = RainbowSparkleUnicorn.Touch.getTouchStates()
    switchStates = RainbowSparkleUnicorn.Switch.getSwitchStates()
    RainbowSparkleUnicorn.Light.turnAllOn()
    basic.showIcon(IconNames.Butterfly)
    basic.pause(2000)
    RainbowSparkleUnicorn.Light.turnAllOff()
    basic.showIcon(IconNames.Meh)
    basic.pause(2000)
})
