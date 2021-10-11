
RainbowSparkleUnicorn.start()
RainbowSparkleUnicorn.Sound.setVolume(20)
RainbowSparkleUnicorn.Sound.playingSound();
basic.pause(10)
RainbowSparkleUnicorn.Sound.playTrack(23)

basic.forever(function() {
   RainbowSparkleUnicorn.Sound.playingSound() ;
    basic.pause(500)

})