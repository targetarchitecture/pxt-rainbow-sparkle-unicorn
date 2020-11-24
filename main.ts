input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
      ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
    RainbowSparkleUnicorn.ADC1(ADC1voltage)
})
input.onButtonPressed(Button.B, function () {
    ADC1voltage += 1
      ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
    RainbowSparkleUnicorn.ADC1(ADC1voltage)
})
RainbowSparkleUnicorn.start("SN4")
let ADC1voltage = 15
let ADC2voltage = 15
RainbowSparkleUnicorn.ADC1(ADC1voltage)
