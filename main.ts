RainbowSparkleUnicorn.onButtonReleased(RainbowSparkleUnicorn.TouchSensor.T1, function () {
    RainbowSparkleUnicorn.turnOn(Blinkable.Blinkable0)
    onSwitch()
})
RainbowSparkleUnicorn.onSwitchPressed(RainbowSparkleUnicorn.switchPins.Switch0, function () {
    RainbowSparkleUnicorn.blink(Blinkable.Blinkable15, 2000, 2000)
})
RainbowSparkleUnicorn.onButtonTouched(RainbowSparkleUnicorn.TouchSensor.T1, function () {
    RainbowSparkleUnicorn.dial1(randint(0, 30))
})
RainbowSparkleUnicorn.onButtonTouched(RainbowSparkleUnicorn.TouchSensor.T3, function () {
    RainbowSparkleUnicorn.dial1(randint(0, 30))
})
RainbowSparkleUnicorn.onButtonReleased(RainbowSparkleUnicorn.TouchSensor.T3, function () {
    RainbowSparkleUnicorn.dial1(randint(0, 30))
})
function onSwitch () {
    for (let index = 0; index < 10; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        basic.pause(1000)
        RainbowSparkleUnicorn.playTrack(randint(1, 58))
        pwm = randint(100, 505)
        RainbowSparkleUnicorn.setServoPulse(Servo.S0, pwm)
        basic.pause(10)
    }
    RainbowSparkleUnicorn.dial1(0)
}
RainbowSparkleUnicorn.onButtonTouched(RainbowSparkleUnicorn.TouchSensor.T2, function () {
    RainbowSparkleUnicorn.dial1(randint(0, 30))
})
RainbowSparkleUnicorn.onBusyChange(function () {
    if (RainbowSparkleUnicorn.startStop()) {
        RainbowSparkleUnicorn.turnOn(Blinkable.Blinkable8)
    } else {
        RainbowSparkleUnicorn.turnOff(Blinkable.Blinkable8)
    }
})
let pwm = 0
let track = 0
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(6)
RainbowSparkleUnicorn.turnOn(Blinkable.Blinkable0)
RainbowSparkleUnicorn.playTrack(1)
RainbowSparkleUnicorn.dial1(0)
RainbowSparkleUnicorn.dial1(10)
basic.showIcon(IconNames.Yes)
let strip = neopixel.create(DigitalPin.P0, 15, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
strip.show()
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(100)
})
