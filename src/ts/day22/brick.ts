import { Coordinates } from "./coordinates";

export class Brick {
    private _start: Coordinates;
    private _end: Coordinates;

    constructor ( definition: string ) {
        let startAndEnd = definition.split("~");
        this._start = Coordinates.createFromString(startAndEnd[0]);
        this._end = Coordinates.createFromString(startAndEnd[1]);
    }

    public get start(): Coordinates {
        return this._start;
    }

    public get end(): Coordinates {
        return this._end;
    }

    move(movement: Coordinates): this {
        this._end = this._end.plus ( movement);
        this._start = this._start.plus ( movement);

        return this;
    }

    getBlocks(): Coordinates[] {
        let directionStep = this._start.getDirectionTo(this._end);

        let result : Coordinates[] = [];
        let currentCoordinate = this._start;

        while (! currentCoordinate.equals ( this._end )) {
            result.push ( currentCoordinate );
            currentCoordinate = currentCoordinate.plus ( directionStep );
        }

        result.push ( currentCoordinate );

        return result;
    }


    isZDirection() : boolean {
        let directionStep = this._start.getDirectionTo(this._end);
        return directionStep.z != 0;
    }

    toString(): string {
        return this._start.toString() + "~" + this._end.toString();
    }

    isOnlyOneBlock() {
        return this._end.equals ( this._start );
    }

}
