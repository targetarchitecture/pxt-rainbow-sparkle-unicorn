function playSound () {
    track = randint(1, 60)
    RainbowSparkleUnicorn.playTrack(track)
}
RainbowSparkleUnicorn.onButtonTouched(RainbowSparkleUnicorn.TouchSensor.T8, function () {
    playSound()
})
let track = 0
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(20)
playSound()
basic.showIcon(IconNames.Ghost)
