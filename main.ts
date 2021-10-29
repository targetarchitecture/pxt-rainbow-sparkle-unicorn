RainbowSparkleUnicorn.start()

RainbowSparkleUnicorn.Switch.onSwitch(RainbowSparkleUnicorn.Switch.Pins.P0, RainbowSparkleUnicorn.Switch.Event.Pressed, function () {
  basic.showNumber(RainbowSparkleUnicorn.Switch.Pins.P0)
})

RainbowSparkleUnicorn.Switch.onSwitch(RainbowSparkleUnicorn.Switch.Pins.P1, RainbowSparkleUnicorn.Switch.Event.Pressed, function () {
    basic.showNumber(RainbowSparkleUnicorn.Switch.Pins.P1)
})



control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_EVT_ANY, function() {
    
})