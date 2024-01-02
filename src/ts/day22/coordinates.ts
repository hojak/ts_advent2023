export class Coordinates {
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    constructor ( x: number, y: number, z:number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    static createFromString(commaSeperatedString: string): Coordinates {
        let split = commaSeperatedString.split(",");
        return new Coordinates ( Number(split[0]), Number(split[1]), Number(split[2]));
    }

}