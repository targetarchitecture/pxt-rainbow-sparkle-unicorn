
let consoleState = ""

function startUp() {

    RainbowSparkleUnicorn.comment("ConsoleStates { Starting, Normal, VideoPlaying, YellowAlert, RedAlert }");

    consoleState = "Starting"
    basic.showNumber(1)
    RainbowSparkleUnicorn.start();

    RainbowSparkleUnicorn.Sound.stop();
    RainbowSparkleUnicorn.Sound.setVolume(10);

    basic.showNumber(2)

    RainbowSparkleUnicorn.Light.turnAllOff()

    basic.showNumber(3)

    RainbowSparkleUnicorn.comment("Opening sequence sound")
    RainbowSparkleUnicorn.Sound.playTrack(70)

    basic.showNumber(4)

    RainbowSparkleUnicorn.comment("This is the big red button")
    RainbowSparkleUnicorn.Light.turnOn(lightPins.P0)

    basic.showIcon(IconNames.Happy)

    consoleState = "Normal"

    loop();
}

startUp();

let previousSoundControlMillis = 0;
let previousSwitchStatesMillis = 0;

function loop() {

    RainbowSparkleUnicorn.comment("This is the main fixed timing loop")
    basic.forever(function () {

        RainbowSparkleUnicorn.comment("This loop controls the sounds")
        if (control.millis() - previousSoundControlMillis > 250) {
            previousSoundControlMillis = control.millis();
            soundControl();
        }

        RainbowSparkleUnicorn.comment("This loop controls the switch states")
        if (control.millis() - previousSwitchStatesMillis > 100) {
            previousSwitchStatesMillis = control.millis();
            RainbowSparkleUnicorn.Switch.getSwitchStates()
        }

        basic.pause(50);
    })
}

function soundControl() {

    let playingSound = RainbowSparkleUnicorn.Sound.playingSound();

    //serial.writeLine("playingSound:" + playingSound);
}

RainbowSparkleUnicorn.Sound.onBusyChange(function () {

    let busy = control.eventValue();

    serial.writeLine("onBusyChange:" + busy);
})

RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.Any, function() {
    serial.writeLine("RAINBOW_SPARKLE_UNICORN_SWITCH_PRESSED:" +control.eventValue() )
})