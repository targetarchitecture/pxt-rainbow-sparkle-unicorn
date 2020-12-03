control.onEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, 8, function () {
    RainbowSparkleUnicorn.playTrack(randint(1, 58))
})
function flashWithSlider () {
    basic.pause(10 * RainbowSparkleUnicorn.Slider1())
    led.toggle(2, 2)
}
control.onEvent(RAINBOW_SPARKLE_UNICORN_TOUCH_SENSOR_TOUCHED, 1, function () {
    RainbowSparkleUnicorn.playTrack(randint(1, 58))
})
RainbowSparkleUnicorn.onSwitch(RainbowSparkleUnicorn.switchPins.Any, RainbowSparkleUnicorn.switchState.released, function () {
    RainbowSparkleUnicorn.dial1(0)
    led.toggle(0, 0)
    RainbowSparkleUnicorn.sendMQTTMessage("TEST", "RELEASED")
    RainbowSparkleUnicorn.sendMQTTMessage("IP", RainbowSparkleUnicorn.IPAddress())
})
input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.turnAllOff()
    RainbowSparkleUnicorn.turnAllOn()
})
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.blink(Blinkable.Blinkable8, 2000, 2000)
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 58))
        pwm = randint(100, 505)
        RainbowSparkleUnicorn.setServoPulse(Servo.S15, pwm)
        RainbowSparkleUnicorn.sendMQTTNumber("PWM", pwm)
    }
    RainbowSparkleUnicorn.dial1(0)
})
RainbowSparkleUnicorn.onSwitch(RainbowSparkleUnicorn.switchPins.Any, RainbowSparkleUnicorn.switchState.pressed, function () {
    RainbowSparkleUnicorn.dial1(30)
    led.toggle(0, 0)
})
let pwm = 0
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.connectToInterWeb(
"152 2.4GHz",
"derwenthorpe",
"broker.shiftr.io",
"23bff921",
"df50f3f27525324e",
"SN4"
)
RainbowSparkleUnicorn.sendMQTTMessage("TEST", "Hello-World")
RainbowSparkleUnicorn.turnSlider1(OnOff.OFF)
RainbowSparkleUnicorn.turnSlider2(OnOff.OFF)
RainbowSparkleUnicorn.setVolume(0)
RainbowSparkleUnicorn.breathe(
Breathable.Breathable4,
600,
300,
500,
300
)
basic.forever(function () {
    flashWithSlider()
})
