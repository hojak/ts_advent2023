import { Signal, SignalType } from "./signal";

export class SignalSequence {
    private _sequence: Signal[] = [];

    add ( signal: Signal ) {
        this._sequence.push(signal);
    }

    public get signals () {
        return this._sequence;
    }

    public get numberOfLowSignals () : number {
        return this._sequence.filter ( signal => signal.type == SignalType.Low ).length;
    }

    public get numberOfHighSignals () : number {
        return this._sequence.filter ( signal => signal.type == SignalType.High ).length;
    }

}