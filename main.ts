input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.ADC1(ADC1voltage)
    RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.ADC1(randint(0, 30))
        RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
        basic.pause(1000)
    }
})
let ADC1voltage = 0
RainbowSparkleUnicorn.start("SN4")
ADC1voltage = 15
let ADC2voltage = 15
RainbowSparkleUnicorn.ADC1(ADC1voltage)
RainbowSparkleUnicorn.setVolume(20)
