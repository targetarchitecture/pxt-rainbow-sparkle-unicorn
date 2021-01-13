//% color=#FF6EC7 weight=100 icon="\uf004" block="Rainbow Sparkle Unicorn"
namespace RainbowSparkleUnicorn {

export let initialised =false;

    /**
     * Add into the start function to initialise the board.
     */
    //% block="Start Rainbow Sparkle Unicorn"
    export function start(): void {

        basic.pause(50);

        RainbowSparkleUnicorn.sendMessage("STARTING");

        RainbowSparkleUnicorn.turnSlider1(OnOff.OFF);
        RainbowSparkleUnicorn.turnSlider2(OnOff.OFF);
        RainbowSparkleUnicorn.turnSpinner1(OnOff.OFF);
        RainbowSparkleUnicorn.turnSpinner2(OnOff.OFF);
        
        //RainbowSparkleUnicorn.setVolume(0);        

        //basic.showIcon(IconNames.Heart)

        initialised = true;
    }


        /**
     * Write a comment
     * @param theComment eg:'write comment here'
     */
    //% subcategory="Expert" 
    //% block=comment|%theComment
    export function comment(theComment: string): void {
        // do nothing
    }
}