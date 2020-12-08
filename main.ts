function flashWithSlider () {
    basic.pause(10 * RainbowSparkleUnicorn.Slider1())
    led.toggle(2, 2)
}
RainbowSparkleUnicorn.onButtonReleased(RainbowSparkleUnicorn.TouchSensor.T1, function () {
    RainbowSparkleUnicorn.playTrack(randint(1, 58))
})
RainbowSparkleUnicorn.onSwitchPressed(RainbowSparkleUnicorn.switchPins.Any, function () {
    RainbowSparkleUnicorn.dial1(30)
    led.toggle(0, 0)
    RainbowSparkleUnicorn.sendMQTTMessage("TEST", "PRESSED")
})
input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.turnAllOff()
    RainbowSparkleUnicorn.turnAllOn()
    RainbowSparkleUnicorn.moveServoBouncy(
    Servo.S15,
    0,
    180,
    10
    )
})
function www () {
    RainbowSparkleUnicorn.connectToInterWeb(
    "152 2.4GHz",
    "derwenthorpe",
    "broker.shiftr.io",
    "23bff921",
    "df50f3f27525324e",
    "SN4"
    )
    RainbowSparkleUnicorn.sendMQTTMessage("IP", RainbowSparkleUnicorn.IPAddress())
}
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.blink(Blinkable.Blinkable15, 2000, 2000)
    for (let index = 0; index < 10; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 58))
        pwm = randint(100, 505)
        RainbowSparkleUnicorn.setServoPulse(Servo.S15, pwm)
        RainbowSparkleUnicorn.sendMQTTNumber("PWM", pwm)
    }
    RainbowSparkleUnicorn.dial1(0)
})
RainbowSparkleUnicorn.onSwitchReleased(RainbowSparkleUnicorn.switchPins.Any, function () {
    RainbowSparkleUnicorn.dial1(0)
    led.toggle(0, 0)
    RainbowSparkleUnicorn.sendMQTTMessage("TEST", "RELEASED")
})
RainbowSparkleUnicorn.onButtonTouched(RainbowSparkleUnicorn.TouchSensor.T8, function () {
    RainbowSparkleUnicorn.playTrack(randint(1, 58))
    pwm = randint(100, 505)
    RainbowSparkleUnicorn.setServoPulse(Servo.S15, pwm)
})
let pwm = 0
basic.showIcon(IconNames.Happy)
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(0)
RainbowSparkleUnicorn.breathe(
Breathable.Breathable4,
600,
300,
500,
300
)
RainbowSparkleUnicorn.setServoRange(Servo.S15, 100, 500)
www()
basic.showIcon(IconNames.StickFigure)
