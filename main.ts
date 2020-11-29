RainbowSparkleUnicorn.onSwitch(RainbowSparkleUnicorn.switchPins.Any, RainbowSparkleUnicorn.switchState.released, function () {
    RainbowSparkleUnicorn.dial1(0)
    led.toggle(0, 0)
})
input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.turnAllOff()
    RainbowSparkleUnicorn.turnAllOn()
})
RainbowSparkleUnicorn.onTouch(RainbowSparkleUnicorn.TouchSensor.T1, RainbowSparkleUnicorn.TouchAction.Touched, function () {
    RainbowSparkleUnicorn.playTrack(randint(1, 58))
})
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.blink(Blinkable.Blinkable8, 2000, 2000)
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 58))
        RainbowSparkleUnicorn.setPulse(Servo.S15, randint(100, 505))
    }
    RainbowSparkleUnicorn.dial1(0)
})
RainbowSparkleUnicorn.onSwitch(RainbowSparkleUnicorn.switchPins.Any, RainbowSparkleUnicorn.switchState.pressed, function () {
    RainbowSparkleUnicorn.dial1(30)
    led.toggle(0, 0)
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(30)
RainbowSparkleUnicorn.breathe(
Breathable.Breathable4,
600,
300,
500,
300
)
RainbowSparkleUnicorn.turnSlider1(OnOff.ON)
RainbowSparkleUnicorn.turnSlider2(OnOff.ON)
basic.forever(function () {
    basic.pause(10 * RainbowSparkleUnicorn.Slider1())
    led.toggle(2, 2)
})
