export class Vector {
    private _x: number;
    private _y: number;
    private _z: number;

    constructor ( x: number, y: number, z: number ) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }

    static createFromString(description: string): Vector {
        let split = description.split(",");
        return new Vector(Number(split[0]), Number(split[1]), Number(split[2]));
    }

    isParallelInXY(thatVector: Vector) {
        return Math.abs(this._x / thatVector._x * thatVector._y - this._y) <= 0.0000000001;
    }



}