namespace RainbowSparkleUnicorn.Sound {

    let dfplayerpreviousBusy: boolean = false;
    let dfplayerVolume: number = 0;
    let dfplayerTrack: number = 0;
    let Offset: number = 666;

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
        return dfplayerpreviousBusy;
    }

    export function _dealWithMusicMessage(value: number) {

        //basic.showNumber(value);

        let busy: boolean;

        if (value == 1) {
            busy = true;
        } else  {
            busy = false;
        }

        if (dfplayerpreviousBusy != busy) {

            if (busy == true) {
               control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_START, 1)
               control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, Offset + 1);
            } else {
               control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_STOP, 1)
               control.raiseEvent(RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE, Offset + 0);
            }
        }

        //remember for next time
        dfplayerpreviousBusy = busy;
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
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track starts/stops"
    //% weight=41
    export function onStopStart(
        handler: (busy: boolean) => void
    ) {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_CHANGE,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                if (control.eventValue() - Offset == 1) {
                    handler(true);
                } else {
                    handler(false);
                }
            }
        );
    }

    /**
    * Do something when a sound track starts.
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track starts"
    //% weight=41
    export function onStart(handler: () => void): void {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_START,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


    /**
    * Do something when a sound track stops.
    */
    //% subcategory="Sound"
    //% group="Actions"
    //% block="on sound track stop"
    //% weight=41
    export function onStop(handler: () => void): void {
        control.onEvent(
            RAINBOW_SPARKLE_UNICORN_MUSIC_STOP,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }


}

