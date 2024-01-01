import { Signal, SignalType } from "./signal";

export class Module {
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

    process(signalType: SignalType) : Signal[] {
        return this.outputs.map ( name => { return {type: signalType, destination: name }; } );
    }

}

export class FlipFlopModule extends Module {

}

export class ConjunctionModule extends Module {

}