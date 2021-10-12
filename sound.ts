namespace RainbowSparkleUnicorn.Sound {

    let dfplayerpreviousBusy = "1";
    let dfplayerVolume: number = 0;
    let dfplayerTrack: number = 0;

    /**
     * Set the volume
     * @param volume the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sound"     
    //% group="Volume"
    //% weight=100
    //% block="Set volume to $volume"
    //% volume.defl=20
    //% volume.min=0 volume.max=30
    export function setVolume(volume: number) {
        dfplayerVolume = Math.constrain(volume, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }

    /**
     * Play a track
     * @param track the track to play, eg: 1
     */
    //% subcategory="Sound"     
    //% group="Actions"
    //% weight=100   
    //% track.defl=1
    //% block="Play track $track"
    //% track.min=1 track.max=99
    export function playTrack(track: number) {
        dfplayerTrack = track;
        _sendMessage("SPLAY," + track + ",1");
    }

    /**
     * Increase the volume
     */
    //% subcategory="Sound" 
    //% group="Volume"   
    //% weight=90  
    //% block="Increase volume"
    export function increaseVolume() {
        dfplayerVolume = Math.constrain(dfplayerVolume + 1, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }

    /**
     * Decrease the volume
     */
    //% subcategory="Sound"  
    //% group="Volume"    
    //% weight=80
    //% block="Decrease volume"
    export function decreaseVolume() {
        dfplayerVolume = Math.constrain(dfplayerVolume - 1, 0, 30);
        _sendMessage("SVOL," + dfplayerVolume);
    }


    //% subcategory="Sound"
    //% group="Actions"
    //% weight=80
    //% block="resume music"
    export function resume() {
        _sendMessage("SRESUME");
    }

    //% subcategory="Sound"
    //% group="Actions"
    //% weight=90
    //% block="pause music"
    export function pause() {
        _sendMessage("SPAUSE");
    }

    //% subcategory="Sound"
    //% group="Actions"
    //% weight=90
    //% block="stop music"
    export function stop() {
        _sendMessage("SSTOP");
    }

    /**
     * Returns the state of the player has started playing a track or stopped.
     * This block intended to be used inside of start stop event handler.
     */
    //% subcategory="Sound"
    //% group="State"
    //% block="sound playing"
    //% weight=39
    export function playingSound(): boolean {

        let busy = _readMessage("SBUSY", "SBUSY");

        //serial.writeLine("SBUSY:" + busy);

        //check for bad data
        if (busy === undefined) {
            busy = dfplayerpreviousBusy;
        }

        if (dfplayerpreviousBusy.compare(busy) != 0) {
            if (busy.compare("0") == 0) {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, 1);
            } else if (busy.compare("1") == 0) {
                control.raiseEvent(RAINBOW_SPARKLE_UNICORN_SOUND_BUSY, 0);
            }
        }

        //remember for next time
        dfplayerpreviousBusy = busy;

        if (busy.compare("0") == 0) {
            return true;
        } else if (busy.compare("1") == 0) {
            return false;
        } else {

            //try the previous state
            if (dfplayerpreviousBusy.compare("0") == 0) {
                return true;
            } else if (dfplayerpreviousBusy.compare("1") == 0) {
                return false;
            } else {
                return false;
            }
        };
    }

    /**
    * Returns the current volume
    */
    //% subcategory="Sound"
    //% group="Volume"
    //% weight=70
    //% block="current volume"
    export function volume(): number {
        return dfplayerVolume;
    }


    /**
    * Returns the current track
    */
    //% subcategory="Sound"
    //% group="State"
    //% block="current track"
    export function track(): number {
        return dfplayerTrack;
    }

    /**
    * Do something when a sound track starts/stops.
    * @param handler body code to run when event is raised
    */
    //% subcategory="Sound"
    //% group="State"
    //% block="on sound track starts/stops"
    //% weight=41
    export function onBusyChange(
        handler: () => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_SOUND_BUSY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }

}
