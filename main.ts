RainbowSparkleUnicorn.Switch.onSwitchReleased(switchPins.P4, function () {
    sortOutFuelLights()
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P5, function () {
    sortOutFuelLights()
})
RainbowSparkleUnicorn.Switch.onSwitchPressed(switchPins.P4, function () {
    sortOutFuelLights()
})
function sortOutFuelLights () {
    basic.clearScreen()
    RainbowSparkleUnicorn.Light.turnOff(lightPins.P9)
    RainbowSparkleUnicorn.Light.turnOff(lightPins.P8)
    if (RainbowSparkleUnicorn.Switch.getSwitchState(switchPins.P4) == 1) {
        led.plot(0, 0)
        RainbowSparkleUnicorn.Light.turnOn(lightPins.P9)
    }
    if (RainbowSparkleUnicorn.Switch.getSwitchState(switchPins.P5) == 1) {
        led.plot(1, 0)
        RainbowSparkleUnicorn.Light.turnOn(lightPins.P8)
    }
}
RainbowSparkleUnicorn.Switch.onSwitchReleased(switchPins.P5, function () {
    sortOutFuelLights()
})
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.printReceivedMessages()
RainbowSparkleUnicorn.printDebugMessages()
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.Yes)
RainbowSparkleUnicorn.Switch.updateSwitchState()
basic.pause(1000)
sortOutFuelLights()
