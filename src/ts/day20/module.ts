import { Signal, SignalType } from "./signal";

export abstract class Module {
    private _name: string;
    private _outputs: string[];

    constructor ( name: string, outputs: string[] ) {
        this._name = name;
        this._outputs = outputs;
    }

    public get name(): string {
        return this._name;
    }

    public get outputs(): string[] {
        return this._outputs;
    }


    abstract process(signal: Signal): Signal[];


    static createFromString(definition: string) : Module {
        let split = definition.split ( " -> ");
        const outputs = split[1].split(",").map(output => output.trim()).filter(outpout => outpout != "");
        const name = split[0].trim();

        if ( name[0] == "%" ) {
            return new FlipFlopModule (
                name.substring(1),
                outputs
            );
        } else if (name[0] == "&" ) {
            return new ConjunctionModule (
                name.substring(1),
                outputs
            );
        } else {
            return new BroadcasterModule (
                name,
                outputs
            );
        }
    }

}

export class BroadcasterModule extends Module {

    process(signal: SignalType) : Signal[] {
        return this.outputs.map ( name => { return {type: signal, destination: name }; } );
    }

}

export class FlipFlopModule extends Module {
    private _isOn: boolean = false;

    public get isOn(): boolean {
        return this._isOn;
    }

    process(signal: Signal): Signal[] {
        if( signal.type == SignalType.High) {
            return [];        
        }

        this._isOn = ! this._isOn;
        let outSignal = this._isOn ? SignalType.High : SignalType.Low;
        
        return this.outputs.map ( name => { return {type: outSignal, receiver: name, sender: this.name }; } );
    }
}

export class ConjunctionModule extends Module {
    process(signal: Signal): Signal[] {
        return [];
    }
}