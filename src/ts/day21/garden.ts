export class Garden {
    private _lines: string[];

    constructor ( description: string ) {
        this._lines = description.split("\n");
    }

    getSymbolAt(position: Position): String {
        return this._lines[position.y][position.x];
    }
    getHeight(): any {
        return this._lines.length;
    }
    getWidth(): any {
        return this._lines[0].length;
    }
}


export interface Position {
    x: number,
    y: number
}