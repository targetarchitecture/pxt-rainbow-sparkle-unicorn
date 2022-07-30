RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.Light.turnAllOn()
RainbowSparkleUnicorn.Sound.stop()
basic.showIcon(IconNames.Heart)
loops.everyInterval(1000, function () {
    RainbowSparkleUnicorn.Sound.setVolume(4)
    RainbowSparkleUnicorn.Sound.playTrack(Math.randomRange(1, 2))
})
