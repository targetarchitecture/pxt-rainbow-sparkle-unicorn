let touchStates = ""
basic.showIcon(IconNames.No)
RainbowSparkleUnicorn.Sound.setVolume(20)
RainbowSparkleUnicorn.Sound.playTrack(1)

let jj = "@@ffff##"
if (jj.substr(0, 2) == "@@" && jj.substr(-2, 2) == "##") {
    jj = jj.replace("@@", "").replace("##", "");
} else {
    jj = ""
}

serial.writeLine("jj:" + jj);

basic.forever(function () {
    touchStates = RainbowSparkleUnicorn.Touch.getTouchStates()
    basic.pause(100)
})
basic.forever(function () {
    RainbowSparkleUnicorn.Controls.dial1(randint(0, 254))
    RainbowSparkleUnicorn.Controls.dial2(randint(0, 254))
    basic.pause(1000)
})
basic.forever(function () {
    RainbowSparkleUnicorn.Light.turnAllOn()
    basic.pause(500)
    RainbowSparkleUnicorn.Light.turnAllOff()
    basic.pause(500)
})
