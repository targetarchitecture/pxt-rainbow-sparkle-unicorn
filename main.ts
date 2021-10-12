//startUp();



let previouspressureGaugeMillis = 0;
let previousSoundControlMillis = 0;
let previousFuelLightMillis = 0;
let previousvolumeControlMillis = 0;
let previousSwitchStatesMillis = 0;



RainbowSparkleUnicorn.comment("This is the main fixed timing loop")
basic.forever(function () {

    let currentMillis = control.millis()


    //currentMillis = control.millis()

    RainbowSparkleUnicorn.comment("This loop controls the sounds")
    if (currentMillis - previousSoundControlMillis > 500) {
        previousSoundControlMillis = currentMillis;
        soundControl();
    }

    //currentMillis = control.millis()

    RainbowSparkleUnicorn.comment("This loop controls the switch states")
    if (currentMillis - previousSwitchStatesMillis > 100) {
        previousSwitchStatesMillis = currentMillis;
        RainbowSparkleUnicorn.Switch.getSwitchStates()
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
