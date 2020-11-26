
namespace RainbowSparkleUnicorn {

    /**
     * Set the volume
     * @param volume the touch sensor to be checked, eg: 15
     */
    //% subcategory="Sound"     
    //% block="Set volume to $volume"
    //% volume.min=0 volume.max=30
    export function setVolume(volume: number) {
        const clippedVolume = Math.min(Math.max(volume, 0), 30);
        sendMessage("Z1," + clippedVolume)
    }


    /**
     * Play a track
     * @param track the track to play, eg: 1
     */
    //% subcategory="Sound"     
    //% block="Play track $track"
    //% track.min=0 track.max=2999
    export function playTrack(track: number) {
        sendMessage("Z4," + track)
    }

    /**
     * Increase the volume
     */
    //% subcategory="Sound"      
    //% block="Increase volume"
    export function increaseVolume() {
        sendMessage("Z2")
    }

    /**
     * Decrease the volume
     */
    //% subcategory="Sound"      
    //% block="Decrease volume"
    export function decreaseVolume() {
        sendMessage("Z3")
    }

    
    //% subcategory="Sound"
    //% block="resume music"
    export function resume() {
        sendMessage("Z8")
    }

    //% subcategory="Sound"
    //% block="pause music"
    export function pause() {
      sendMessage("Z7")
    }

    /**
     * Returns the index of the last MP3 track event.
     * It could be either a track started or completed event.
     * This block intended to be used inside of track event handlers.
     */
    //% subcategory="Sound"
    //% blockId="makerbit_mp3_track"
    //% block="MP3 track"
    //% weight=39
    export function mp3Track(): number {
        return 0; //deviceState ? deviceState.lastTrackEventValue : 1;
    }



    /**
   * Do something when a MP3 track is completed.
   * @param handler body code to run when event is raised
   */
    //% subcategory="Sound"
    //% blockId=makerbit_mp3_on_track_completed
    //% block="on MP3 track completed"
    //% weight=41
    export function onMp3TrackCompleted(handler: () => void) {
        // control.onEvent(
        //     MICROBIT_MAKERBIT_MP3_TRACK_COMPLETED_ID,
        //     EventBusValue.MICROBIT_EVT_ANY,
        //     () => {
        //         const value = control.eventValue();
        //         basic.pause(10); // defer call so that the 2nd track completion event can be processed before
        //         deviceState.lastTrackEventValue = value;
        //         handler();
        //     }
        // );
    }

}
