input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.Light.turnAllOff()
})
function doSomething () {
    RainbowSparkleUnicorn.Light.breathe(
    lightPins.P15,
    0,
    0,
    1000,
    1000
    )
    RainbowSparkleUnicorn.Light.blink(lightPins.P0, 1000, 1000)
    RainbowSparkleUnicorn.Light.blink(lightPins.P7, 500, 500)
    RainbowSparkleUnicorn.Light.blink(lightPins.P8, 100, 100)
    RainbowSparkleUnicorn.Light.blink(lightPins.P9, 10000, 10000)
}
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.Light.turnAllOn()
})
RainbowSparkleUnicorn.start()
doSomething()
