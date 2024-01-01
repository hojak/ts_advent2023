import { Signal, SignalType } from "./signal";

export abstract class Module {
    private _name: string;
    private _outputs: string[];
    private _hasReceivedLow = false;

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
    
    public get hasReceivedLow() {
        return this._hasReceivedLow;
    }

    public process(signal: Signal): Signal[] {
        if ( signal.type == SignalType.Low ) {
            this._hasReceivedLow = true;
        }
        return [];
    }

    static createFromString(definition: string) : Module {
        let split = definition.split ( " -> ");
        const outputs = split[1].split(",").map(output => output.trim()).filter(outpout => outpout != "");
        const name = split[0].trim();

        if ( name.startsWith("%") ) {
            return new FlipFlopModule (
                name.substring(1),
                outputs
            );
        } else if (name.startsWith("&") ) {
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

    process(signal: Signal) : Signal[] {
        super.process(signal);
        return this.outputs.map ( name => { return {type: signal.type, sender: this.name, receiver: name }; } );
    }

}

export class FlipFlopModule extends Module {
    private _isOn: boolean = false;

    public get isOn(): boolean {
        return this._isOn;
    }

    process(signal: Signal): Signal[] {
        super.process(signal);

        if( signal.type == SignalType.High) {
            return [];        
        }

        this._isOn = ! this._isOn;
        let outSignal = this._isOn ? SignalType.High : SignalType.Low;
        
        return this.outputs.map ( name => { return {type: outSignal, receiver: name, sender: this.name }; } );
    }
}

export class ConjunctionModule extends Module {
    private _inputs: Map<string, SignalType> = new Map();

    addInputModule(name: string) {
        this._inputs.set(name, SignalType.Low);
    }

    process(signal: Signal): Signal[] {
        super.process(signal);

        this._inputs.set ( signal.sender, signal.type);

        let outSignal = this.rememberOnlyHighs() ? SignalType.Low : SignalType.High;
        
        return this.outputs.map ( name => { return {type: outSignal, receiver: name, sender: this.name }; } );
    }

    rememberOnlyHighs() : boolean{
        for ( let input of this._inputs.keys() ) {
            if ( this._inputs.get ( input) == SignalType.Low ) {
                return false;
            }
        }
        return true;
    }

    getInputModules () : string[] {
        return Array.from(this._inputs.keys()).map( key => ""+key ).sort();
    }
}