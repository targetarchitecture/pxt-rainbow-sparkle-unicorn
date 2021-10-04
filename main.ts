let spinner1 = 0
let spinner2 = 0
let slider1 = 0
let slider2 = 0
let soundPlaying = false
let touchStates = ""
let switchStates = ""
basic.forever(function () {
    spinner1 = RainbowSparkleUnicorn.Controls.encoder1value()
    spinner2 = RainbowSparkleUnicorn.Controls.encoder2value()
    slider1 = RainbowSparkleUnicorn.Controls.Slider1()
    slider2 = RainbowSparkleUnicorn.Controls.Slider2()
    soundPlaying = RainbowSparkleUnicorn.Sound.playingSound()
    touchStates = RainbowSparkleUnicorn.Touch.getTouchStates()
    switchStates = RainbowSparkleUnicorn.Switch.getSwitchStates()
    RainbowSparkleUnicorn.Controls.dial1(randint(0, 254))
    basic.pause(50)
})
