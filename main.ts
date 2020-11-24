input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.ADC1(ADC1voltage)
    RainbowSparkleUnicorn.setPulse(1500)
})
input.onButtonPressed(Button.B, function () {
    ADC1voltage += 1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.ADC1(ADC1voltage)
})
let ADC1voltage = 0
RainbowSparkleUnicorn.start("SN4")
ADC1voltage = 15
let ADC2voltage = 15
RainbowSparkleUnicorn.ADC1(ADC1voltage)
