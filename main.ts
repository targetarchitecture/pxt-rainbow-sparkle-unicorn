input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
})
function doSomething () {
    ADC1voltage = 15
    ADC2voltage = 15
    RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.setVolume(30)
    RainbowSparkleUnicorn.playTrack(1)
}
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial2(randint(0, 30))
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
        basic.pause(1000)
    }
})
let ADC2voltage = 0
let ADC1voltage = 0
RainbowSparkleUnicorn.start("SN4")
RainbowSparkleUnicorn.startSlider1(OnOff.ON)
