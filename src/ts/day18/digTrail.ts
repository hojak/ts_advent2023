export class DigTrail {
    private _lines: string[];
    
    public get numberOfSegments() : number {
        return this._lines.length;
    }

    constructor ( input: string ) {
        this._lines = input.split("\n").filter(line => line.trim() != "");
    }

}