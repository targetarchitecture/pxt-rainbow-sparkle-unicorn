let x = 0
RainbowSparkleUnicorn.start()
//music.playTone(262, music.beat(BeatFraction.Breve))
basic.showIcon(IconNames.StickFigure)
basic.forever(function () {
    if (x == 0) {
        RainbowSparkleUnicorn.Light.turnAllOff()
        x = 1
    } else {
        RainbowSparkleUnicorn.Light.turnAllOn()
        x = 0
    }
    basic.pause(100)
})
basic.forever(function () {
	
    const l = RainbowSparkleUnicorn.messageQueue.length;

    basic.showNumber(l)

    //basic.pause(500)
})
