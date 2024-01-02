export class Coordinates {
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    constructor ( x: number, y: number, z:number) {
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
    public get z(): number {
        return this._z;
    }


    getDirectionTo(coordinates: Coordinates) {
        let difference = coordinates.minus(this);

        let result = new Coordinates(0,0,0);
        if ( difference._x != 0 ) {
            result._x = 1 * Math.sign ( difference._x );
        } else if ( difference._y != 0 ) {
            result._y = 1 * Math.sign ( difference._y );
        } else {
            result._z = 1 * Math.sign ( difference._z );
        }
        return result;
    }

    minus(coordinates: Coordinates) {
        return new Coordinates ( this.x - coordinates.x, this.y - coordinates.y, this.z - coordinates.z);
    }

    plus(coordinates: Coordinates): Coordinates {
        return new Coordinates ( this.x + coordinates.x, this.y + coordinates.y, this.z + coordinates.z);
    }
    equals(coordinates: Coordinates) : boolean {
        return this.x == coordinates.x && this.y==coordinates.y && this.z == coordinates.z;
    }

    largestCoordinateIsLargerThan(coordinates: Coordinates) : boolean{
        let thisMax = Math.max ( Math.abs(this._x), Math.abs(this._y), Math.abs(this._z));
        let thatMax = Math.max ( Math.abs(coordinates._x), Math.abs(coordinates._y), Math.abs(coordinates._z));
        return thisMax > thatMax;
    }

    toString() : string {
        return this._x + "," + this._y + "," + this._z;
    }


    static createFromString(commaSeperatedString: string): Coordinates {
        let split = commaSeperatedString.split(",");
        return new Coordinates ( Number(split[0]), Number(split[1]), Number(split[2]));
    }


}