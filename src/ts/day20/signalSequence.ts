import { Signal, SignalType } from "./signal";

export class SignalSequence {
    private _initialSequence: Signal[] = [];

    private _signalLoop: Signal[];

    constructor ( initialSignals: Signal[] = [], signalLoop : Signal[] = [] ) {
        this._initialSequence = initialSignals;
        this._signalLoop = signalLoop;
    }

    add ( signal: Signal ) {
        this._initialSequence.push(signal);
    }

    public get signals () {
        return this._initialSequence;
    }

    public get numberOfLowSignals () : number {
        return this._initialSequence.filter ( signal => signal.type == SignalType.Low ).length;
    }

    public get numberOfHighSignals () : number {
        return this._initialSequence.filter ( signal => signal.type == SignalType.High ).length;
    }

    public get numberOfPushesInInitialSequence () : number {
        if ( this._initialSequence.length == 0) {
            return 0;
        } else {
            return this._initialSequence[this._initialSequence.length-1].push;
        }
    }

    getSignalsOfPush(push: number): Signal[] {
        if ( push <= this.numberOfPushesInInitialSequence ) {
            return this._initialSequence.filter( signal => signal.push == push);
        }

        if ( this._signalLoop.length == 0 ) {
            return [];
        }

        let modulo = (push-this.numberOfPushesInInitialSequence) % this.numberOfPushesInLoop;
        let offset = push - modulo;

        return this._signalLoop
            .filter( signal => signal.push == modulo)
            .map( signal => { return {
                type: signal.type,
                sender: signal.sender,
                receiver: signal.receiver,
                push: signal.push + offset
            }});
    }


    private get numberOfPushesInLoop() {
        return this._signalLoop[this._signalLoop.length - 1].push;
    }
}