control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED, EventBusValue.MICROBIT_EVT_ANY, function () {
    led.toggle(2, 2)
})
input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
})
function doSomething () {
    RainbowSparkleUnicorn.setVolume(30)
    ADC1voltage = 15
    RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.playTrack(1)
    RainbowSparkleUnicorn.turnSlider1(OnOff.ON)
    RainbowSparkleUnicorn.turnSpinner1(OnOff.OFF)
}
control.onEvent(RAINBOW_SPARKLE_UNICORN_ADC_TWO, EventBusValue.MICROBIT_EVT_ANY, function () {
    RainbowSparkleUnicorn.setPulse(Servo.S15, Math.map(control.eventValue(), 0, 100, 100, 505))
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        RainbowSparkleUnicorn.setPulse(Servo.S15, randint(100, 505))
        basic.pause(100)
    }
})
control.onEvent(RAINBOW_SPARKLE_UNICORN_SWITCH_RELEASED, EventBusValue.MICROBIT_EVT_ANY, function () {
    led.toggle(3, 2)
})
control.onEvent(RAINBOW_SPARKLE_UNICORN_ROTARY_TWO_ROTATING, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == RainbowSparkleUnicorn.RotaryDirection.Left) {
        track += 1
        servoPWM += -30
    } else {
        track += -1
        servoPWM += 30
    }
    servoPWM = Math.constrain(servoPWM, 100, 505)
    RainbowSparkleUnicorn.setPulse(Servo.S15, servoPWM)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_EVT_ANY, function () {
    led.toggle(2, 2)
})
RainbowSparkleUnicorn.onBusyChange(function () {
    if (RainbowSparkleUnicorn.startStop()) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
let servoPWM = 0
let ADC1voltage = 0
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.setVolume(30)
servoPWM = 250
let track = 3
