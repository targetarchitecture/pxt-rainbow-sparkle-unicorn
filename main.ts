input.onButtonPressed(Button.A, function () {
    serial.writeLine("Z4,3")
})
input.onButtonPressed(Button.AB, function () {
    serial.writeLine("Z9")
})
input.onButtonPressed(Button.B, function () {
    serial.writeLine("Z5")
})
serial.writeLine("Z1,15")
