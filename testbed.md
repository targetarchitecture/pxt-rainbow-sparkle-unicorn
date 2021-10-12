# testbed

let consoleState = ""

function startUp() {

    RainbowSparkleUnicorn.comment("ConsoleStates { Starting, Normal, VideoPlaying, YellowAlert, RedAlert }");

    consoleState = "Starting"
    basic.showNumber(1)
    RainbowSparkleUnicorn.start();

    RainbowSparkleUnicorn.Sound.stop();
   // volumeControl();

    basic.showNumber(2)

    RainbowSparkleUnicorn.Light.turnAllOff()

    basic.showNumber(3)

    RainbowSparkleUnicorn.comment("Opening sequence sound")
    RainbowSparkleUnicorn.Sound.playTrack(70)

    basic.showNumber(4)

    //set artificial horizon
    control.runInParallel(function () {
       // RainbowSparkleUnicorn.Movement.setServoAngle(horizonServo, horizonLevelAngle)
        basic.pause(500)
       // RainbowSparkleUnicorn.Movement.moveServoLinear(horizonServo, horizonLevelAngle, horizonLevelAngle - 30, 2)
        basic.pause(2500)
    })

    RainbowSparkleUnicorn.comment("This is the big red button")
    RainbowSparkleUnicorn.Light.turnOn(lightPins.P0)

    basic.showIcon(IconNames.Happy)

    consoleState = "Normal"
}

startUp();

let previouspressureGaugeMillis = 0;
let previousSoundControlMillis = 0;
let previousFuelLightMillis = 0;
let previousvolumeControlMillis = 0;
let previousSwitchStatesMillis = 0;

RainbowSparkleUnicorn.comment("This is the main fixed timing loop")
basic.forever(function () {

    let currentMillis = control.millis()

    RainbowSparkleUnicorn.comment("This loop controls the sounds")
    if (currentMillis - previousSoundControlMillis > 250) {
        previousSoundControlMillis = currentMillis;
        soundControl();
        //let busy = RainbowSparkleUnicorn._readMessage("SBUSY", "SBUSY");

        //serial.writeLine(busy);
    } 

    RainbowSparkleUnicorn.comment("This loop controls the switch states")
    if (currentMillis - previousSwitchStatesMillis > 100) {
        previousSwitchStatesMillis = currentMillis;
        //let switchStates = RainbowSparkleUnicorn._readMessage("SUPDATE", "SUPDATE");
        RainbowSparkleUnicorn.Switch.getSwitchStates()

        //serial.writeLine(switchStates);
    }

    basic.pause(50);
})

// Add your code here

function soundControl() {

    let playingSound = RainbowSparkleUnicorn.Sound.playingSound();

    serial.writeLine("playingSound:" + playingSound);
}

RainbowSparkleUnicorn.Sound.onBusyChange(function () {

    let busy = control.eventValue();

    serial.writeLine("onBusyChange:" + busy);

    // if (busy == 0) {
    //     RainbowSparkleUnicorn.Sound.playTrack(Math.randomRange(50, 52));
    //     basic.pause(500);
    // }
})
