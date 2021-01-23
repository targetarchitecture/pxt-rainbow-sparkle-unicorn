namespace RainbowSparkleUnicorn.Sound {

let dfplayerBusy: boolean = false;
let dfplayerVolume: number = 0;
let dfplayerTrack: number = 0;

    /**
     * Set the volume
     * @param volume the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sound"     
    //% block="Set volume to $volume"
    //% volume.min=0 volume.max=30
    export function setVolume(volume: number) {
        const clippedVolume = Math.min(Math.max(volume, 0), 30);
        dfplayerVolume = clippedVolume;
        _sendMessage("Z1," + clippedVolume);
    }

//write back the actual volume reported by dfplayer
control.onEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_VOLUME, EventBusValue.MICROBIT_EVT_ANY, function () {
     dfplayerVolume = control.eventValue();  
})

    /**
     * Play a track
     * @param track the track to play, eg: 1
     */
    //% subcategory="Sound"     
    //% block="Play track $track"
    //% track.min=0 track.max=20
    export function playTrack(track: number) {
        dfplayerTrack = track;
        _sendMessage("Z4," + track)
    }

//write back the actual track reported by dfplayer
control.onEvent(RAINBOW_SPARKLE_UNICORN_SOUND_SET_TRACK, EventBusValue.MICROBIT_EVT_ANY, function () {
     dfplayerTrack = control.eventValue();  
})

    /**
     * Increase the volume
     */
    //% subcategory="Sound"      
    //% block="Increase volume"
    export function increaseVolume() {
        dfplayerVolume = Math.min(Math.max(dfplayerVolume+1, 0), 30);
        _sendMessage("Z2")
    }

    /**
     * Decrease the volume
     */
    //% subcategory="Sound"      
    //% block="Decrease volume"
    export function decreaseVolume() {
        dfplayerVolume = Math.min(Math.max(dfplayerVolume-1, 0), 30);
        _sendMessage("Z3")
    }

    
    //% subcategory="Sound"
    //% block="resume music"
    export function resume() {
        _sendMessage("Z8")
    }

    //% subcategory="Sound"
    //% block="pause music"
    export function pause() {
      _sendMessage("Z7")
    }

    /**
     * Returns the state of the player has started
     * playing a track or stopped.
     * This block intended to be used inside of start stop event handler.
     */
    //% subcategory="Sound"
    //% block="track started/stopped"
    //% weight=39
    export function startStop(): boolean {
        return dfplayerBusy;
    }

     /**
     * Returns the current volume
     */
    //% subcategory="Sound"
    //% block="current volume"
    export function volume(): number {
        return dfplayerVolume;
    }   


     /**
     * Returns the current track
     */
    //% subcategory="Sound"
    //% block="current track"
    export function track(): number {
        return dfplayerTrack;
    }   

   /**
   * Do something when a sound track starts/stops.
   * @param handler body code to run when event is raised
   */
    //% subcategory="Sound"
    //% block="on sound track starts/stops"
    //% weight=41
    export function onBusyChange(handler: () => void) {
        control.onEvent(
           RAINBOW_SPARKLE_UNICORN_SOUND_BUSY,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                const value = control.eventValue();
               if (value == 1){dfplayerBusy=false} else {dfplayerBusy=true};

                handler();
            }
        );
    }
}
