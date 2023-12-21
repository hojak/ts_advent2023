export class PipeMap {
    description: string;
    private _cols: number;
    private _rows: number;

    constructor ( description: string ) {
        this._cols = description.indexOf("\n");
        this.description = description.replace(/\n/g, "");
        this._rows = this.description.length / this._cols;
    }

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }

    getSymbolAt(column: number, row: number): string {
        return this.description[column + row * this._cols];
    }

    getStartingPosition(): number[] {
        let index = this.description.indexOf("S");
        if ( index == undefined ) {
            throw Error ( "No start position found!");
        }
        return [
            index % this._cols,
            Math.floor ( index / this._cols) 
        ];
    }

}