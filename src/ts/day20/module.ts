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

        return new BroadcasterModule (
            split[0].trim(),
            split[1].split(",").map ( output => output.trim() ).filter (outpout => outpout != "")
        );
    }

}

export class BroadcasterModule extends Module {

    constructor ( name: string, outputs: string[] ) {
        super(name, outputs);
    }

}