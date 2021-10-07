RainbowSparkleUnicorn.Touch.onButtonReleased(touchPins.Any, function () {
    basic.showIcon(IconNames.SmallHeart)
})
input.onButtonPressed(Button.A, function () {
    RainbowSparkleUnicorn.Light.turnAllOff()
})
RainbowSparkleUnicorn.Touch.onButtonTouched(touchPins.Any, function () {
    basic.showIcon(IconNames.Heart)
})
function doSomething () {
    RainbowSparkleUnicorn.Light.breathe(
    lightPins.P15,
    100,
    1000,
    5000,
    1000
    )
    RainbowSparkleUnicorn.Light.blink(lightPins.P0, 1000, 1000)
    RainbowSparkleUnicorn.Light.blink(lightPins.P7, 500, 500)
    RainbowSparkleUnicorn.Light.blink(lightPins.P8, 1000, 1000)
    RainbowSparkleUnicorn.Light.blink(lightPins.P9, 10000, 10000)
}
input.onButtonPressed(Button.B, function () {
    RainbowSparkleUnicorn.Light.turnAllOn()
})
let touch = ""
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.Light.turnAllOff();
RainbowSparkleUnicorn.Controls.dial2(0);
RainbowSparkleUnicorn.Controls.dial1(0);
doSomething()
RainbowSparkleUnicorn.Controls.dial2(255)
RainbowSparkleUnicorn.Controls.dial1(255)

basic.forever(function () {
    touch = RainbowSparkleUnicorn.Touch.getTouchStates()
})
basic.forever(function () {
    basic.pause(1000)
    RainbowSparkleUnicorn.Controls.dial2(randint(0, 255))
    RainbowSparkleUnicorn.Controls.dial1(randint(0, 255))
})
