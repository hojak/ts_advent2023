export class Position {
    private _x: number;
    private _y: number;
    
    constructor ( x: number, y: number ) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }

    public add(pos: Position): Position {
        return new Position (this.x + pos.x, this.y + pos.y);
    }
    
    public multiply(factor: number): Position {
        return new Position ( this.x * factor, this.y*factor);
    }

    equals(other: Position) :boolean {
        return this.x == other.x && this.y == other.y;
    }
    

}