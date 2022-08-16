

input.onButtonPressed(Button.A, function () {

    RainbowSparkleUnicorn.Sound.playTrack(1)
})

function doSomething() {

    RainbowSparkleUnicorn.start()
    
    loops.everyInterval(500, function() {
        RainbowSparkleUnicorn._sendMessage("JJ");
    })
    }

doSomething()