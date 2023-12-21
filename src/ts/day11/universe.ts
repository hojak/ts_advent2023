export class Universe {
    description: string;
    private _cols: number;
    private _rows: number;

    constructor( input: string ) {
        this.description = input.replace(/\n/g, "");
        this._cols = input.indexOf("\n");
        this._rows = this.description.length / this._cols;
    }

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }
}