input.onButtonPressed(Button.A, function () {
    serial.writeLine("Z4,3")
})
input.onButtonPressed(Button.AB, function () {
    serial.writeLine("Z9")
})
input.onButtonPressed(Button.B, function () {
    serial.writeLine("Z5")
})
serial.redirect(
SerialPin.P1,
SerialPin.P2,
BaudRate.BaudRate115200
)
serial.writeLine("Z1,15")
