input.onButtonPressed(Button.A, function () {
    ADC1voltage += -1
    ADC1voltage = Math.clamp( 0, 30,ADC1voltage)
RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
})
RainbowSparkleUnicorn.onTouch(TouchSensor.T5, TouchAction.Touched, function () {
    led.toggle(1, 0)
})
function doSomething () {
    RainbowSparkleUnicorn.setVolume(30)
    ADC1voltage = 15
    RainbowSparkleUnicorn.dial1(ADC1voltage)
    RainbowSparkleUnicorn.playTrack(1)
    RainbowSparkleUnicorn.turnSlider1(OnOff.ON)
    RainbowSparkleUnicorn.turnSpinner1(OnOff.OFF)
}
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 50; index++) {
        RainbowSparkleUnicorn.dial2(randint(0, 30))
        RainbowSparkleUnicorn.dial1(randint(0, 30))
        RainbowSparkleUnicorn.setPulse(Servo.S14, randint(100, 505))
        basic.pause(1000)
    }
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
    RainbowSparkleUnicorn.playTrack(track)
})
RainbowSparkleUnicorn.onBusyChange(function () {
    if (RainbowSparkleUnicorn.startStop()) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
let track = 0
let servoPWM = 0
let ADC1voltage = 0
RainbowSparkleUnicorn.start("SN4")
RainbowSparkleUnicorn.setVolume(30)
RainbowSparkleUnicorn.turnSpinner1(OnOff.ON)
RainbowSparkleUnicorn.turnSpinner2(OnOff.ON)
servoPWM = 250
track = 3
RainbowSparkleUnicorn.playTrack(track)
