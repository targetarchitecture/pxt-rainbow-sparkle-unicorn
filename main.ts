RainbowSparkleUnicorn.Touch.onReleased(RainbowSparkleUnicorn.Touch.Pins.P7, function () {
    // basic.showIcon(IconNames.SmallHeart)

    RainbowSparkleUnicorn.Light.turnAllOff()
})
RainbowSparkleUnicorn.Touch.onTouched(RainbowSparkleUnicorn.Touch.Pins.P7, function () {
    // basic.showIcon(IconNames.Heart)
    //RainbowSparkleUnicorn.Expert.SendDebugMessage("onTouched:" + control.millis().toString());

    RainbowSparkleUnicorn.Light.turnAllOn()
    //RainbowSparkleUnicorn.Expert.SendDebugMessage("turnAllOn:" + control.millis().toString());

})
RainbowSparkleUnicorn.start()
basic.showIcon(IconNames.Asleep)
