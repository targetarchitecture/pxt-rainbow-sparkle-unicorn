control.onEvent(578321, EventBusValue.MICROBIT_EVT_ANY, function () {
    index = control.eventValue()
    music.playTone(100 * index, music.beat(BeatFraction.Whole))
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.Any, function () {
    serial.writeNumbers(RainbowSparkleUnicorn.Switch.switchStates)
    for (let index2 = 0; index2 <= 15; index2++) {
        state = RainbowSparkleUnicorn.Switch.switchStates.get(index2);
if (state == 1) {
            control.raiseEvent(
            578321,
            index2
            )
        }
    }
})
let index = 0
let state = 0
RainbowSparkleUnicorn.start()
