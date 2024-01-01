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

        if ( split[0][0] == "%" ) {
            return new FlipFlopModule (
                split[0].trim().substring(1),
                outputs
            );
        } else {
            return new BroadcasterModule (
                split[0].trim(),
                outputs
            );
        }
    }

}

export class BroadcasterModule extends Module {

}

export class FlipFlopModule extends Module {

}