input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 500; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 12))
    }
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(15)
