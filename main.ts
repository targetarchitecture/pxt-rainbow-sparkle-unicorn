input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.turnOff(Blinkable.Blinkable4)
    RainbowSparkleUnicorn.blink(Blinkable.Blinkable8, 2000, 2000)
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 12))
        RainbowSparkleUnicorn.setPulse(Servo.S15, randint(100, 505))
    }
    RainbowSparkleUnicorn.dial1(0)
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(0)
RainbowSparkleUnicorn.breathe(
Breathable.Breathable4,
100,
100,
100,
100
)
