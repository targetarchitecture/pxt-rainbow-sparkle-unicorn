let x = 0
RainbowSparkleUnicorn.start()
music.playTone(262, music.beat(BeatFraction.Breve))
basic.showIcon(IconNames.StickFigure)
basic.forever(function () {
    if (x == 0) {
        RainbowSparkleUnicorn.Light.turnAllOff()
        x = 1
    } else {
        RainbowSparkleUnicorn.Light.turnAllOn()
        x = 0
    }
    basic.pause(1000)
})
