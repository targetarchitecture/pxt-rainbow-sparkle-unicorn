namespace RainbowSparkleUnicorn.Spinner {
    export declare const enum Spinners {
        Spinner1 = 0,
        Spinner2 = 1
    }

    let Encoder1value = 0;
    let Encoder2value = 0;

    let _rotationHandler1: (value: number) => void = null;
    let _rotationHandler2: (value: number) => void = null;

    // Top-level namespace listeners guarantee the state updates even if no event block is deployed
    control.onEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_1, EventBusValue.MICROBIT_EVT_ANY, () => {
        Encoder1value = control.eventValue() - pinOffset;
        if (_rotationHandler1) _rotationHandler1(Encoder1value);
    });

    control.onEvent(RAINBOW_SPARKLE_UNICORN_SPINNER_2, EventBusValue.MICROBIT_EVT_ANY, () => {
        Encoder2value = control.eventValue() - pinOffset;
        if (_rotationHandler2) _rotationHandler2(Encoder2value);
    });

    export function Value(spinner: Spinners): number {
        return (spinner == Spinners.Spinner1) ? Encoder1value : Encoder2value;
    }

    export function onRotation(spinner: Spinners, handler: (value: number) => void) {
        if (spinner == Spinners.Spinner1) {
            _rotationHandler1 = handler;
        } else {
            _rotationHandler2 = handler;
        }
    }

    export function RequestSpinnerValue(spinner: Spinners) {
        if (spinner == Spinners.Spinner1) {
            _sendMessage("ROTARY1");
        } else {
            _sendMessage("ROTARY2");
        }
    }
}
