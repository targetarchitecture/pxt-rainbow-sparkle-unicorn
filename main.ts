RainbowSparkleUnicorn.Spinner.on(RainbowSparkleUnicorn.Spinner.Spinners.Spinner1, RainbowSparkleUnicorn.Spinner.Rotation.Left, function () {

})
RainbowSparkleUnicorn.Touch.on(RainbowSparkleUnicorn.Touch.Pin.Any, RainbowSparkleUnicorn.Touch.Event.touched, function () {
    // basic.showIcon(IconNames.Rollerskate)
    RainbowSparkleUnicorn.Light.turnAllOff();
})
let temp = null
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.Light.turnAllOn();
RainbowSparkleUnicorn.Sound.setVolume(15)
loops.everyInterval(1000, function () {
    RainbowSparkleUnicorn.Dial.value(RainbowSparkleUnicorn.Dial.Dials.Dial1, randint(0, 255))
    RainbowSparkleUnicorn.Dial.value(RainbowSparkleUnicorn.Dial.Dials.Dial2, randint(0, 255))
})
