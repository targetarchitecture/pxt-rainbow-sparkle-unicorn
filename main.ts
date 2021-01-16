RainbowSparkleUnicorn.onButtonReleased(RainbowSparkleUnicorn.TouchSensor.T1, function () {
    RainbowSparkleUnicorn.turnOn(Blinkable.Blinkable0)
    onSwitch()
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
RainbowSparkleUnicorn.setVolume(1)
RainbowSparkleUnicorn.turnOn(Blinkable.Blinkable0)
RainbowSparkleUnicorn.playTrack(2)
RainbowSparkleUnicorn.dial1(0)
RainbowSparkleUnicorn.dial1(10)
serial.redirectToUSB()
serial.writeString("")
basic.showIcon(IconNames.Yes)
